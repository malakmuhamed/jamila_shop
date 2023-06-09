var express = require("express");
var createError = require("http-errors");
var router = express.Router();
var app = express();
var imgSchema = require("../model/product");
var UsersSchema = require("../model/user");
const views = require("../controllers/views_controllers");
var orderSchema = require("../model/order");


router.get("/", views.offers);
router.get("/signup", views.signup_views);
router.get("/signin", views.signin_views);
router.get("/product", views.product_views);
router.get("/product_details/:id", views.product_details);
router.get("/productcategory/:category", views.product_category);
router.get("/search/:searchtext", views.search);


router.post("/addcart", (req, res, next) => {
    req.session.cart = req.body;//The request body contains data that the client wants to add to their shopping cart.
    next()
    res.status(200)
})

router.get("/cart", (req, res) => {
    res.render("cart", {
        cart: req.session.cart === undefined ? [] : req.session.cart,
        fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    })
})

router.post("/confirmcart", async (req, res, next) => {
    const user = new OrderSchema(req.body);
    const data = await user.save();
    res.status(200).json({ data: data });
})

module.exports = router;
