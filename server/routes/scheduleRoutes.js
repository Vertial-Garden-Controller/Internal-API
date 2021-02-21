import express from 'express'
var router = express.Router()
import ScheduleController from '../controllers/scheduleController.js'

// create new schedule
router.post('/schedule', ScheduleController.newSchedule)
// get user information
router.get('/:schedule_id', ScheduleController.getScheduleByID)
// login user
router.post('/schedule/all', ScheduleController.getAllSchedules)
// update schedule
router.put('/:schedule_id', ScheduleController.updateSchedule)
// delete schedule by id
router.delete('/:schedule_id', ScheduleController.deleteSchedule)

export default router
