import { send_query, ERROR_DB } from '../db/index'

export default class PlantTypesService {
  static async getPlantTypes() {
    try {
      const queryString = `
        SELECT * FROM plant_types;`
      const queryParameters = []
      const { rows } = await send_query(queryString, queryParameters)
      return rows
    } catch (err) {
      console.error(err.stack)
      return { error: ERROR_DB, detail: err.detail }
    }
  }
}
