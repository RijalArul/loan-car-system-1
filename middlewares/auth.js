const { User, Installment } = require('../models')
async function AuthMidleware (req, res, next) {
  const { user_id } = req.headers

  try {
    const user = await User.findOne({
      where: {
        id: user_id
      }
    })

    if (user && user.is_login === true) {
      next()
    } else {
      throw new Error('Authenthication_Failed')
    }
  } catch (err) {
    if (err.message === 'Authenthication_Failed') {
      res.status(401).json({
        err: err.message,
        message: err.message
      })
    } else {
      res.status(500).json({
        err: err,
        message: 'Internal Server Error'
      })
    }
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
      throw new Error('Unauthorized')
    }
  } catch (err) {
    if (err.message === 'Unauthorized') {
      res.status(401).json({
        err: err.message,
        message: err.message
      })
    } else {
      res.status(500).json({
        err: err,
        message: 'Internal Server Error'
      })
    }
  }
}

module.exports = {
  AuthMidleware,
  AuthorizedInstallment
}
