var express = require("express");
var createError = require("http-errors");
var router = express.Router();
const User = require("../model/user");

const {
  signAccessToken,
  verifyAccessToken,
} = require("../middleware/authentication.middleware");

const { authSchema } = require("../middleware/validation-Schema");

router.post("/signup", async (req, res, next) => {
  try {
    const valid = await authSchema.validateAsync(req.body);
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