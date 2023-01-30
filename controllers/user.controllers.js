const { User } = require('../models')
class UserController {
  static async login (req, res) {
    try {
      const { username } = req.body

      const user = await User.findOrCreate({
        where: {
          username: username
        },
        defaults: {
          username: username,
          is_login: true
        }
      })

      res.status(201).json({
        data: user,
        message: 'Success User Login'
      })
    } catch (err) {
      res.status(500).json({
        err: err,
        message: 'Internal Server Error'
      })
    }
  }

  static async logout (req, res) {
    try {
      const { id } = req.params
      const user = await User.findOne({
        where: {
          id: id
        }
      })

      if (user) {
        const logout_user = await user.update(
          { is_login: false },
          {
            where: {
              id: user.id
            },
            returning: true
          }
        )

        res.status(200).json({
          message: 'Lgout Success',
          data: logout_user
        })
      } else {
        throw new Error('Failed Logout / Invalid User')
      }
    } catch (err) {
      if (err.message === 'Failed Logout / Invalid User') {
        res.status(404).json({
          err: 'Users Not Found',
          message: 'Failed Logout'
        })
      } else {
        res.status(500).json({
          err: err,
          message: 'Internal Server Error'
        })
      }
    }
  }

  static async deposite (req, res) {
    try {
      console.log('MASUK')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = UserController
