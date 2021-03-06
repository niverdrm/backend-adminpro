const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");
const { generarJwt } = require("../helpers/jwt");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");
const { googleVerify } = require("../helpers/google-verify");

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

    return res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDb.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

//Login Google
const googleSingIn = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);

    //validar por correo
    const usuarioDb = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDb) {
      usuario = new Usuario({
        nombre: name,
        emial,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      //existe el usuario
      usuario = usuarioDb;
      usuario.google = true;
      usuario.img = picture;
    }

    //guardar en base de datos
    await usuario.save();

    //Generar token
    const token = await generarJwt(usuario.id);

    return res.json({
      ok: true,
      msg: " google login",
      token,
      menu: getMenuFrontEnd(usuario.role),
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token de google no es correcto",
    });
  }
};

//Renovar token
const renewToken = async (req, res = response) => {
  const uid = req.uid;

  //Generar token
  const token = await generarJwt(uid);

  //Obtener usuario por uid
  const usuario = await Usuario.findById(uid);

  return res.json({
    ok: true,
    token,
    usuario,
    menu: getMenuFrontEnd(usuario.role),
  });
};

module.exports = { login, googleSingIn, renewToken };
