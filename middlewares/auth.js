const { User } = require('../models')
async function AuthMidleware (req, res, next) {
  const { user_id } = req.headers

  try {
    const user = await User.findOne({
      where: {
        id: user_id
      }
    })

    if (user) {
      next()
    } else {
      throw new Error('User_Unauthorized')
    }
  } catch (err) {
    if (err.message === 'User_Unauthorized') {
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

module.exports = AuthMidleware
