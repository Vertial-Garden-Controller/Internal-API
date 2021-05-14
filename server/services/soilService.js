import { send_query, ERROR_DB } from '../db/index'

export default class SoilService {
  static async getSoilInfo(email, start_time, end_time) {
    if(!start_time || !end_time) {
      try {
        const insertQuery = `
          SELECT * FROM sensor_data
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
    } else {
      try {
        const insertQuery = `
          SELECT * FROM sensor_data
          WHERE email = $1
          AND date_created > $2
          AND date_created < $3`
        const insertParams = [
          email,
          start_time,
          end_time
        ]
        const { rows } = await send_query(insertQuery, insertParams)
        return rows
      } catch (err) {
        console.error(err.stack)
        return { error: ERROR_DB, detail: err.detail }
      }
    }
  }
}
