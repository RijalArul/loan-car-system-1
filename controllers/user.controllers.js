const { User, Deposite, sequelize } = require('../models')
class UserController {
  static async login (req, res) {
    const t = await sequelize.transaction()
    try {
      const { username } = req.body

      await User.findOrCreate({
        where: {
          username: username
        },
        defaults: {
          username: username,
          is_login: true
        }
      })

      const updateLogin = await User.update(
        { is_login: true },
        { where: { username: username }, returning: true }
      )

      res.status(201).json({
        data: updateLogin[1][0],
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
    const t = await sequelize.transaction()

    try {
      const { user_id } = req.headers
      const { balance } = req.body

      const update_balance = await User.update(
        { balance: balance },
        {
          where: {
            id: user_id
          },
          returning: true
        },
        { transaction: t }
      )

      await Deposite.create({
        user_id: user_id
      })

      await t.commit()

      res.status(201).json({
        data: update_balance[1][0],
        message: 'Success Update Deposite Balance'
      })
    } catch (err) {
      if (t) {
        await t.rollback()
        res.status(400).json({
          err: err,
          message: 'Failed Update Deposite Balance'
        })
      }
    }
  }
}

module.exports = UserController
