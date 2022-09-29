const productController = require("./productController");
const Authcontrollers = require("./AuthController")
const authcontrollers = new Authcontrollers()
const cartController = require("./cartController")
module.exports = {
  productController, authcontrollers, cartController
};
