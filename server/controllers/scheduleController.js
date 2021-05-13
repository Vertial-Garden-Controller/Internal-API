/**
 * Schedule Controller is responseible for retrieving information
 * from HTTP requests for schedule information
 *
 * including login, signup, update, delete, and more
 *
 * Schedule controller functions should only be called from /schedule/ routes
 */

import ScheduleService from "../services/scheduleService"

// import ScheduleService from '../services/scheduleService'

export default class ScheduleController {
  /**
   * Handles POST request to create a new schedule.
   * days, start_time, and end_time, and email
   * are required fields to signup.
   * Calls schedule service to insert data into database
   * @param req
   * @param res
   * @returns res with json
   */
  static async newSchedule(req, res) {
    // request body contains schedule signup information
    const newSchedule = req.body
    // return 400 (bad request) if firstname or email is missing.
    if (
      !newSchedule.start_time ||
      !newSchedule.end_time ||
      // !newSchedule.days ||
      !newSchedule.email
    ) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail:
          'New schedule requires days, start_time, and end_time, and email',
      })
    }

    // call create schedule service to insert schedule information into database
    const schedule_id = await ScheduleService.createNewSchedule(newSchedule)
    // check scheduleid for error field (db insert failed)
    if (schedule_id.error || schedule_id < 1) {
      return res.status(500).json({
        success: false,
        error: schedule_id.error,
        detail: schedule_id.detail,
      })
    }

    // otherwise return schedule id with success :)
    return res.status(201).json({ success: true, schedule_id: schedule_id })
  }

  /**
   * Handles GET requets for schedule information by schedule_id.
   * Schedule_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and schedule information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getScheduleByID(req, res) {
    const schedule_id = parseInt(req.query.schedule_id)
    console.log('shuit')
    if (schedule_id < 1 || isNaN(schedule_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Schedule id provided is invalid',
      })
    }

    // TODO: service for getScheduleByID
    const schedule = await ScheduleService.getScheduleByID(schedule_id)
    if (schedule.error) {
      return res.status(500).json({
        success: false,
        error: schedule.error,
        detail: schedule.detail,
      })
    }

    return res.status(200).json({ success: true, schedule: schedule })
  }

  /**
   * Handles GET requets for all schedules of a given user
   * Schedule_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and schedule information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getAllSchedules(req, res) {
    const email = req.query.email
    if (email.length < 1) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Email provided is invalid',
      })
    }

    // TODO: service for getAllSchedules
    const schedules = await ScheduleService.getAllSchedules(email)
    if (schedules.error) {
      return res.status(500).json({
        success: false,
        error: schedules.error,
        detail: schedules.detail,
      })
    }

    return res.status(200).json({ success: true, schedules: schedules })
  }

  /**
   * Updates an existing schedule in the database.  Must provide an existing schedule_id
   * and schedule information in body.schedule.  Will return existing schedule
   * information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async updateSchedule(req, res) {
    const schedule_id = parseInt(req.query.schedule_id)
    if (schedule_id < 1 || isNaN(schedule_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Schedule id provided is invalid',
      })
    }

    // check for existing schedule to update
    const existingSchedule = await ScheduleService.getScheduleByID(schedule_id)
    // if schedule does not exist, return error.
    if (!existingSchedule) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: `Schedule #${schedule_id} does not exist and cannot be updated.`,
      })
    }

    // request body contains schedule signup information
    const newSchedule = req.body
    // return 400 (bad request) if firstname or email is missing.
    if (
      !newSchedule.start_time ||
      !newSchedule.end_time ||
      !newSchedule.days ||
      !newSchedule.email
    ) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail:
          'New schedule requires days, start_time, and end_time, and email',
      })
    }

    // Create update old schedule to existing schedule
    // TODO: service for updateSchedule
    const schedule = await ScheduleService.updateSchedule(schedule_id, newSchedule)
    if (schedule.error) {
      return res.status(500).json({
        success: false,
        error: schedule.error,
        detail: schedule.detail,
      })
    }

    return res.status(200).json({ success: true, schedule: schedule })
  }

  /**
   * Looks up a schedule at schedule_id and deletes it from the database.
   * If no schedule at that schedule_id exists, then an error will be returned.
   * @param req
   * @param res
   * @returns res with json
   */
  static async deleteSchedule(req, res) {
    const schedule_id = parseInt(req.query.schedule_id)
    if (schedule_id < 1 || isNaN(schedule_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Schedule id provided is invalid',
      })
    }

    // check for existing schedule to update
    const existingSchedule = await ScheduleService.getScheduleByID(schedule_id)
    // if schedule does not exist, return error.
    if (!existingSchedule) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: `Schedule #${schedule_id} does not exist and cannot be deleted.`,
      })
    }

    // TODO: service for deleteSchedule
    const schedule = await ScheduleService.deleteSchedule(schedule_id)
    if (schedule.error) {
      return res.status(500).json({
        success: false,
        error: schedule.error,
        detail: schedule.detail,
      })
    }

    return res.status(200).json({ success: true })
  }
}
