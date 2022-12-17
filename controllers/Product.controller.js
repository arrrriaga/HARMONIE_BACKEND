const mongoose = require("mongoose");
const Producto = mongoose.model("Producto");

const nuevoProducto = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      return res.status(403).json({
        mensaje: "Error",
        detalles: "Sólo un admin puede crear una película",
      });
    }

    //Creamos nuestro usuario con lo que viene del body
    const producto = new Producto({ ...req.body, uploader: req.user.idUser });

    const resp = await producto.save();

    return res.status(201).json({
      mensaje: "producto creado",
      detalles: await resp.populate("uploader", "nombre"),
    });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en nuevoProducto: Product.controller",
    });
  }
};

const verProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate("uploader", "nombre");

    if (!productos.length)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Colección vacía" });
    return res
      .status(200)
      .json({ mensaje: "productos encontrados", detalles: productos });
  } catch (e) {
    return res.status(400).json({ mensaje: "Error", detalles: e.message });
  }
};

const verOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24)
      return res
        .status(400)
        .json({ mensaje: "Error", detalles: "ID no válido" });
    const producto = await Producto.findById(id);
    if (!producto)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Producto no encontrado" });
    return res
      .status(200)
      .json({ mensaje: "Producto Encontrado", detalles: producto });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en verOneProduct: Product.controller",
    });
  }
};
const verMisProductos = async (req, res) => {
  try {
    if (req.user.tipo !== "admin") {
      return res.status(400).json({
        mensaje: "Error",
        detalles: "No tienes permiso para ver esto",
      });
    }

    const productos = await Producto.find({
      uploader: req.user.idUser,
    }).populate("uploader", "nombre");
    if (!productos.length)
      return res.status(404).json({
        mensaje: "Error",
        detalles: "Esste usuario no ha creado productos",
      });
    return res
      .status(200)
      .json({ mensaje: "Productos encontrados", detalles: productos });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en verMisProductos: Product.controller",
    });
  }
};

const eliminarProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24)
      return res
        .status(400)
        .json({ mensaje: "Error", detalles: "ID no válido" });
    const producto = await Producto.findById(id);
    if (!producto)
      return res
        .status(404)
        .json({ mensaje: "Error", detalles: "Producto no encontrado" });
    const eliminado = await Producto.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ mensaje: "Producto eliminado", detalles: eliminado });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en eliminarProductoPorId: Product.controller",
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await Producto.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).populate("uploader", "nombre");
    return res
      .status(200)
      .json({ mensaje: "Producto actualizado", detalles: actualizado });
  } catch (e) {
    return res.status(400).json({
      mensaje: "Error",
      detalles: "Error en actualizarProducto: Product.controller",
    });
  }
};

module.exports = {
  nuevoProducto,
  verProductos,
  verOneProduct,
  verMisProductos,
  eliminarProductoPorId,
  actualizarProducto,
};
