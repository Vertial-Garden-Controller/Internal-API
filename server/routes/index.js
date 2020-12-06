// routes/index.js and users.js
import express from "express";
import { route } from "./users";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
