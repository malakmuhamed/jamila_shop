var express = require("express");// require express
var createError = require("http-errors");//errors
var router = express.Router();
const User = require("../model/user");//mode user schema

const {
  signAccessToken,
  verifyAccessToken,
} = require("../middleware/authentication.middleware");

const { authSchema } = require("../middleware/validation-Schema");
const user=require("../controllers/index_controllers");



router.post("/signup",user.signup);
router.post("/signin", user.signin);


// router.get("/user/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const action = await User.find({ username: id });
//     res.status(200).json(action);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.patch("/user/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const action = await User.findByIdAndUpdate(id, req.body);
//     const updatedaction = await User.findById(id);
//     res.status(200).json(updatedaction);
//     if (!action) {
//       res.status(404).json({ message: error.message });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/user/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const action = await User.findByIdAndDelete(id);
//     res.status(200).json(action);
//     if (!action) {
//       return res.status(404).json({ message: "no product" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "no product" });
//   }
// });

module.exports = router;
