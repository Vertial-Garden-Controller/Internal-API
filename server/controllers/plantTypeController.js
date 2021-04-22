/**
 * User Controller is responseible for retrieving information
 * from HTTP requests for user information
 *
 * including login, signup, delete, and more
 *
 * User controller functions should only be called from /user/ routes
 */

import PlantTypesService from "../services/plantTypesService"

export default class PlantTypeController {
  /**
   * gets all soil reads for a given garden_id.  If start_time and end_time are valid
   * and provided in the request query, then the search will be limited to be between
   * the start and end times for that garden.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getPlantTypes(req, res) {
    // TODO: service for getPlantTypes
    const plant_types = await PlantTypesService.getPlantTypes()
    if (plant_types.error) {
      return res.status(500).json({
        success: false,
        error: plant_types.error,
        detail: plant_types.detail,
      })
    }

    return res.status(200).json({ success: true, plant_types: plant_types })
  }
}
