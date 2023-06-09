var express = require("express");
var createError = require("http-errors");
var router = express.Router();
const UsersSchema = require("../model/user");
var imgSchema = require("../model/product");
var orderSchema = require("../model/order");
var app = express();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false })); //athkm f static folder
router.use(bodyParser.json());

const { authSchema } = require("../middleware/validation-Schema");
const admin = require("../controllers/admin_controllers");

router.use((req, res, next) => {
  if (req.session.fullname !== undefined && req.session.fullname.typeofuser === 'admin') {
    next();
  } else {
    res.redirect('/')
  }
});

var fs = require("fs");
const path = require("path");


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

///////////////////////////////////




router.post("/addproduct3", (req, res) => {
  let imgFile;
  let uploadPath;
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  imgFile = req.files.img;
  for (i = 0; i < imgFile.length; i++) {
    uploadPath = path.join(__dirname + "/../public/uploads/" + i + req.body.name + ".png");
    console.log(uploadPath);
    imgFile[i].mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
  }
  const num = imgFile.length;
  var obj = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    offer: req.body.offer,
    desc: req.body.desc,
    img: req.body.name + ".png",
    num: num,
  };
  imgSchema.create(obj).then((err, item) => {
    if (err) {
      console.log("");
    } else {
    }
    res.redirect("/admin/product");
  });
});






router.get("/cartviews", admin.cartviews);
router.get("/", admin.admin_dashboard);
router.get("/admins", admin.get_admins);
router.get("/customers", admin.get_customers);
router.get("/delete/:id", admin.delete_customers);
router.get("/changeuser/:id", admin.changeuser);
router.get("/product", admin.viewproduct);
router.post('/updateproduct/:id', admin.updateproduct);
router.get('/deleteproduct/:id', admin.deleteproduct);
module.exports = router;