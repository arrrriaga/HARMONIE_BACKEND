require("dotenv").config();

//! IMPORTAR MODELS
//! Routes

//! importamos express e instanciamos
const express = require("express");
const app = express();

//! Importamos mongoose, cors
const mongoose = require("mongoose");
mongoose.set("strictQuery", true); //[MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.(Use `node --trace-deprecation ...` to show where the warning was created)

mongoose.connect(process.env.MONGO_URI);
const cors = require("cors");

//! instanciamos la app
app.use(cors());
app.use(express.json());

//! Static Server ?

// app.use("v1", ) //!Falta el enrutador

app.use((req, res) => {
  res.send(`<a href="/v1">Regresa a la API </a>`);
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto: ", process.env.PORT);
});
