import express from 'express'
var router = express.Router()
import SoilController from '../controllers/soilController'

// get all soil information for a given garden
router.get('/soil', SoilController.getSoilInfo)

export default router
