const mongoose = require("mongoose");
const User = mongoose.model("User");

const getUserData = async (req, res) => {
  try {
    const { correo } = req.query;

    if (correo || req.user) {
      const user = correo
        ? await User.findOne(
            { correo: correo },
            { correo: 1, apellido: 1, edad: 1, img: 1 }
          )
        : await User.findById(req.user.userId, {
            correo: 1,
            apellido: 1,
            edad: 1,
            img: 1,
          });
      if (!user) {
        return res.status(404).json({
          mensaje: "Error",
          detalles: "No existe este usuario.",
        });
      }
      return res.status(200).json({
        mensaje: "Info",
        detalles: user,
      });
    }

    return res.status(400).json({
      mensaje: "Error",
      detalles: "Es necesario enviar al menos un parámetro.",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      mensaje: "Error",
      detalles: "Error en getUserData: User.controller",
    });
  }
};

const verUsuarios = async (req, res) => {
  try {
    const { tipo } = eq.user.tipo;
    if (tipo !== "admin") {
      return res.status(400).json({
        mensaje: "Error",
        detalles: `No tienes permiso para ver esto, tu tipo de usuario es: ${tipo}`,
      });
    }
    const usuarios = await User.find(
      {},
      {
        nombre: true,
        apellido: true,
        correo: true,
        edad: true,
        tipo: true,
        img: true,
      }
    );
    if (!usuarios.length)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Colección vacía" });
    return res
      .status(200)
      .json({ mensaje: "Usuarios encontrados", detalles: usuarios });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en verUsuarios: User.controller",
    });
  }
};

const verUsuario = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      return res.status(400).json({
        mensaje: "Error",
        detalles: "No tienes permiso para ver esto",
      });
    }
    console.log(req.query);
    const usuario = await User.findById(req.params.id);
    if (!usuario)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "No existe este usuario" });
    return res
      .status(200)
      .json({ mensaje: "Usuario encontrado", detalles: usuario });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en verUsuario: User.controller",
    });
  }
};

const filtrarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find(req.body);
    if (!usuarios.length)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Usuarios no encontrados" });
    return res
      .status(200)
      .json({ mensaje: "Usuarios encontrados", detalles: usuarios });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en filtrarUsuarios: User.controller",
    });
  }
};

const eliminarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24)
      return res
        .status(400)
        .json({ mensaje: "Error", detalles: "ID no válido" });
    const usuario = await User.findById(id);
    if (!usuario)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Usuario no encontrado" });
    const eliminado = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ mensaje: "Usuario eliminado", detalles: eliminado });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en eliminarUsuarioPorId: User.controller",
    });
  }
};

const eliminarUsuariosPorFiltro = async (req, res) => {
  try {
    const eliminados = await User.deleteMany(req.body);
    return res
      .status(200)
      .json({ mensaje: "Usuarios eliminados", detalles: eliminados });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en eliminarUsuarioPorFiltro: User.controller",
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ mensaje: "Usuario actualizado", detalles: actualizado });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en actualizarUsuario: User.controller",
    });
  }
};

const verInfoUsuario = async (req, res) => {
  try {
    const usuarioInfo = await User.findById(req.user.idUser, {
      nombre: 1,
      correo: 1,
      tipo: 1,
      edad: 1,
      img: 1,
      apellido: 1,
    });
    if (!usuarioInfo)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Este usuario no existe." });
    return res
      .status(200)
      .json({ mensaje: "Usuario encontrado", detalles: usuarioInfo });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en verInfoUsuario: User.controller",
    });
  }
};

module.exports = {
  getUserData,
  verUsuarios,
  verUsuario,
  filtrarUsuarios,
  eliminarUsuarioPorId,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  verInfoUsuario,
};
