require("dotenv").config();
require("./models"); //! IMPORTAR MODELS
const express = require("express"); //! importamos express
const router = require("./routers"); //! Routers
const cors = require("cors"); //! Importamos cors
const mongoose = require("mongoose"); //! Importamos mongoose
mongoose.set("strictQuery", true); //[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.(Use `node --trace-deprecation ...` to show where the warning was created)
mongoose.connect(process.env.MONGO_URI); //! Conectamos mongoose

//! instanciamos express, express-json, cors y router
const app = express();
app.use(express.json());
app.use(cors());
app.use("/v1", router);

//! Static Server ?

app.use((req, res) => {
  res.send('<a href="/v1">Bienvenito: CLICK PARA IR A LA API V1.2</a>');
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto: ", process.env.PORT);
});
