const mongoose = require("mongoose");
const User = mongoose.model("User");

const getMyData = async (req, res) => {
  try {
    const usuarioInfo = await User.findById(req.user.idUser, {
      nombre: 1,
      correo: 1,
      tipo: 1,
      edad: 1,
      img: 1,
      apellido: 1,
      ciudad: 1,
      adress: 1,
      CP: 1,
    });

    if (!usuarioInfo)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Este usuario no existe." });
    return res
      .status(200)
      .json({ mensaje: "Usuario encontrado", detalles: usuarioInfo });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

module.exports = {
  getMyData,
};
