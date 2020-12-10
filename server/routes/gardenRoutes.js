import express from "express";
var router = express.Router();
import GardenController from "../controllers/gardenController";

router.post('/new', GardenController.createNewGarden)

export default router;