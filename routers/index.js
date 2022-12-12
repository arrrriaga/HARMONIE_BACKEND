const express = require("express");
const router = express.Router();

const authRouter = require("./Auth.router");
const userRouter = require("./User.router");
const productRouter = require("./Product.router");

router.get("/", (req, res) => {
  res.send(`
      <h1>Welcome to my HARMONIE API!</h1>
      `);
});

// Todas las rutas:
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
