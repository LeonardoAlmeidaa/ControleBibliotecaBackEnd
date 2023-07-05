const moment = require('moment')

const validate = async (req, res, next) => {
  const now = moment()
  const cookieTime = moment(req.cookies.cookieTime)
  const validateTime = now.diff(cookieTime, 'minutes')

  if (validateTime < 15 && req.cookies.cookieTime) {
    res.cookie('cookieTime', now)
    return next()
  } else {
    return res.sendStatus(401)
  }
}

module.exports = { validate }
