const jwt = require("jsonwebtoken");

const generarJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const paylod = {
      uid,
    };
    jwt.sign(
      paylod,
      process.env.JWT_KEY,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(" no se pudo generar JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJwt };
