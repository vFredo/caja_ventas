const router = require('express').Router()
const knex = require('../config/connection') // Base de datos
const { auth_admin } = require('../middleware/authAdmin')


// se retorna todos los productos del inventario
router.get("/", async (_, res) => {
  knex
    .select('*')
    .from('inventario')
    .then(datos => {
      return res.json(datos)
    })
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
    .then(() => {
      res.json({ message: `Producto: \'${req.body.nombre}\' agregado.`, success: true})
    })
    .catch(err => {
      res.json({ message: `Error creando \'${req.body.nombre}\' en inventario: ${err}`, success: false })
    })
})

// actualizar un producto del inventario
router.put("/:id", async (req, res) => {
  const {id} = req.params
  knex('inventario')
    .update(req.body)
    .where({id})
    .then(rows => {
      // rows describes the number of rows updated
      // therefore if no row found no row will be updated
      if (!rows) {
        return res.json({ success: false })
      }
      return res.json({ success: true })
    })
    .catch(e => res.json(e))
})

// elimina un producto del inventario
router.delete("/:id", auth_admin, async (req, res) => {
  const {id} = req.params
  knex('inventario')
    .where({id}) // encontrando el producto por id
    .del() // eliminando el producto
    .then(() => {
      res.json({ message: `Producto con id \'${id}\' eliminado.`, success: true })
    })
    .catch(err => {
      res.json({ message: `Error eliminando producto \'${id}\': ${err}`, success: false })
    })
})

module.exports = router
