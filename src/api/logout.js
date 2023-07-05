const logout = async (req, res) => {
  res.clearCookie("cookieID")
  res.clearCookie("cookieTime")
  return res.sendStatus(200)
}

module.exports = {
  logout,
}
