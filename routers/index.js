const router = require('express').Router()
const userRouter = require('./user.routers')

router.use('/users', userRouter)

module.exports = router
