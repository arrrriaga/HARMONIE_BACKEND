const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { getMyData } = require("../controllers");

router.get("/getmydata", auth, getMyData);

module.exports = router;
