import { send_query, ERROR_DB } from "../db";

export default class UserService {
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
