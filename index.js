require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConexion } = require("./databese/config");

//Crear servidor express
const app = express();

//Base de datos
dbConexion();

//Configurar cors
app.use(cors());

//Usar json
app.use(express.json());

//Carpeta public
app.use(express.static("public"));

//Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));

app.listen(3000, () => {
  console.log("port", process.env.PORT);
});
