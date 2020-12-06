import express from "express";
var router = express.Router();
import UserController from "../controllers/userController";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", UserController.newUser);

module.exports = router;
