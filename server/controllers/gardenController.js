import GardenService from '../services/gardenService'

export default class GardenController {
  static async createNewGarden(req, res) {
    const garden = req.body
    // Check for valid user id
    if (garden.user_id < 0 || isNaN(garden.user_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Invalid user id provided.',
      })
    }
    // check for valid zip code
    if (garden.zip_code.toString().length != 5 || isNaN(garden.zip_code)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Invalid zip code provided.',
      })
    }
    // check for valid coords
    if (
      isNaN(garden.coords.x) ||
      garden.coords.x < 0 ||
      isNaN(garden.coords.y) ||
      garden.coords.y < 0
    ) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Invalid coordinates.',
      })
    }
    // insert garden into database with create new garden service
    const garden_id = await GardenService.createNewGarden(garden)
    // if insert fails, return error
    if (garden_id.error || garden_id < 1) {
      return res.status(500).json({
        success: false,
        error: garden_id.error,
        detail: garden_id.detail,
      })
    }

    // if success, return garden's id
    return res.status(201).json({ success: true, garden_id: garden_id })
  }

  /**
   * Handles GET requets for garden information by garden_id.
   * Garden_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and garden information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getGardenByID(req, res) {
    const garden_id = parseInt(req.params.garden_id)
    if (garden_id < 1 || isNaN(garden_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Garden id provided is invalid',
      })
    }

    const garden = await GardenService.getGardenByID(garden_id)
    if (garden.error) {
      return res.status(500).json({
        success: false,
        error: garden.error,
        detail: garden.detail,
      })
    }

    return res.status(200).json({ success: true, garden: garden })
  }

  /**
   * Handles GET requets for all gardens of a given user
   * Garden_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and garden information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getAllGardens(req, res) {
    const email = parseInt(req.query.email)
    if (email.length() < 1) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Email address provided is invalid',
      })
    }

    const gardens = await GardenService.getAllGardens(email)
    if (gardens.error) {
      return res.status(500).json({
        success: false,
        error: gardens.error,
        detail: gardens.detail,
      })
    }

    return res.status(200).json({ success: true, gardens: gardens })
  }

  /**
   * Updates an existing garden in the database.  Must provide an existing garden_id
   * and garden information in body.garden.  Will return existing garden
   * information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async updateGarden(req, res) {
    const garden_id = parseInt(req.params.garden_id)
    const garden = req.body
    if (garden_id < 1 || isNaN(garden_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Garden id provided is invalid',
      })
    }

    // check for existing garden to update
    const existingGarden = await GardenService.getGardenByID(garden_id)
    // if garden does not exist, return error.
    if (!existingGarden) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: `Garden #${garden_id} does not exist and cannot be updated.`,
      })
    }

    // request body contains garden signup information
    const newGarden = req.body
    // Check for valid user id
    if (garden.user_id < 0 || isNaN(garden.user_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Invalid user id provided.',
      })
    }
    // check for valid zip code
    if (garden.zip_code.toString().length != 5 || isNaN(garden.zip_code)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Invalid zip code provided.',
      })
    }
    // check for valid coords
    if (
      isNaN(garden.coords.x) ||
      garden.coords.x < 0 ||
      isNaN(garden.coords.y) ||
      garden.coords.y < 0
    ) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Invalid coordinates.',
      })
    }

    // Create update old garden to existing garden
    const updatedGarden = await GardenService.updateGarden(garden_id, garden)
    if (updatedGarden.error) {
      return res.status(500).json({
        success: false,
        error: updatedGarden.error,
        detail: updatedGarden.detail,
      })
    }

    return res.status(200).json({ success: true, garden: updatedGarden })
  }

  /**
   * Looks up a garden at garden_id and deletes it from the database.
   * If no garden at that garden_id exists, then an error will be returned.
   * @param req
   * @param res
   * @returns res with json
   */
  static async deleteGarden(req, res) {
    const garden_id = parseInt(req.params.garden_id)
    if (garden_id < 1 || isNaN(garden_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Garden id provided is invalid',
      })
    }

    // check for existing garden to update
    const existingGarden = await GardenService.getGardenByID(garden_id)
    // if garden does not exist, return error.
    if (!existingGarden) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: `Garden #${garden_id} does not exist and cannot be deleted.`,
      })
    }

    const garden = await GardenService.deleteGarden(garden_id)
    if (garden.error) {
      return res.status(500).json({
        success: false,
        error: garden.error,
        detail: garden.detail,
      })
    }

    return res.status(200).json({ success: true, garden_id:garden.garden_id })
  }
}
