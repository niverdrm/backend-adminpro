const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

//obtener usuarios
router.get("/", validarJwt, getUsuarios);

//Crear usuario
router.post(
  "/",
  [
    check("nombre", " nombre es obligatorio").not().isEmpty(),
    check("password", " nombre es obligatorio").not().isEmpty(),
    check("email", " email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

//actulizar usuario
router.put(
  "/:id",
  [
    validarJwt,
    check("nombre", " nombre es obligatorio").not().isEmpty(),
    check("email", " el email es obligatorio").isEmail(),
    check("role", " el rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);
router.delete("/:id", validarJwt, borrarUsuario);

module.exports = router;
