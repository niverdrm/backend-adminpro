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

//Carpeta public
app.use(express.static("public"));

//Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));

app.listen(process.env.PORT, () => {
  console.log("port", process.env.PORT);
});
