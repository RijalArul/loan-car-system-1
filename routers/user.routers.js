const UserController = require('../controllers/user.controllers')

const router = require('express').Router()

router.post('/login', UserController.login)
router.patch('/logout/:id', UserController.logout)

module.exports = router
