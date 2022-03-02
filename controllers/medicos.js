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
// obtener medico por Id
const getMedicoById = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", " nombre img");

    res.json({
      ok: true,
      medico,
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
const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "No existe medico con este id",
      });
    }
    const cambisoMedicos = {
      ...req.body,
      usuario: uid,
    };
    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambisoMedicos,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Medico Actualizado",
      medico: medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "algo salio mal",
    });
  }
};

//Borrar medico
const borrarMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "No existe medico con este id",
      });
    }
    await Medico.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Medico ha sido eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "algo salio mal",
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
};
