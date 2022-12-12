//En este controler tendremos las funciones de login para tener más órden

const mongoose = require("mongoose");
const User = mongoose.model("User");

//POST
const registro = async (req, res) => {
  try {
    //Obtenemos el password del usuario
    const { password } = req.body;
    delete req.body.password;
    const user = new User(req.body);

    //Encriptamos la contraseña
    user.hashPassword(password);

    //Guardamos usuario en la base de datos
    await user.save();
    return res.status(201).json({
      msj: "Usuario Creado",
      detalles: user.onSingGenerateJWT(),
    });
  } catch (e) {
    console.log("Error en registro: Auth.controller: ", e.message);
    return res.status(500).json({
      msj: "ERROR",
      detalles: `Error en registro: Auth.controller: ${e.message}`,
    });
  }
};
//POST
const login = async (req, res) => {
  try {
    //Obtenemos el password del usuario y su correo del formulario
    const { correo, password } = req.body;

    //Buscamos al usuario y validamos si existe
    const user = await findOne({ correo });
    if (!user) {
      return res
        .status(404)
        .json({ msj: "ERROR", detalles: "No se encontró al usuario" });
    }

    //Verificamos si la contraseña es correcta
    if (user.verifyPassword(password)) {
      return res.status(200).json({
        msj: "Login correcto",
        detalles: user.onSingGenerateJWT(),
      });
    }
    //Si la contraseña es incorrecta:
    return res
      .status(400)
      .json({ msj: "ERROR", detalles: "Contraseña incorrecta" });
  } catch (e) {
    console.log("Error en login: Auth.controller");
    return res
      .status(500)
      .json({ msj: "ERROR", detalles: "Error en login: Auth.controller" });
  }
};

module.exports = {
  registro,
  login,
};
