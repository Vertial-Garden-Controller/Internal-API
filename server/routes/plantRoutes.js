import express from 'express'
var router = express.Router()
import PlantController from '../controllers/plantController'

// add new plant to garden
router.post('/', PlantController.newPlant)
// get a plant by its ID
router.get('/:plant_id', PlantController.getPlantByID)
// get all plants in a garden
router.get('/user/:user_id', PlantController.getAllPlants)
// update existing plant information
router.put('/:plant_id', PlantController.updatePlant)
// virtual roundup (delete plant)
router.delete('/:plant_id', PlantController.deletePlant)

export default router
