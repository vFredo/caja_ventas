const router = require('express').Router()
const knex = require('../config/connection')

router.get("/", async (_, res) => {
  knex
    .select('*') // select all records
    .from('inventario')
    .then(datos => {
      return res.json(datos)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving inventario: ${err}` })
    })
})

router.post("/", async (req, res) => {
  // Add new book to database
  knex('inventario')
    .insert({ // insert new record, a book
      'nombre': req.body.nombre,
      'cantidad': req.body.cantidad,
      'valor': req.body.valor,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Producto: \'${req.body.nombre}\' agregado.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.nombre} inventario: ${err}` })
    })
})

router.put("/:id", async (req, res) => {
  const {id} = req.params
  // Find specific book in the database and remove it
  knex("inventario")
    .update(req.body)
    .where({id})
    .then(rows => {
      // the argument here as you stated
      // describes the number of rows updated
      // therefore if no row found no row will be updated
      if (!rows) {
        return res.json({ success: false })
      }
      return res.json({ success: true })
    })
    .catch(e => res.json(e))
})

router.delete("/:id", async (req, res) => {
  const {id} = req.params
  // Find specific book in the database and remove it
  knex('inventario')
    .where({id}) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Producto ${id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${id} Prodcuto: ${err}` })
    })
})

module.exports = router
