const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { geMyData } = require("../controllers");

router.get("/getmydata", auth, geMyData);

module.exports = router;
