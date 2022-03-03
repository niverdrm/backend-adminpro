const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

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
const validarADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;
  try {
    const usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    if (usuarioDb.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "Usuario no autorizado",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "algo salio mal",
    });
  }
};
const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;
  try {
    const usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    if (usuarioDb.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "Usuario no autorizado",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "algo salio mal",
    });
  }
};

module.exports = {
  validarJwt,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario,
};
