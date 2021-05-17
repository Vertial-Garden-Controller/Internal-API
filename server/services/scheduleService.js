import { send_query, ERROR_DB } from '../db/index'

export default class ScheduleService {
  static async createNewSchedule(schedule) {
    try {
      const insertQuery = `
        INSERT INTO rules (
          start_time,
          end_time,
          email,
          days
        ) VALUES (
          $1, $2, $3,
          (
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10
          )
        ) RETURNING rule_id;`
      const insertParams = [
        schedule.start_time,
        schedule.end_time,
        schedule.email,
        schedule.days.mon,
        schedule.days.tue,
        schedule.days.wed,
        schedule.days.thu,
        schedule.days.fri,
        schedule.days.sat,
        schedule.days.sun,
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      console.log(rows)
      return rows.length == 1
        ? rows[0].rule_id
        : { error: ERROR_DB, detail: 'Database error creating new schedule.' }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async getScheduleByID(schedule_id) {
    try {
      const insertQuery = `
        SELECT * FROM rules
        WHERE rule_id = $1`
      const insertParams = [
        schedule_id
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows.length == 1
        ? rows[0]
        : { error: ERROR_DB, detail: 'Could not return requested schedule.' }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async getAllSchedules(email) {
    try {
      const insertQuery = `
        SELECT r.*, u.precip
        FROM
          rules as r,
          users as u
        WHERE
          r.email = u.email AND
          r.email = $1
        ORDER BY r.rule_id ASC;`
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

  static async updateSchedule(schedule_id, schedule) {
    try {
      const date = new Date(Date.now())
      const insertQuery = `
        UPDATE rules
        SET
          start_time = $1,
          end_time = $2,
          email = $3,
          days = (
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10
          ),
          last_modified = $11
        WHERE rule_id = $12
        RETURNING rule_id;`
      const insertParams = [
        schedule.start_time,
        schedule.end_time,
        schedule.email,
        schedule.days.mon,
        schedule.days.tue,
        schedule.days.wed,
        schedule.days.thu,
        schedule.days.fri,
        schedule.days.sat,
        schedule.days.sun,
        date.toDateString(),
        schedule_id
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows[0]
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async deleteSchedule(schedule_id) {
    try {
      const insertQuery = `
        DELETE FROM rules
        WHERE rule_id = $1
        RETURNING rule_id;`
      const insertParams = [
        schedule_id
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows[0]
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }
}
