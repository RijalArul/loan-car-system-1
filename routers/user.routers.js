const UserController = require('../controllers/user.controllers')
const AuthMidleware = require('../middlewares/auth')

const router = require('express').Router()

router.post('/login', UserController.login)
router.patch('/logout/:id', UserController.logout)
router.post('/deposite', AuthMidleware, UserController.deposite)

module.exports = router
