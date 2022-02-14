const { response } = require("express");
const Hospital = require("../models/Hospital");
const Usuario = require("../models/Usuario");
const Medico = require("../models/Medico");

const getTotal = async (req, res = response) => {
  const busqueda = req.params.busqueda;

  const regex = new RegExp(busqueda, "i");

  const [usuarios, hospital, medico] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    hospital,
    medico,
  });
};
const getDocumentoColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombreimg")
        .populate("hospital", "nombre img");

      break;

    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );

      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/medicos/hospitales",
      });
  }
  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = { getTotal, getDocumentoColeccion };
