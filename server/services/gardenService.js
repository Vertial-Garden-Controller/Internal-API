import { send_query, ERROR_DB } from '../db/index'

export default class GardenService {
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
        : { error: ERROR_DB, detail: 'Database error creating new garden.' }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async getGardenByID(garden_id) {
    try {
      const insertQuery = `
        SELECT * FROM gardens
        WHERE garden_id = $1`
      const insertParams = [
        garden_id
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows.length == 1
        ? rows[0]
        : { error: ERROR_DB, detail: 'Could not return requested garden.' }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async getAllGardens(email) {
    try {
      const insertQuery = `
        SELECT * FROM gardens
        WHERE email = $1`
      const insertParams = [
        email
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async updateGarden(garden_id, garden) {
    try {
      const insertQuery = `
        UPDATE gardens
        SET  
          user_id = $1,
          coords = ($2, $3),
          zip_code = $4,
          last_modified = $5
        WHERE garden_id = $6
        RETURNING garden_id;`
      const insertParams = [
        garden.user_id,
        garden.coords.x,
        garden.coords.y,
        garden.zip_code,
        new Date().toISOString(),
        garden_id
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async deleteGarden(garden_id) {
    try {
      const insertQuery = `
        DELETE FROM gardens
        WHERE garden_id = $1
        RETURNING garden_id;`
      const insertParams = [
        garden_id
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows[0]
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }
}
