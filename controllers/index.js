const { registro, login } = require("./Auth.controller");
const {
  getUserData,
  verUsuarios,
  verUsuario,
  filtrarUsuarios,
  eliminarUsuarioPorId,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  verInfoUsuario,
} = require("./User.controller");

const {
  nuevoProducto,
  verProductos,
  verMisProductos,
  eliminarProductoPorId,
  actualizarProducto,
} = require("./Product.controller");

module.exports = {
  registro,
  login,
  getUserData,
  verUsuarios,
  verUsuario,
  filtrarUsuarios,
  eliminarUsuarioPorId,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  verInfoUsuario,
  nuevoProducto,
  verProductos,
  verMisProductos,
  eliminarProductoPorId,
  actualizarProducto,
};
