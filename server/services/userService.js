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
          password,
          garden_size,
          precip
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7
        ) RETURNING user_id;`
      const insertParams = [
        user.firstname,
        user.lastname,
        user.middlename,
        user.email,
        user.password,
        user.garden_size,
        0
      ]

      const { rows } = await send_query(insertQuery, insertParams)
      return rows[0].user_id
    } catch (err) {
      console.error(err)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  /**
   * Queries the users table for a user with matching email and password.
   * If a user returns, then the function returns the user_id of the
   * corresponding user.
   * @param email 
   * @param password 
   * @returns user_id
   */
  static async Login(email, password) {
    try {
      const selectQuery = `
        SELECT user_id FROM users
        WHERE email = $1
        AND password = $2;`
      const selectParams = [email, password]
      const { rows } = await send_query(selectQuery, selectParams)
      return rows.length == 1
        ? rows[0].user_id
        : {
            error: 'Database Error',
            detail: `No user found`,
          }
    } catch (err) {
      console.error(err.stack)
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
        : {
            error: 'Database Error',
            detail: `No user found with id: ${user_id}`,
          }
    } catch (err) {
      console.error(err.stack)
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
  static async getUserByEmail(email) {
    try {
      const selectQuery = `
        SELECT * FROM users
        WHERE email = $1;`
      const selectParams = [email]
      const { rows } = await send_query(selectQuery, selectParams)
      return rows.length == 1
        ? rows[0]
        : {
            error: 'Database Error',
            detail: `No user found with email: ${email}`,
          }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  /**
   * updates the garden_size column for a given user
   * @param {*} email 
   * @param {*} garden_size 
   * @returns 
   */
  static async updateUserGarden(email, garden_size) {
    try {
      const date = new Date(Date.now())
      const queryString = `
        UPDATE users
        SET garden_size = $1,
        last_modified = $3
        WHERE email = $2
        returning garden_size;`
      const queryParameters = [garden_size, email, date.toDateString()]
      const { rows } = await send_query(queryString, queryParameters)
      return rows.length == 1
        ? rows[0]
        : {
          error: 'Database Error',
          detail: `No user found with email: ${email}`,
        }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  /**
   * updates the garden_size column for a given user
   * @param {*} email 
   * @param {*} garden_size 
   * @returns 
   */
  static async updatePrecip(email, precip) {
    try {
      const date = new Date(Date.now())
      const queryString = `
        UPDATE users
        SET precip = $1,
        last_modified = $3
        WHERE email = $2
        returning precip;`
      const queryParameters = [precip, email, date.toDateString()]
      const { rows } = await send_query(queryString, queryParameters)
      return rows.length == 1
        ? rows[0]
        : {
          error: 'Database Error',
          detail: `No user found with email: ${email}`,
        }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }
}
