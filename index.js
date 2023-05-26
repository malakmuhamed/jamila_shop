const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false })); //athkm f static folder
app.use(bodyParser.json());
////////////////////////////
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("common"));
require("dotenv").config();

app.use(fileUpload());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

const indexRouter = require("./routes/index");
