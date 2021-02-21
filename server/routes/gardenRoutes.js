import express from 'express'
var router = express.Router()
import GardenController from '../controllers/gardenController'

// create a new garden for a user
router.post('/new', GardenController.createNewGarden)
// create a new garden for a user
router.post('/new', GardenController.getGardenByID)
// create a new garden for a user
router.post('/new', GardenController.getAllGardens)
// create a new garden for a user
router.post('/new', GardenController.updateGarden)
// create a new garden for a user
router.post('/new', GardenController.deleteGarden)

export default router
