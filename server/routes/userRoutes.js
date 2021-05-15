import express from 'express'
var router = express.Router()
import UserController from '../controllers/userController'

/* GET users listing. */
// signup user
router.post('/signup', UserController.newUser)
// login user
router.post('/login', UserController.Login)
// get user information
router.get('/', UserController.getUserInfo)
// get user information
router.get('/email', UserController.getUserByEmail)
// update user's garden size
router.put('/updateGarden', UserController.updateUserGarden)
// update estimated precip for user
router.put('/precip', UserController.updatePrecip)

export default router
