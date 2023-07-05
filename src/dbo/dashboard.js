const { date } = require('joi')
const db = require('../config/db')

const search = async (tableName, params = []) => {
  const result = await db(tableName)
    .select(
      'os.id',
      'os.performedDate',
      'os.numeroProtocolo',
      'os.idServiceRequested',
      'service.priority',
      'service.time',
      'os.idTeam',
      'os.status'
    )
    .leftJoin('service', 'os.idServiceRequested', 'service.externalCode')
    .where('os.deleted_at', null)
    .where(function () {
      for (let i = 0; i < params.length; i++) {
        const element = params[i]
        if (element.operator) {
          switch (element.operator) {
            case 'AND':
              this.andWhere(element.column, element.signal, element.value)
              break
            case 'OR':
              this.orWhere(element.column, element.signal, element.value)
              break
            case 'LIKE':
              this.orWhere(element.column, element.operator, `%${element.value}%`)
              break
            case 'IN':
              this.whereIn(element.column, element.value)
              break
            default:
              this.andWhere(element.column, 'LIKE', `%${element.value}%`)
              break
          }
        } else {
          this.where(element.column, element.signal, element.value)
        }
      }
    })
    .orderBy('os.numeroProtocolo', 'DESC')
    .catch((err) => {
      return false
    })
  return result
}

const filter = async () => {
  const result = await db('os')
    .select('os.idServiceRequested', 'os.idTeam', 'service.time')
    .leftJoin('service', 'os.idServiceRequested', 'service.externalCode')
    .catch((err) => {
      console.log(err.message)
      return []
    })

  const idServiceRequested = result.map((r) => r.idServiceRequested).sort((a, b) => a - b)
  const idTeam = result.map((r) => r.idTeam).sort((a, b) => a - b)
  const time = result.map((r) => r.time).sort((a, b) => a - b)

  return {
    idServiceRequested: [...new Set(idServiceRequested)],
    idTeam: [...new Set(idTeam)],
    time: [...new Set(time)],
  }
}

module.exports = {
  search,
  filter,
}
