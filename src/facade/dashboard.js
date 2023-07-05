const dbo = require("../dbo/dashboard")
const moment = require("moment")

const search = async (body) => {
  if (!body || !Array.isArray(body) || body.length === 0) {
    return false
  }

  const obj = await dbo.search("os", body)

  const updatedObj = obj.map((item) => {
    const numeroProtocolo = item.numeroProtocolo.toString()
    const date = numeroProtocolo.slice(0, 12)
    const idProgrammer = numeroProtocolo.slice(12)

    const protocolDate = moment.utc(date, "YYYYMMDDHHmm").local().toISOString()

    return {
      ...item,
      protocolDate,
      idProgrammer,
    }
  })

  return updatedObj
}

const filter = async () => {
  return await dbo.filter()
}

module.exports = {
  search,
  filter,
}
