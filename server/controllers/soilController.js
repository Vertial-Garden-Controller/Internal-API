/**
 * User Controller is responseible for retrieving information
 * from HTTP requests for user information
 *
 * including login, signup, delete, and more
 *
 * User controller functions should only be called from /user/ routes
 */

import SoilService from "../services/soilService"

// import SoilService from '../services/SoilService'

export default class SoilController {
  /**
   * gets all soil reads for a given garden_id.  If start_time and end_time are valid
   * and provided in the request query, then the search will be limited to be between
   * the start and end times for that garden.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getSoilInfo(req, res) {
    const email = req.query.email
    console.log(email)
    if (email.length < 1) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Email provided is invalid',
      })
    }
    let start_time = req.query.start_time
    let end_time = req.query.end_time
    if (!start_time || !end_time) {
      start_time = 0
      end_time = 0
    }

    // TODO: service for getSoilInfo
    const sensor_data = await SoilService.getSoilInfo(email, start_time, end_time)
    if (sensor_data.error) {
      return res.status(500).json({
        success: false,
        error: sensor_data.error,
        detail: sensor_data.detail,
      })
    }

    return res.status(200).json({ success: true, sensor_data: sensor_data })
  }
}
