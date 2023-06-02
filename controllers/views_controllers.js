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
const admin=require("../controllers/admin_controllers");

////////////////////////////////
// var multer = require("multer"); 
// var fs = require("fs");
// const path = require("path");
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads"); //eh cb de
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });
// var upload = multer({ storage: storage });

////////////////////////////



// router.post("/addproduct", upload.single("image"), (req, res) => {
//   var obj = {
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   imgSchema.create(obj).then((err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//     }
//     res.redirect("/admin");
//   });
// });


///////////////////////////////////

// router.post("/addproduct2", (req, res) => {
//   let imgFile;
//   let uploadPath;
//   if (!req.files) {
//     return res.status(400).send("No files were uploaded.");
//   }
//   imgFile = req.files.img;
//   uploadPath = __dirname + "/public/uploads/" + req.body.name + ".png";

//   imgFile.mv(uploadPath, function (err) {
//     if (err) return res.status(500).send(err);
//   });
//   var obj = {
//     name: req.body.name,
//     category: req.body.category,
//     price: req.body.price,
//     desc: req.body.desc,
//     img: req.body.name + ".png",
//   };
//   imgSchema.create(obj).then((err, item) => {
//     if (err) {
//       console.log("");
//     } else {
//     }
//     res.redirect("/admin");
//   });
// });
router.use((req,res,next) => {
  if(req.session.fullname !== undefined && req.session.fullname.typeofuser === 'admin'){
    next();
  }else{
    res.redirect('/')
  }
});

  router.get("/", admin.admin_dashboard);
router.get("/addproduct", admin.admin_addproduct);
router.post("/addproduct",admin.addproduct3);
  router.get("/customers", admin.get_customers);
  router.get("/admins", admin.get_admins);
  router.get("/delete/:id", admin.delete_customers);
  router.get("/changeuser/:id",admin.changeuser);
  router.get("/product", admin.viewproduct);
  router.post('/updateproduct/:id',admin.updateproduct);
  router.get('/deleteproduct/:id', admin.deleteproduct);

module.exports = router;