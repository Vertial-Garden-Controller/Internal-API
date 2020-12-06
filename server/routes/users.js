import express from "express";
var router = express.Router();
import controller from "../controllers/userController";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", function (req, res, next) {
  res.send(controller.UserController.newUser(req, res));
});

module.exports = router;
