const facade = require("../facade/dashboard")

const search = async (req, res) => {
  const object = req.body
  const result = await facade.search(object)
  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const filter = async (req, res) => {
  const result = await facade.filter()
  return res.status(200).send(result)
}

module.exports = {
  search,
  filter,
}
