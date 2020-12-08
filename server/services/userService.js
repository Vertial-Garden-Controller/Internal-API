import { query } from 'express'
/**
 * User services are methods that deal with user information
 * between the server code and the database.
 *
 * User service methods should only be called from user controller.
 */
import { send_query, ERROR_DB } from '../db'

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
        ) RETURNING user_id;`
      const insertParams = [
        user.firstname,
        user.lastname,
        user.middlename,
        user.email,
        user.password,
      ]

      const { rows } = await send_query(insertQuery, insertParams)
      return rows[0].user_id
    } catch (err) {
      console.error(err)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  /**
   * Queries database for all information pertaining to a user by
   * the provided user_id.  If the user_id does not exist in the database,
   * an error is returned.  If the database returns too many users,
   * the function will error as well.
   * @param user_id
   * @returns user
   */
  static async getUserInfo(user_id) {
    try {
      const selectQuery = `
        SELECT * FROM users
        WHERE user_id = $1;`
      const selectParams = [user_id]
      const { rows } = await send_query(selectQuery, selectParams)
      return rows.length == 1
        ? rows[0]
        : { error: 'Number of users returned is not 1.' }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }
}
