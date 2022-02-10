require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConexion = require("./databese/config");

//Crear servidor express
const app = express();

//Configurar cors
app.use(cors());

//Base de datos
dbConexion();

//Rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("port", process.env.PORT);
});
