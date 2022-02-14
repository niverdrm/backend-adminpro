const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");
const { generarJwt } = require("../helpers/jwt");

//Obtener los usuarios
const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.count(),
  ]);

  return res.json({
    ok: true,
    usuarios,
    total,
  });
};

//Crear Usuario
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: " Correo ya existe",
      });
    }
    const usuario = new Usuario(req.body);

    //encritar contraseña
    const salt = bcrypt.genSalt();
    usuario.password = bcrypt.hashSync(password);

    await usuario.save();

    //generar -JWT
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      msg: " creando usuario",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado revisar log",
    });
  }
};

//Actulizar usuairo
const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: " Usuario no existe con ese id",
      });
    }

    const { password, google, email, ...campos } = req.body;
    console.log(campos);

    if (usuarioDb.email !== email) {
      const exiteEmail = await Usuario.findOne({ email });
      if (exiteEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario registrado  con ese correo ",
        });
      }
    }
    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error inesperado",
    });
  }
};

// Borrar usuario
const borrarUsuario = async (req, res) => {
  const uid = req.params.id;
  const usuarioDb = await Usuario.findById(uid);
  try {
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe este usuario",
      });
    }
    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: " usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
