const { response } = require("express");
const Hospital = require("../models/Hospital");

const getHospitales = async (req, res = response) => {
  try {
    const hospitales = await Hospital.find().populate("usuario", "nombre img");
    res.json({
      ok: true,
      hospitales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDb = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDb,
    });
  } catch (error) {
    console.log(error);
    res.status(5000).json({
      ok: false,
      msg: "Algo salio mal",
    });
  }
};
const actualizarHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese id del hospital",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "putHospitales",
      hospital: hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "algo salio mal",
    });
  }
};
const borrarHospital = async (req, res = response) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encotrando por id",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital ha sido eliminado",
    });
  } catch (error) {}
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
