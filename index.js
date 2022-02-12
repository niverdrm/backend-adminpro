require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConexion = require("./databese/config");

//Crear servidor express
const app = express();

//Configurar cors
app.use(cors());

//Usar json
app.use(express.json());

//Base de datos
dbConexion();

//Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("port", process.env.PORT);
});
