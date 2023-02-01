const successHandler = require('../helpers/succes-handler')
const { User, Deposite, sequelize } = require('../models')
class UserController {
  static async login (req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { username } = req.body

      const user = await User.findOrCreate({
        where: {
          username: username
        },
        defaults: {
          is_login: true
        },
        transaction: t
      })

      const updateLogin = await User.update(
        { is_login: true },
        { where: { username: user[0].username }, returning: true },
        {
          transaction: t
        }
      )

      await t.commit()

      successHandler(res, 201, updateLogin[1][0], 'Success Login')
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }

  static async logout (req, res, next) {
    try {
      const { user_id } = req.headers
      const user = await User.findOne({
        where: {
          id: user_id
        }
      })

      if (user.is_login === true) {
        const logout_user = await user.update(
          { is_login: false },
          {
            where: {
              id: user.id
            },
            returning: true
          }
        )

        successHandler(
          res,
          200,
          logout_user,
          `Thank you, ${logout_user.username}`
        )
      } else {
        throw new Error('Invalid User')
      }
    } catch (err) {
      next(err)
    }
  }

  static async deposite (req, res, next) {
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

      const deposite = await Deposite.findOne({
        where: {
          user_id: user_id
        }
      })

      if (!deposite) {
        await Deposite.create(
          {
            user_id: user_id
          },
          { transaction: t }
        )
      }

      await t.commit()

      successHandler(
        res,
        201,
        update_balance[1][0],
        'Success Update Deposite Balance'
      )
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
