const fs = require("fs");

const Usuario = require("../models/Usuario");
const Medico = require("../models/Medico");
const Hospital = require("../models/Hospital");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    //borrar la imagen
    fs.unlinkSync(path);
  }
};

const actuliazarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = "";
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("no se encotro medico por id");
        return false;
      }
      pathViejo = `./uploads/medicos/${medico.img}`;

      borrarImagen(pathViejo);

      medico.img = nombreArchivo;

      await medico.save();
      return true;

      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("no se encotro hospital por id");
        return false;
      }
      pathViejo = `./uploads/hospitales/${hospital.img}`;

      borrarImagen(pathViejo);

      hospital.img = nombreArchivo;

      await hospital.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("no se encotro usuario por id");
        return false;
      }
      pathViejo = `./uploads/usuarios/${usuario.img}`;

      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;

      await usuario.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  actuliazarImagen,
};
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));
