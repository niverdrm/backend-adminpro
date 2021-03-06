//path: api/medicos

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
} = require("../controllers/medicos");

const router = Router();

//obtener hospitales
router.get("/", validarJwt, getMedicos);

//Crear hospital
router.post(
  "/",
  [
    validarJwt,
    check("nombre", " El nombre es obligatorio").not().isEmpty(),
    check("hospital", " El hospital es obligatorio y valido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

//actulizar usuario
router.put(
  "/:id",
  [
    validarJwt,
    check("nombre", " El nombre es obligatorio").not().isEmpty(),
    check("hospital", " El hospital es obligatorio").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

//borrar Hospital
router.delete("/:id", validarJwt, borrarMedico);

//Buscar medico
router.get("/:id", validarJwt, getMedicoById);

module.exports = router;
