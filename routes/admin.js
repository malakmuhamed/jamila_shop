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

router.use((req, res, next) => {
  if (req.session.fullname !== undefined && req.session.fullname.typeofuser === 'admin') {
    next();
  } else {
    res.redirect('/')
  }
})


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

router.post("/addproduct2", (req, res) => {
  let imgFile;
  let uploadPath;
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  imgFile = req.files.img;
  uploadPath = __dirname + "/public/uploads/" + req.body.name + ".png";

  imgFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });
  var obj = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    desc: req.body.desc,
    img: req.body.name + ".png",
  };
  imgSchema.create(obj).then((err, item) => {
    if (err) {
      console.log("");
    } else {
    }
    res.redirect("/admin");
  });
});


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

router.get("/", (req, res) => {
  res.render("admin_dashboard", {
    token: req.session.token === undefined ? "" : req.session.token,
    fullname: req.session.fullname === undefined ? "" : req.session.fullname,
  });
});

router.get("/customers", (req, res) => {
  UsersSchema.find({ typeofuser: "user" }).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render("admin_customers", {
      items: data,
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  });
});

router.get("/admins", (req, res) => {
  UsersSchema.find({ typeofuser: "admin" }).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render("admin_customers", {
      items: data,
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await UsersSchema.findByIdAndDelete(id);
  res.redirect("/admin/customers");
});

router.get("/changeuser/:id", async (req, res) => {
  const { id } = req.params;
  const Typeofuser = await UsersSchema.findById(id).then(async (data, err) => {
    if (err) {
      console.log(err);
    }
    if (data.typeofuser == "admin") {
      await UsersSchema.findByIdAndUpdate(id, { typeofuser: "user" });
      res.redirect("/admin");
    } else if (data.typeofuser == "user") {
      await UsersSchema.findByIdAndUpdate(id, { typeofuser: "admin" });
      res.redirect("/admin/customers");
    }
  })
});

router.get("/product", (req, res) => {
  imgSchema.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render("admin_product", {
      items: data,
      token: req.session.token === undefined ? "" : req.session.token,
      fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
  });
});

router.post('/updateproduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const action = await imgSchema.findByIdAndUpdate(id, req.body);
    res.redirect("/admin/product")
  } catch (error) {
    console.log(error);
  }

})
router.post('/deleteproduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const action = await imgSchema.findByIdAndDelete(id, req.body);
    res.redirect("/admin/product")
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;