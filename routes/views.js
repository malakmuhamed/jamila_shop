var express = require("express");
var createError = require("http-errors");
var app = express();
var imgSchema = require("../model/product");
var UsersSchema = require("../model/user");

app.get("/", (req, res) => {
  imgSchema.find({offer : {$gt: 0}}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render("index", {
      items: data,
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  });
});
app.get("/signin", (req, res) => {
  res.render("signin", {
    token: req.session.token === undefined ? "" : req.session.token,
    fullname: req.session.fullname === undefined ? "" : req.session.fullname,
  });
});