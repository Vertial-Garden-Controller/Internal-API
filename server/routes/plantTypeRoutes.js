import express from 'express'
var router = express.Router()
import PlantTypeController from '../controllers/plantTypeController'

// get all soil information for a given garden
router.get('/', PlantTypeController.getPlantTypes)

export default router
