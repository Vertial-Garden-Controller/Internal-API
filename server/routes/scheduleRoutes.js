import express from 'express'
var router = express.Router()
import ScheduleController from '../controllers/scheduleController.js'

// create new schedule
router.post('/', ScheduleController.newSchedule)
// get one schedule by schedule_id
router.get('/:schedule_id', ScheduleController.getScheduleByID)
// get all schedules associated with a user
router.post('/user/:user_id', ScheduleController.getAllSchedules)
// update schedule
router.put('/:schedule_id', ScheduleController.updateSchedule)
// delete schedule by id
router.delete('/scedule/:schedule_id', ScheduleController.deleteSchedule)

export default router
