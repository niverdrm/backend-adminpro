const { Router } = require("express");
const { getTotal, getDocumentoColeccion } = require("../controllers/busquedas");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

//path: "/api/todo"

router.get("/:busqueda", validarJwt, getTotal);
router.get("/coleccion/:tabla/:busqueda", validarJwt, getDocumentoColeccion);

module.exports = router;
