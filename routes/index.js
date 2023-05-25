var express = require("express");
var createError = require("http-errors");
var router = express.Router();
const User = require("../model/user");

const {
  signAccessToken,
  verifyAccessToken,
} = require("../middleware/authentication.middleware");

