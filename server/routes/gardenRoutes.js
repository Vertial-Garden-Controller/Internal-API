import express from 'express'
var router = express.Router()
import GardenController from '../controllers/gardenController'

// create a new garden for a user
router.post('/', GardenController.createNewGarden)
// create a new garden for a user
router.get('/:garden_id', GardenController.getGardenByID)
// create a new garden for a user
router.get('/user/:user_id', GardenController.getAllGardens)
// create a new garden for a user
router.put('/:garden_id', GardenController.updateGarden)
// create a new garden for a user
router.delete('/:garden_id', GardenController.deleteGarden)

export default router
