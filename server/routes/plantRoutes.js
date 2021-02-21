import express from 'express'
var router = express.Router()
import PlantController from '../controllers/plantController'

// add new plant to garden
router.post('/new', PlantController.newPlant)
// get a plant by its ID
router.post('/new', PlantController.getPlantByID)
// get all plants in a garden
router.post('/new', PlantController.getAllPlants)
// update existing plant information
router.post('/new', PlantController.updatePlant)
// virtual roundup (delete plant)
router.post('/new', PlantController.deletePlant)

export default router
