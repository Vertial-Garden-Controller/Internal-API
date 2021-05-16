/**
 * User Controller is responseible for retrieving information
 * from HTTP requests for user information
 *
 * including login, signup, delete, and more
 *
 * User controller functions should only be called from /user/ routes
 */

import UserService from '../services/userService'

export default class UserController {
  /**
   * Handles POST request to create a new user.
   * firstname and email are required fields to signup.
   * calls user service to insert data into database
   * @param req
   * @param res
   * @returns res with json
   */
  static async newUser(req, res) {
    // request body contains user signup information
    const newUser = req.body
    // return 400 (bad request) if firstname or email is missing.
    if (!newUser.firstname || !newUser.email || !newUser.password) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'New user requires firstname, email, and password',
      })
    }

    // call create user service to insert user information into database
    const user_id = await UserService.createUser(newUser)
    // check userid for error field (db insert failed)
    if (user_id.error || user_id < 1) {
      return res
        .status(500)
        .json({ success: false, error: user_id.error, detail: user_id.detail })
    }

    // otherwise return user id with success :)
    return res.status(201).json({ success: true, user_id: user_id })
  }

  /**
   * Controller takes an email and password from request body and
   * calls the user service login function.
   * Returns user_id if email and password match an existing user.
   * @param req
   * @param res
   * @returns res with json
   */
  static async Login(req, res) {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'email and password are required body fields.',
      })
    }

    const user_id = await UserService.Login(email, password)

    if (user_id.error) {
      return res.status(500).json({
        success: false,
        error: user_id.error,
        detail: user_id.detail,
      })
    }

    return res.status(200).json({ success: true, user_id: user_id })
  }

  /**
   * Handles GET requets for user information by user_id.
   * User_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and user information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getUserInfo(req, res) {
    const user_id = parseInt(req.query.user_id)
    if (user_id < 1 || isNaN(user_id)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'User id provided is invalid',
      })
    }

    const user = await UserService.getUserInfo(user_id)
    if (user.error) {
      return res.status(500).json({
        success: false,
        error: user.error,
        detail: user.detail,
      })
    }

    return res.status(200).json({ success: true, user: user })
  }

  /**
   * Handles GET requets for user information by user_id.
   * User_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and user information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
  static async getUserByEmail(req, res) {
    const email = req.query.email
    if (email.length < 1) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Email provided is invalid',
      })
    }

    const user = await UserService.getUserByEmail(email)
    if (user.error) {
      return res.status(500).json({
        success: false,
        error: user.error,
        detail: user.detail,
      })
    }

    return res.status(200).json({ success: true, user: user })
  }

  

  /**
   * Handles GET requets for user information by user_id.
   * User_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and user information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
   static async updateUserGarden(req, res) {
    const email = req.query.email
    const garden_size = parseInt(req.body.garden_size)
    if (email.length < 1 || garden_size < 1 || isNaN(garden_size)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Email provided is invalid',
      })
    }

    const new_garden_size = await UserService.updateUserGarden(email, garden_size)
    if (new_garden_size.error) {
      return res.status(500).json({
        success: false,
        error: new_garden_size.error,
        detail: new_garden_size.detail,
      })
    }

    return res.status(201).json({
      success: true,
      garden_size: new_garden_size
    })
  }

  

  /**
   * Handles GET requets for user information by user_id.
   * User_id provided must be greater than zero and be a valid number,
   * otherwise status 400.
   * Res contains success status and user information upon success.
   * @param req
   * @param res
   * @returns res with json
   */
   static async updatePrecip(req, res) {
    const email = req.query.email
    const precip = parseFloat(req.body.precip)
    console.log(precip)
    if (email.length < 1 || precip < 0 || isNaN(precip)) {
      return res.status(400).json({
        success: false,
        error: 'Request Error',
        detail: 'Email provided is invalid',
      })
    }

    const new_precip = await UserService.updatePrecip(email, precip)
    if (new_precip.error) {
      return res.status(500).json({
        success: false,
        error: new_precip.error,
        detail: new_precip.detail,
      })
    }

    return res.status(201).json({
      success: true,
      precip: new_precip
    })
  }
}
