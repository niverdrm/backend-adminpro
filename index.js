require("dotenv").config();

const path = require("path");

const express = require("express");
const cors = require("cors");
const { dbConexion } = require("./databese/config");

//Crear servidor express
const app = express();

//Configurar cors
app.use(cors());

//Base de datos
dbConexion();

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

// lo ultimo
app.get("*", (req, resp) => {
  resp.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("port", process.env.PORT);
});
