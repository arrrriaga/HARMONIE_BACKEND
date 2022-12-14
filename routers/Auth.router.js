const express = require("express");
const router = express.Router();

const { registro, login } = require("../controllers");
const upload = require("../middleware/upload");

router.post("/registro", upload.single("picture"), registro);
router.post("/login", login);

module.exports = router;
