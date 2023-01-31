const InstallmentController = require('../controllers/installment.controllers')
const { errorHandler } = require('../helpers/err-handler.helpers')
const { AuthMidleware, AuthorizedInstallment } = require('../middlewares/auth')
// const AuthMidleware = require('../middlewares/auth')

const router = require('express').Router()

router.use(AuthMidleware)
router.post('/', InstallmentController.create)
router.get('/', InstallmentController.findAll)
router.get('/:id', AuthorizedInstallment, InstallmentController.findOne)
router.use(errorHandler)
module.exports = router
