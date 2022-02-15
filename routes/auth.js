const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

//path: api/login

const router = Router();

router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [
    check("token", "El token de google es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSingIn
);

module.exports = router;
