var express = require("express");
var createError = require("http-errors");
var app = express();
var imgSchema = require("../model/product");
var UsersSchema = require("../model/user");
var OrderSchema = require("../model/order");

app.get("/", (req, res) => {
    imgSchema.find({ offer: { $gt: 0 } }).then((data, err) => {
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
app.get("/signup", (req, res) => {
    res.render("signup", {
        token: req.session.token === undefined ? "" : req.session.token,
        fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    });
});
app.get("/product", (req, res) => {
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
});
app.get("/product_details/:id", (req, res) => {
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
});


app.get("/productcategory/:category", (req, res) => {
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
});

app.get("/search/:searchtext", (req, res) => {
    const { searchtext } = req.params;
    imgSchema.find({ name: { $regex: searchtext } }).then((data, err) => {
        if (err) {
            console.log(err);
        }
        res.render("productsearch", {
            items: data,
            token: req.session.token === undefined ? "" : req.session.token,
            fullname: req.session.fullname === undefined ? "" : req.session.fullname,
        });
    });
})

app.post("/addcart", (req, res, next) => {
    req.session.cart = req.body;//The request body contains data that the client wants to add to their shopping cart.
    next()
    res.status(200)
})

app.get("/cart", (req, res) => {
    res.render("cart", {
        cart: req.session.cart === undefined ? [] : req.session.cart,
        fullname: req.session.fullname === undefined ? "" : req.session.fullname,
    })
})

app.post("/confirmcart", async (req, res, next) => {
    const user = new OrderSchema(req.body);
    const data = await user.save();
    res.status(200).json({ data: data });
})

module.exports = app;
