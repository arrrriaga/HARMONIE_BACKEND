const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUserData,
  verUsuarios,
  verUsuario,
  filtrarUsuarios,
  eliminarUsuarioPorId,
  eliminarUsuariosPorFiltro,
  actualizarUsuario,
  verInfoUsuario,
} = require("../controllers");

router.post("/getUserData", auth, getUserData);
router.get("/getAll", auth, verUsuarios);
router.get("/:id", auth, verUsuario);
router.get("/filtrar", auth, filtrarUsuarios);
router.delete("/:id", auth, eliminarUsuarioPorId);
router.delete("/", auth, eliminarUsuariosPorFiltro);
router.put("/:id", auth, actualizarUsuario);
router.get("/", auth, verInfoUsuario);

module.exports = router;
