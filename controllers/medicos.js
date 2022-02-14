const { response } = require("express");
const Medico = require("../models/Medico");

// OBTENER MEDICOS
const getMedicos = async (req, res = response) => {
  try {
    const medicos = await Medico.find()
      .populate("usuario", "nombre img")
      .populate("hospital", " nombre img");

    res.json({
      ok: true,
      medicos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};

//CREAR MEDICOS
const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });

  try {
    const medicoDb = await medico.save();

    res.json({
      ok: true,
      medico: medicoDb,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};

//ACTULIZAR MEDICO
const actualizarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "putMedico",
  });
};

//Borrar medico
const borrarMedico = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteMedico",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
