/**
 * Plant Controller is responseible for retrieving information
 * from HTTP requests for plant information
 *
 * including login, signup, update, delete, and more
 *
 * Plant controller functions should only be called from /plant/ routes
 */

import PlantService from '../services/plantService'

export default class PlantController {
  /**
   * Handles POST request to create a new plant.
   * days_active, start_time, and end_time, and garden_id
   * are required fields to signup.
   * Calls plant service to insert data into database
   * @param req
   * @param res
   * @returns res with json
   */
  static async newPlant(req, res) {
    // request body contains plant signup information
    const newPlant = req.body
    // return 400 (bad request) if plant information is missing.
    if (!newPlant.garden_id || !newPlant.count || !newPlant.type) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail:
          'New plant requires count, type, and garden_id',
      })
    }

    // call create plant service to insert plant information into database
    // TODO: service for newPlant
    const plant_id = await PlantService.newPlant(newPlant)
    // check plantid for error field (db insert failed)
    if (plant_id.error || plant_id < 1) {
      return res.status(500).json({
        success: false,
        error: plant_id.error,
        detail: plant_id.detail,
      })
    }

    // otherwise return plant id with success :)
    return res.status(201).json({ success: true, plant_id: plant_id })
  }

  /**
   * Handles GET requets for plant information by plant_id.
   * Plant_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and plant information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getPlantByID(req, res) {
    const plant_id = parseInt(req.params.plant_id)
    if (plant_id < 1 || isNaN(plant_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Plant id provided is invalid',
      })
    }

    // TODO: service for getPlantByID
    const plant = await PlantService.getPlantByID(plant_id)
    if (plant.error) {
      return res.status(500).json({
        success: false,
        error: plant.error,
        detail: plant.detail,
      })
    }

    return res.status(200).json({ success: true, plant: plant })
  }

  /**
   * Handles GET requets for all plants of a given user
   * Plant_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and plant information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getAllPlants(req, res) {
    const user_id = parseInt(req.params.user_id)
    if (user_id < 1 || isNaN(user_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'User id provided is invalid',
      })
    }

    // TODO: service for getAllPlants
    const plants = await PlantService.getAllPlants(user_id)
    if (plants.error) {
      return res.status(500).json({
        success: false,
        error: plants.error,
        detail: plants.detail,
      })
    }

    return res.status(200).json({ success: true, plants: plants })
  }

  /**
   * Updates an existing plant in the database.  Must provide an existing plant_id
   * and plant information in body.plant.  Will return existing plant
   * information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async updatePlant(req, res) {
    const plant_id = parseInt(req.params.plant_id)
    if (plant_id < 1 || isNaN(plant_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Plant id provided is invalid',
      })
    }

    // check for existing plant to update
    const existingPlant = await PlantService.getPlantByID(plant_id)
    // if plant does not exist, return error.
    if (!existingPlant) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: `Plant #${plant_id} does not exist and cannot be updated.`,
      })
    }

    // request body contains plant signup information
    const newPlant = req.body.plant
    // return 400 (bad request) if plant information is missing.
    if (!newPlant.garden_id || !newPlant.count || !newPlant.type) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail:
          'New plant requires count, type, and garden_id',
      })
    }

    // Create update old plant to existing plant
    // TODO: service for updatePlant
    const plant = await PlantService.updatePlant(plant_id, plant)
    if (plant.error) {
      return res.status(500).json({
        success: false,
        error: plant.error,
        detail: plant.detail,
      })
    }

    return res.status(200).json({ success: true, plant: plant })
  }

  /**
   * Looks up a plant at plant_id and deletes it from the database.
   * If no plant at that plant_id exists, then an error will be returned.
   * @param req
   * @param res
   * @returns res with json
   */
  static async deletePlant(req, res) {
    const plant_id = parseInt(req.params.plant_id)
    if (plant_id < 1 || isNaN(plant_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Plant id provided is invalid',
      })
    }

    // check for existing plant to update
    const existingPlant = await PlantService.getPlantByID(plant_id)
    // if plant does not exist, return error.
    if (!existingPlant) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: `Plant #${plant_id} does not exist and cannot be deleted.`,
      })
    }

    // TODO: service for deletePlant
    const plant = await PlantService.deletePlant(plant_id)
    if (plant.error) {
      return res.status(500).json({
        success: false,
        error: plant.error,
        detail: plant.detail,
      })
    }

    return res.status(200).json({ success: true })
  }
}
