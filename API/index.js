"use strict";

var mongoose        = require("mongoose");
var port            = 3000;
var app             = require("./app");
var userController  = require("./controllers/user.controller");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/DBBIBLIOTECAVIRTUAL", {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
  useFindAndModify:   false,
}).then(() => {
  console.log("Conexion exitosa a la base de datos.");
  userController.createDefaultAdminUser();
  app.listen(port, () => {
    console.log("Servidor corriendo en el puerto:", port);
  });
}).catch((err) => {
  console.log("Error al conectarse con la base de datos.", err);
});
