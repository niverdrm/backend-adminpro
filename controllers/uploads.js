const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actuliazarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  //Validar tipo
  const tiposValidos = ["usuarios", "medicos", "hospitales"];
  if (!tiposValidos.includes(tipo)) {
    res.status(400).json({
      ok: false,
      msg: " No es medico, usuario, hospital",
    });
  }

  //Validar que existan un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "no se encontro ningun archivo",
    });
  }

  //Procesar la imagen
  const file = req.files.imagen;

  //ValidarExtension del archivo
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  const extesionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extesionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "Esta extensión no es valida",
    });
  }

  //Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  //Crear path donde voy a guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  //Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }
    // Actualizar la base de datos
    actuliazarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "Archivo subido",
      nombreArchivo,
    });
  });
};

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  //Imagen por defecto
  if (fs.existsSync(pathImagen)) {
    res.sendFile(pathImagen);
  } else {
    const pathImagen = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImagen);
  }
};

module.exports = { fileUpload, retornaImagen };
