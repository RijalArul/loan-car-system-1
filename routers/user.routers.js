const UserController = require('../controllers/user.controllers')
const { AuthMidleware } = require('../middlewares/auth')
// const AuthMidleware = require('../middlewares/auth')

const router = require('express').Router()

router.post('/login', UserController.login)
router.use(AuthMidleware)
router.patch('/logout/:id', UserController.logout)
router.post('/deposite', UserController.deposite)

module.exports = router
