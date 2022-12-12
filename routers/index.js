const express = require("express");
const router = express.Router();

const authRouter = require("./Auth.router");

router.get("/", (req, res) => {
  res.send(`
      <h1>Welcome to my HARMONIE API!</h1>
      `);
});

// Todas las rutas:
router.use("/auth", authRouter);

module.exports = router;
