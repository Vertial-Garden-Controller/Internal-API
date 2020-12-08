import express from "express";
var router = express.Router();
import UserController from "../controllers/userController";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// signup user
router.post("/signup", UserController.newUser);
// get user information
router.get("/:user_id", UserController.getUserInfo)

export default router;
