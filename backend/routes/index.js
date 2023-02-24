const router = require('express').Router()

const inventarioRoute = require('./inventario')
const ventasRoute = require('./ventas')
const userRoute = require('./users')

router.use("/inventario", inventarioRoute)
router.use("/ventas", ventasRoute)
router.use("/user", userRoute)

module.exports = router
