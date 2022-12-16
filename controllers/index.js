const { registro, login } = require("./Auth.controller");
const { geMyData } = require("./User.controller");

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
  geMyData,
  nuevoProducto,
  verProductos,
  verMisProductos,
  eliminarProductoPorId,
  actualizarProducto,
};
