const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJwt = (req, res = response, next) => {
  //leer el token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No existe el token en la petición ",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no es valido",
    });
  }
};

module.exports = { validarJwt };
