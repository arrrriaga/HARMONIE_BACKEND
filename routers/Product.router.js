const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  nuevoProducto,
  verProductos,
  verOneProduct,
  verMisProductos,
  eliminarProductoPorId,
  actualizarProducto,
} = require("../controllers");

router.post("/", auth, nuevoProducto);
router.get("/getAll", auth, verProductos);
router.get("/getOne/:id", auth, verOneProduct);
router.get("/misProductos", auth, verMisProductos);
router.delete("/:id", auth, eliminarProductoPorId);
router.put("/:id", auth, actualizarProducto);

//! 5.- Exportamos el enrutador
module.exports = router;
