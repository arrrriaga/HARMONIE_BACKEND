const { registro, login } = require("./Auth.controller");
const { getMyData } = require("./User.controller");

const {
  nuevoProducto,
  verProductos,
  verOneProduct,
  verMisProductos,
  eliminarProductoPorId,
  actualizarProducto,
} = require("./Product.controller");

module.exports = {
  registro,
  login,
  getMyData,
  nuevoProducto,
  verProductos,
  verOneProduct,
  verMisProductos,
  eliminarProductoPorId,
  actualizarProducto,
};
