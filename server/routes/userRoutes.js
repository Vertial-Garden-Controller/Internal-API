import express from "express";
var router = express.Router();
import UserController from "../controllers/userController";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// user signup post method
router.post("/signup", UserController.newUser);
router.get("/:user_id", UserController.myInfo)

export default router;
