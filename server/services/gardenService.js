import { send_query, ERROR_DB } from '../db/index'

export default class gardenService {
  static async createNewGarden(garden) {
    try {
      const insertQuery = `
        INSERT INTO gardens (
          user_id,
          coords,
          zip_code
        ) VALUES (
          $1, ($2, $3), $4
        ) RETURNING garden_id;`
      const insertParams = [
        garden.user_id,
        garden.coords.x,
        garden.coords.y,
        garden.zip_code,
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows.length == 1
        ? rows[0].garden_id
        : { error: ERROR_DB, detail: 'Could not return requested garden.' }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }
}
