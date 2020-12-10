import gardenService from '../services/gardenService'

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
    if (garden.zip_code.length != 5 || isNaN(garden.zip_code)) {
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
      return res
        .status(400)
        .json({
          success: false,
          error: 'Request Error',
          detail: 'Invalid coordinates.',
        })
    }
    // insert garden into database with create new garden service
    const garden_id = await gardenService.createNewGarden(garden)
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
}
