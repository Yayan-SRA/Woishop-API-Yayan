const express = require("express");
const cookieParser = require('cookie-parser')
// const cors = require("cors")
const morgan = require("morgan");
const router = require("../config/routes");

const app = express();
app.use(cookieParser())

/** Install request logger */
app.use(morgan("dev"));


router.use(express.static(__dirname + "./public/"))

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Bilang ke express kalo kita mau
// pake EJS sebagai view engine
app.set("view engine", "ejs");

global.__basedir = __dirname;

/** Install Router */
app.use(router);

module.exports = app;