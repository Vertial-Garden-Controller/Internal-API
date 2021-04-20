import { send_query, ERROR_DB } from '../db/index'

export default class PlantService {
  static async createNewPlant(plant) {
    try {
      const insertQuery = `
        INSERT INTO plants (
          plant_count,
          garden_id,
          plant_type_id
        ) VALUES (
          $1, $2, $3
        );`
      const insertParams = [
        plant.count,
        plant.garden_id,
        plant.type,
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return undefined
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async getPlantByID(garden_id, type) {
    try {
      const insertQuery = `
        SELECT plant_count FROM plants, gardens, plant_types
        WHERE plants.garden_id = gardens.garden_id
        AND plants.plant_type_id = plant_types.plant_type_id
        AND plants.garden_id = $1
        AND plants.plant_type_id = $2`
      const insertParams = [
        garden_id,
        type,
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows.length == 1
        ? rows[0]
        : { error: ERROR_DB, detail: 'Could not return requested plant count.' }
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async getAllPlants(email) {
    try {
      const insertQuery = `
      SELECT plant_count,
      plant_type_id,
      plants.garden_id,
      plants.date_created,
      plants.last_modified
      FROM plants, gardens
      WHERE gardens.garden_id = plants.garden_id
      AND email = $1;`
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

  static async updatePlant(garden_id, type, plant) {
    try {
      const insertQuery = `
        UPDATE plants
        SET
          plant_count = $1,
          plant_type_id = $2,
          last_modified = $3
        WHERE garden_id = $4
        AND plant_type_id = $5;`
      const insertParams = [
        plant.count,
        plant.type,
        new Date().toISOString(),
        garden_id,
        type,
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }

  static async deletePlant(garden_id, type) {
    try {
      const insertQuery = `
        DELETE FROM plants
        WHERE garden_id = $1
        AND plant_type_id = $2;`
      const insertParams = [
        garden_id,
        type
      ]
      const { rows } = await send_query(insertQuery, insertParams)
      return rows
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }
}
