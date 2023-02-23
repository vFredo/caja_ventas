const router = require('express').Router()

const inventarioRoute = require('./inventario')
const ventasRoute = require('./ventas')

router.use("/inventario", inventarioRoute)
router.use("/ventas", ventasRoute)

module.exports = router
