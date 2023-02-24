const router = require('express').Router()
const knex = require('../config/connection') // Base de datos
const { auth_admin } = require('../middleware/authAdmin')

// mostrar las ventas del dia
router.get("/", auth_admin, async (_, res) => {
  const curr_time = new Date().toJSON().slice(0, 10);
  knex
    .select('*')
    .from('ventas')
    .where({ fecha: curr_time })
    .then(datos => { return res.json(datos) })
    .catch(err => {
      res.json({ message: `Error retornando inventario: ${err}`, success: false })
    })
})

// agregar una venta
router.post("/", async (req, res) => {
  const curr_time = new Date().toJSON().slice(0, 10);
  const { nit, user_id, productos } = req.body
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

  // creando la venta
  let id_venta = await knex('ventas')
    .insert({
      user_id: user_id,
      cliente: nit,
      total: total,
      fecha: curr_time
    }, ['id'])
    .catch(err => {
      return res.json({ message: `Error insertando venta: ${err}`, success: false })
    })

  // agregando productos de la venta
  for (let i = 0; i < productos.length; i++) {
    let curr_id = productos[i][0]
    let curr_cant = productos[i][1]
    let curr_val = productos[i][2]

    await knex('producto_ventas')
      .insert({
        id_venta: id_venta,
        id_producto: curr_id,
        cantidad: curr_cant,
        valor: curr_val
      })
      .catch(err => {
        return res.json({ message: `Error insertando producto venta: ${err}`, success: false })
      })
  }
  return res.json({ message: `Venta No.${id_venta} agregada.`, success: true })
})

// TODO: admin actualice o elimine las ventas

module.exports = router
