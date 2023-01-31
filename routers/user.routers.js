const UserController = require('../controllers/user.controllers')
const { errorHandler } = require('../helpers/err-handler.helpers')
const { AuthMidleware } = require('../middlewares/auth')
// const AuthMidleware = require('../middlewares/auth')

const router = require('express').Router()

router.post('/login', UserController.login)
router.use(AuthMidleware)
router.patch('/logout', UserController.logout)
router.post('/deposite', UserController.deposite)
router.use(errorHandler)

module.exports = router
