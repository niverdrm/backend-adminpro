const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

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

router.get("/renew", validarJwt, renewToken);

module.exports = router;
