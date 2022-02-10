const mongoose = require("mongoose");

const dbConexion = async () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
    console.log(" error en la base de datos");
  }
};

module.exports = dbConexion;
