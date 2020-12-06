/**
 * User Controller is responseible for retrieving information
 * from HTTP requests for user information
 *
 * including login, signup, delete, and more
 */

import UserService from "../services/userService";

export default class UserController {
  static async newUser(req, res) {
    const newUser = req.body;
    if (!newUser.firstname || !newUser.email) {
      return res.status(400).json({
        success: false,
        error: "New user requires firstname and email",
      });
    }

    const user_id = await UserService.createUser(newUser);
    if (user_id.error) {
      return res
        .status(500)
        .json({ success: false, error: user_id.error, detail: user_id.detail });
    }

    return res.status(200).json({ success: true, user_id: user_id });
    // await
  }
}
