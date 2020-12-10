import express from 'express'
var router = express.Router()
import UserController from '../controllers/userController'

/* GET users listing. */
// signup user
router.post('/signup', UserController.newUser)
// login user
router.get('/login', UserController.Login)
// get user information
router.get('/:user_id', UserController.getUserInfo)

export default router
