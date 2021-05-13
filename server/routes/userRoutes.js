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

export default router
