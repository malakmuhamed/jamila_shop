var express = require("express");// require express
var createError = require("http-errors");//errors
var router = express.Router();
const mongoose=require("mongoose");
const User = require("../model/user");//mode user schema
const {
    signAccessToken,
    verifyAccessToken,
  } = require("../middleware/authentication.middleware");
  
const { authSchema } = require("../middleware/validation-Schema");

const signup= async (req, res, next) => {
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

}


const signin= async (req, res, next) => {
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
  };
  
  const bcrypt = require('bcrypt');
  const UserSchema = mongoose.Schema({
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
    },
    typeofuser: {
      type: String,
      require: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
  });
  UserSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(this.password, salt);
      this.password = hashedpassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  
  UserSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  };

  //module.exports = mongoose.model('User', UserSchema);

module.exports={
    signup,
    signin
};



