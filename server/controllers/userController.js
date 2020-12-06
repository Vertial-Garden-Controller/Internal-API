/**
 * User Controller is responseible for retrieving information
 * from HTTP requests for user information
 *
 * including login, signup, delete, and more
 */

export default class UserController {
  static async newUser(req, res) {
    const newUser = JSON.parse(req.body);
    if (!newUser.firstname || !newUser.email) {
      return res.status(400).json({
        success: false,
        error: "New user requires firstname and email",
      });
    }
    return res.status(200)
    // await
  }
}
