/**
 * User services are methods that deal with user information
 * between the server code and the database.
 * 
 * User service methods should only be called from user controller.
 */
import { send_query, ERROR_DB } from "../db";

export default class UserService {
  /**
   * Inserts new user information into database.
   * user object must contain firstname and email fields.
   * @param user 
   * @returns user_id
   */
  static async createUser(user) {
    try {
      const insertQuery = `
      INSERT INTO users (
        firstname,
        lastname,
        middlename,
        email,
        password
      ) VALUES (
        $1, $2, $3, $4, $5
      ) RETURNING user_id;`;
      const insertParams = [
        user.firstname,
        user.lastname,
        user.middlename,
        user.email,
        user.password
      ];

      const { rows } = await send_query(insertQuery, insertParams);
      return rows[0].user_id;
    } catch (err) {
      console.error(err);
      return { error: ERROR_DB, detail: err.detail };
    }
  }
}
