const router = require('express').Router()
const knex = require('../config/connection') // Base de datos
const { auth_admin, authorize } = require('../middleware/authorization')


// se retorna todos los productos del inventario
router.get("/", authorize, async (_, res) => {
  knex
    .select('*')
    .from('inventario')
    .then(datos => { res.json(datos) })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `Error retornando inventario: ${err}`, success: false })
    })
})

// se agrega un producto al inventario
router.post("/", auth_admin, async (req, res) => {
  knex('inventario')
    .insert({
      'nombre': req.body.nombre,
      'cantidad': req.body.cantidad,
      'valor': req.body.valor,
    })
    .then((elem) => {
      res.json({ message: `Producto: \'${req.body.nombre}\' agregado.`, success: true, id: elem[0] })
    })
    .catch(err => {
      res.json({ message: `Error creando \'${req.body.nombre}\' en inventario: ${err}`, success: false })
    })
})

// actualizar un producto del inventario
router.put("/:id", authorize, async (req, res) => {
  const { id } = req.params
  knex('inventario')
    .update(req.body)
    .where({ id })
    .then(rows => {
      // rows describes the number of rows updated
      // therefore if no row found no row will be updated
      if (!rows) {
        return res.json({ success: false, message: `No existe producto con id \'${id}\'.` })
      }
      res.json({ success: true, message: `Producto \'${id}\' actualizado.` })
    })
    .catch(err => res.json({ success: false, message: err }))
})

// elimina un producto del inventario
router.delete("/:id", auth_admin, async (req, res) => {
  const { id } = req.params
  knex('inventario')
    .where({ id }) // encontrando el producto por id
    .del() // eliminando el producto
    .then(() => {
      res.json({ message: `Producto con id \'${id}\' eliminado.`, success: true })
    })
    .catch(err => {
      res.json({ message: `Error eliminando producto \'${id}\': ${err}`, success: false })
    })
})

module.exports = router
