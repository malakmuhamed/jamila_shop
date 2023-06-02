const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");//
var session = require("express-session");
var bodyParser = require("body-parser");//
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
const viewRouter = require("./routes/views");
const adminRouter = require("./routes/admin");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://malak2102056:56850906@cluster0.da8eto8.mongodb.net/jamila");
  console.log("Connected With DB");
}

app.use("/user", indexRouter); //user
app.use("/", viewRouter);
app.use("/admin", adminRouter);

////////////////////////////////////////////




app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

const PORT = 3000;
const hostname = "localhost";
app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});

module.exports = app;
