const mongoose = require("mongoose");

//hospital_admin12
//sROmUAoEBx0rax7J

const dbConexion = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
    console.log(" error en la base de datos");
    throw new Error("Error a la hora de iniciar Db  ");
  }
};

module.exports = { dbConexion };
