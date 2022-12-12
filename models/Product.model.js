//! 1.- Importar mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//! 2.- Crear el esquema
const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    ml: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkhu_8bHtYBCMx569jxbOiD09Dq_ev3fltb5e7rQW-o83-gerS78h18D21vb9eJQnaA0&usqp=CAU",
    },
    price: {
      type: Number,
      required: true,
    },
    uploader: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, //Agrega la hora en que se crea y modifica
  }
);

ProductoSchema.plugin(uniqueValidator);

//! 3.- Exportar modelo
mongoose.model("Producto", ProductoSchema, "coleccionProductos");
