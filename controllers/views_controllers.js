var express = require("express");
var createError = require("http-errors");
var app = express();
var imgSchema = require("../model/product");
var UsersSchema = require("../model/user");

const offers=(req, res) => {
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
};

  const signup_views=(req, res) => {
    res.render("signup", {
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  };
  const signin_views= (req, res) => {
    res.render("signin", {
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  };



const search=async (req, res, next) => {
  const { searchtext } = req.params;
  imgSchema.find({ name:  { $regex: searchtext } }).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render("productsearch", {
      items: data,
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  });
}


const product_views= (req, res) => {
    imgSchema.find({}).then((data, err) => {
      if (err) {
        console.log(err);
      }
      res.render("product", {
        items: data,
        token: req.session.token === undefined ? "" : req.session.token,
        fullname: req.session.fullname === undefined ? "" : req.session.fullname,
      });
    });
  };


  const product_details= (req, res) => {
    imgSchema.findById(req.params.id).then((data, err) => {
      if (err) {
        console.log(err);
      }
      res.render("product_details", {
        items: data,
        token: req.session.token === undefined ? "" : req.session.token,
        fullname: req.session.fullname === undefined ? "" : req.session.fullname,
      });
    });
  };
  
  
  const product_category= (req, res) => {
    const { category } = req.params;
    imgSchema.find({ category: category }).then((data, err) => {
      if (err) {
        console.log(err);
      }
      res.render("productcategory", {
        items: data,
        token: req.session.token === undefined ? "" : req.session.token,
        fullname: req.session.fullname === undefined ? "" : req.session.fullname,
      });
    });
  };
  
module.exports={
   offers,
   signup_views,
   signin_views,
   product_views,
   product_details,
   product_category,
    search
}