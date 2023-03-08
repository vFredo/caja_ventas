const router = require('express').Router()
const knex = require('../config/connection') // Base de datos
const { auth_admin, authorize } = require('../middleware/authorization')

// mostrar las ventas del dia
router.get("/", auth_admin, async (_, res) => {
  const curr_time = new Date().toJSON().slice(0, 10)
  knex.select('*').from('ventas')
    .where({ fecha: curr_time })
    .then(datos => { res.json(datos) })
    .catch(err => { res.json({ message: `Error retornando inventario: ${err}`, success: false }) })
})

// agregar una venta
router.post("/", authorize, async (req, res) => {
  const curr_time = new Date().toJSON().slice(0, 10)
  const { nit, productos, puntos } = req.body
  const user_id = req.user.decoded.id
  let total = 0

  for (let i = 0; i < productos.length; i++) {
    let curr_id = productos[i][0]
    let curr_cant = productos[i][1]

    // verificando cantidad en inventario
    let producto = await knex.select('*').from("inventario").where({ id: curr_id })
    producto = producto[0]

    if (producto.cantidad >= curr_cant) {
      total += (producto.valor * curr_cant)
      // actualizamos la cantidad del producto en el inventario
      // FIXME: No se tiene que hacer la acutalizacion hasta que todos los productos tengan una cantidad valida
      await knex('inventario')
        .update({
          nombre: producto.nombre,
          valor: producto.valor,
          cantidad: producto.cantidad - curr_cant
        })
        .where({ id: curr_id })
        .catch(err => {
          return res.json({ message: `Error actualizando inventario: ${err}`, success: false })
        })
      productos[i].push(producto.valor)
    } else {
      return res.json({ message: `No hay inventario suficiente para el producto \'${producto.nombre}\'.` })
    }
  }

  // Checkeando los puntos del usuario, sino esta en la base de datos, lo crea
  let puntos_usr = await knex.select('puntos').from("clientes").where({ nit: nit })
    .catch(err => { return res.json({ success: false, message: `Error buscando puntos del cliente: ${err}` }) })

  if (puntos_usr.length == 0) { // cliente no esta en la base de datos
    puntos_usr = 0
    await knex('clientes').insert({ nit: nit, puntos: puntos_usr })
      .catch(err => { return res.json({ message: `Error insertando cliente: ${err}`, success: false }) })
  } else {
    puntos_usr = puntos_usr[0].puntos
  }

  // puntos == true entonces se usaran los puntos, puntos == falso se acumulan
  if (puntos) {
    // Se quitan puntos si se tienen mas que 100 de lo contrario ERROR
    if (puntos_usr < 100) {
      return res.json({ success: false, message: "El cliente no tiene suficientes puntos para canjear." })
    } else {
      await knex('clientes')
        .update({ puntos: puntos_usr - 100 })
        .where({ nit: nit })
        .catch(err => {
          return res.json({ message: `Error actualizando puntos del cliente: ${err}`, success: false })
        })
      total = total * 0.9
    }
  } else {
    // Se van a acumular puntos
    let puntos_acumular = Math.floor(total / 5000)
    await knex('clientes')
      .update({ nit: nit, puntos: puntos_usr + puntos_acumular })
      .where({ nit: nit })
      .catch(err => {
        return res.json({ message: `Error actualizando puntos del cliente: ${err}`, success: false })
      })
  }

  // creando la venta
  let venta = await knex('ventas')
    .insert({
      user_id: user_id,
      cliente: nit,
      descuento: puntos,
      total: total,
      fecha: curr_time
    }, ['id'])
    .catch(err => { return res.json({ message: `Error insertando venta: ${err}`, success: false }) })

  // agregando productos de la venta
  for (let i = 0; i < productos.length; i++) {
    let curr_id = productos[i][0]
    let curr_cant = productos[i][1]
    let curr_val = productos[i][2]

    await knex('producto_ventas')
      .insert({
        id_venta: venta[0].id,
        id_producto: curr_id,
        cantidad: curr_cant,
        valor: curr_val
      })
      .catch(err => {
        return res.json({ message: `Error insertando producto venta: ${err}`, success: false })
      })
  }
  return res.json({ message: `Venta No.${venta[0].id} agregada.`, success: true })
})

// TODO: admin actualice o elimine las ventas y  get los items de la venta
router.delete("/:id", auth_admin, async (req, res) => {
  const { id } = req.params

  // eliminando los productos de la venta
  await knex('producto_ventas')
    .where({ id_venta: id }).del()
    .catch(err => { res.json({ message: `Error eliminando productos de venta No.${id}: ${err}`, success: false }) })

  let venta = await knex.select("*").from("ventas").where({ id })
    .catch(err => { return res.json({ message: `Error encontrando venta No.${id}: ${err}`, success: false }) })

  if (venta.length != 0) {
    venta = venta[0]

    let cliente = await knex.select("*").from("clientes").where({ nit: venta.cliente })
      .catch(err => { return res.json({ success: false, message: `Error buscando los puntos del cliente: ${err}` }) })

    if (venta.descuento) {
      await knex('clientes')
        .update({ nit: venta.cliente, puntos: cliente[0].puntos + 100 })
        .where({ nit: venta.cliente })
        .catch(err => { return res.json({ message: `Error sumando los puntos del cliente: ${err}`, success: false }) })
    } else {
      let puntos_quitar = Math.floor(venta.total / 5000)
      await knex('clientes')
        .update({ nit: venta.cliente, puntos: cliente[0].puntos - puntos_quitar })
        .where({ nit: venta.cliente })
        .catch(err => { return res.json({ message: `Error quitando los puntos al cliente: ${err}`, success: false }) })
    }
  }

  // eliminando la venta
  await knex('ventas').where({ id }).del()
    .catch(err => { return res.json({ message: `Error eliminando venta No.${id}: ${err}`, success: false }) })

  res.json({ message: `Venta con id \'${id}\' eliminada.`, success: true })
})

// Ver puntos de un usuario
router.get("/puntos/:nit", authorize, async (req, res) => {
  let { nit } = req.params
  let cliente = await knex.select("puntos").from("clientes").where({ nit })
    .catch(err => { return res.json({ message: `Encontrando al cliente con nit ${nit}: ${err}`, success: false }) })

  res.json({ success: true, message: `NIT: ${nit} - ${cliente[0].puntos}` })
})

module.exports = router
