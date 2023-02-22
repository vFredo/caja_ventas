const router = require('express').Router()

const inventarioRoute = require('./inventario')

router.use("/inventario", inventarioRoute)

module.exports = router
