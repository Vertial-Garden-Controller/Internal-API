import express from 'express'
var router = express.Router()
import ScheduleController from '../controllers/scheduleController.js'

// create new schedule
router.post('/', ScheduleController.newSchedule)
// get one schedule by schedule_id
router.get('/', ScheduleController.getScheduleByID)
// get all schedules associated with a user
router.get('/user/', ScheduleController.getAllSchedules)
// update schedule
router.put('/', ScheduleController.updateSchedule)
// delete schedule by id
router.delete('/', ScheduleController.deleteSchedule)

export default router
