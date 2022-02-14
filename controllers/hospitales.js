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
const actualizarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "putHospitales",
  });
};
const borrarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteHospitales",
  });
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
