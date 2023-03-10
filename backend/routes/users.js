const router = require('express').Router()
const knex = require('../config/connection') // Base de datos
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { auth_admin, authorize } = require('../middleware/authorization')

router.get("/", auth_admin, async (_, res) => {
  knex
    .select('*')
    .from('users')
    .then(datos => { res.json(datos) })
    .catch(err => {
      res.json({ message: `Error retornando inventario: ${err}`, success: false })
    })
})

router.post("/register", auth_admin, async (req, res) => {
  const { username, password, rol } = req.body
  const id = await knex.select("*", ["id"]).from("users").where({ username: username })

  // Usuario no existe por que la lista esta vacia
  if (id.length == 0) {
    const hash = await bcrypt.hash(password, 10)
      .catch((err) => res.json({ success: false, error: err }))

    await knex("users")
      .insert({
        'username': username,
        'password': hash,
        'rol': rol
      })
      .catch((err) => res.json({ success: false, error: err }))
    res.json({ succuess: true, message: `El usuario ${username} fue agregado.` })
  } else {
    res.json({ success: false, message: "El usuario ya existe." })
  }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  let user = await knex.select("*").from("users").where({ username: username })
    .catch((err) => res.json({ success: false, message: err }))
  user = user[0]

  if (user) {
    const match = await bcrypt.compare(password, user.password)
      .catch((err) => res.json({ success: false, message: err }))

    if (!match) return res.json({
      success: false,
      message: "El usuario y/o la contraseña son incorrectos."
    })

    const payload = { id: user.id, username: user.username, rol: user.rol }
    sign(payload, "secretToChange", (error, token) => {
      if (error) return res.json({ success: false, message: error })
      // Pushing token through the cookies calling it accessToken
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }).json({ success: true, username: user.username, id: user.id })
    })
  } else {
    res.json({ success: false, message: "El usuario y/o la contraseña son incorrectos." })
  }
})

// Cerrar sesion
router.get("/logout", authorize, async (_, res) => {
  res.clearCookie("accessToken").json({ success: true, message: "Se ha cerrado sesion." })
})

// Verified if the user is still log in
router.get("/connect", authorize, (req, res) => {
  const { username } = req.user.decoded
  res.json({ success: true, username: username })
})

module.exports = router
