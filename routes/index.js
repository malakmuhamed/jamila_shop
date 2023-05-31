var express = require("express");// require express
var createError = require("http-errors");//errors
var router = express.Router();
const User = require("../model/user");//mode user schema

const {
  signAccessToken,
  verifyAccessToken,
} = require("../middleware/authentication.middleware");

const { authSchema } = require("../middleware/validation-Schema");

router.post("/signup", async (req, res, next) => {
  try {
    const valid = await authSchema.validateAsync(req.body);//byndah 3ala authschema yt3ml valid
    const action = await User.findOne({ email: valid.email });
    if (action)
      throw createError.Conflict(`username ${valid.email} created before`);
    const user = new User(valid);
    const signup = await user.save();
    const accesstoken = await signAccessToken(user.id);
    req.session.token = accesstoken;
    req.session.fullname = signup;
    const usertype = req.session.fullname.typeofuser;
    if (usertype == "user") {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const valid = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: valid.email });
    if (!user)
      throw createError.NotFound(`username ${valid.email} Not Registered`);
    const validPass = await user.isValidPassword(valid.password);
    if (!validPass)
      throw createError.Unauthorized(`username / password not valid`);
    const accesstoken = await signAccessToken(user.id);
    req.session.token = accesstoken;
    req.session.fullname = user;
    const usertype = req.session.fullname.typeofuser;
    if (usertype == "admin") {
      res.redirect("/admin");
    } else if (usertype == "user") {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
});

router.get("/users", verifyAccessToken, async (req, res, next) => {
  try {
    const action = await User.find({});
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await User.find({ username: id });
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await User.findByIdAndUpdate(id, req.body);
    const updatedaction = await User.findById(id);
    res.status(200).json(updatedaction);
    if (!action) {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await User.findByIdAndDelete(id);
    res.status(200).json(action);
    if (!action) {
      return res.status(404).json({ message: "no product" });
    }
  } catch (error) {
    res.status(500).json({ message: "no product" });
  }
});

module.exports = router;
