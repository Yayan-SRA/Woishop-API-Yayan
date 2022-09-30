const express = require("express");
const cookieParser = require('cookie-parser')
require('dotenv').config()
// const cors = require("cors")
const morgan = require("morgan");
const router = require("../config/routes");
const session = require('client-sessions');

const app = express();
app.use(cookieParser())

/** Install request logger */
app.use(morgan("dev"));


router.use(express.static(__dirname + "./public/"))

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// app.use(session({
//     cookieName: 'session',
//     secret: 'random string',
//     duration: 30 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000,
// }));

/** Install JSON request parser */
app.use(express.json());

// Bilang ke express kalo kita mau
// pake EJS sebagai view engine
app.set("view engine", "ejs");

global.__basedir = __dirname;

/** Install Router */
app.use(router);

module.exports = app;