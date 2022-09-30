const express = require("express");
const controllers = require("../app/controllers");
const userAuth = require('../app/middleware/auth')
const product = require('../app/request/product')
const cart = require('../app/request/cart')

const router = express.Router();

// product
router.get("/api/v1/allProduct", controllers.api.v1.productController.productList);
router.get("/api/v1/categoryList", controllers.api.v1.productController.categoryList);
router.get("/api/v1/detail/:id", controllers.api.v1.productController.productDetail);
router.get("/api/v1/filter/:category", product.validationFilter ,controllers.api.v1.productController.productFilter);
router.post("/api/v1/create", controllers.api.v1.productController.create);

// auth
router.post("/api/v1/registration", userAuth.saveUser, controllers.api.v2.authcontrollers.registration);
router.get("/api/v1/getUser", userAuth.verifyToken, controllers.api.v1.authcontrollers.getUser);
router.get("/api/v1/refreshToken", userAuth.refreshToken);
router.post("/api/v1/login",userAuth.login, controllers.api.v2.authcontrollers.login);
router.post("/api/v1/inputOtp/:phone",userAuth.check, controllers.api.v1.authcontrollers.inputOtp);
router.post("/api/v1/activateAccount/:phone", userAuth.check, controllers.api.v1.authcontrollers.activateAccount);
router.delete("/api/v1/logout",controllers.api.v1.authcontrollers.logout);

// cart
router.get("/api/v1/allCart",userAuth.verifyToken, cart.cartAmount ,controllers.api.v1.cartController.cartList);
router.post("/api/v1/addCart", userAuth.verifyToken,cart.checkCart ,controllers.api.v1.cartController.addCart);
router.put("/api/v1/updateCart/:id", userAuth.verifyToken, cart.updateCart, controllers.api.v1.cartController.updateCart);
router.delete("/api/v1/deleteCart/:id", userAuth.verifyToken, controllers.api.v1.cartController.deleteCart);

  router.get("/api/v1/errors", () => {
    throw new Error(
      "The Industrial Revolution and its consequences have been a disaster for the human race."
      );
    });
    
router.use(controllers.api.main.onLost);
router.use(controllers.api.main.onError);

module.exports = router;
