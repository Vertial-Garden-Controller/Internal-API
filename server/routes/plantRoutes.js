import express from 'express'
var router = express.Router()
import PlantController from '../controllers/plantController'

// add new plant to garden
router.post('/', PlantController.newPlant)
// get a plant by its ID
router.get('/', PlantController.getPlantByID)
// get all plants in a garden
router.get('/user/:user_id', PlantController.getAllPlants)
// update existing plant information
router.put('/', PlantController.updatePlant)
// virtual roundup (delete plant)
router.delete('/', PlantController.deletePlant)

export default router
