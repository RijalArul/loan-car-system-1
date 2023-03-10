const { User, Installment, Invoice } = require('../models')
async function AuthMidleware (req, res, next) {
  const { user_id } = req.headers

  try {
    const user = await User.findOne({
      where: {
        id: user_id
      }
    })

    if (user.id === user_id || user.is_login === true) {
      next()
    } else {
      throw new Error('Failed Authenthicated')
    }
  } catch (err) {
    next(err)
  }
}

async function AuthorizedInstallment (req, res, next) {
  try {
    const { user_id } = req.headers

    const my_installment = await Installment.findOne({
      where: {
        user_id: user_id
      }
    })

    if (my_installment) {
      next()
    } else {
      throw new Error('Forbidden Access')
    }
  } catch (err) {
    next(err)
  }
}

async function AuthorizedInvoice (req, res, next) {
  try {
    const { user_id } = req.headers

    const my_invoice = await Invoice.findOne({
      where: {
        user_id: user_id
      }
    })

    if (my_invoice) {
      next()
    } else {
      throw new Error('Forbidden Access')
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  AuthMidleware,
  AuthorizedInstallment,
  AuthorizedInvoice
}
