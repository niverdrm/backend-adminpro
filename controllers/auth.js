const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");
const { generarJwt } = require("../helpers/jwt");

// login
const login = async (req, res = response) => {
  const { email, password } = req.body;
  console.log("llegue");
  try {
    const usuarioDb = await Usuario.findOne({ email });
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Correo no esta registrado",
      });
    }

    //VALIDAR CONTRASEÑA
    const validarContraseña = bcrypt.compareSync(password, usuarioDb.password);
    if (!validarContraseña) {
      return res.status(404).json({
        ok: false,
        msg: "contraseña incorrecta",
      });
    }

    //Generar un TOKEN - JWT
    const token = await generarJwt(usuarioDb.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = { login };
