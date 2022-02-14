//path: api/hospitales

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales");

const router = Router();

//obtener hospitales
router.get("/", getHospitales);

//Crear hospital
router.post(
  "/",
  [
    validarJwt,
    check("nombre", " El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

//actulizar usuario
router.put("/:id", [], actualizarHospital);

//borrar Hospital
router.delete("/:id", borrarHospital);

module.exports = router;
