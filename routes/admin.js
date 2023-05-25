var express = require("express");
var createError = require("http-errors");
var router = express.Router();
const UsersSchema = require("../model/user");
var imgSchema = require("../model/product");
var app = express();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false })); //athkm f static folder
router.use(bodyParser.json());

const { authSchema } = require("../middleware/validation-Schema");

////////////////////////////////
var multer = require("multer"); 
var fs = require("fs");
const path = require("path");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); //eh cb de
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

////////////////////////////

router.use((req,res,next) => {
  if(req.session.fullname !== undefined && req.session.fullname.typeofuser === 'admin'){
    next();
  }else{
    res.redirect('/')
  }
})


router.get("/addproduct", (req, res) => {
  imgSchema.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render("admin_addproduct", {
      items: data,
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  });
});