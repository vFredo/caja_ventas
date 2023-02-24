const { verify } = require('jsonwebtoken')

const auth_admin = (req, res, next) => {
  // We are taking the token from cookies
  const accessToken = req.cookies.accessToken
  if (!accessToken) return res.json({ success: false, message: "El usuario no ha iniciado sesion." })

  // it has to be the same secret as the one that was use to create de accessToken
  verify(accessToken, "secretToChange", (err, decoded) => {
    if (err) return res.json({ success: false, message: err })
    req.user = { decoded }
    if (req.user.decoded.rol == "admin"){
      return next()
    } else {
      return res.json({success: false, message: "El usuario no es administrador."})
    }
  })
}

module.exports = { auth_admin }

