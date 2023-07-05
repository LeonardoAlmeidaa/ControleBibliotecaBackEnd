const dbo = require("../dbo/base")
const validation = require("../model/book")
const tableName = "book"

const get = async () => {
    return await dbo.get(tableName)
}

const getById = async (id) => {
    if (!id) {
        return false
    }
    return await dbo.getById(id, tableName)
}

const search = async (body) => {
    if (!body || !Array.isArray(body) || body.length === 0 ) {
        return false
    }
    return await dbo.search(tableName, body)
}

const byId = async (body) => {
    if (!body) { 
        return false
    }
    return await dbo.byId(tableName, body, "id")
}

const byName = async (body) => { 
    if (!body) {
        return false
    }
    return await dbo.byName(tableName, body, "name")
}

const byGender = async (body) => {
    if (!body) {
        return false
    }
    return await dbo.byGender(tableName, body, "gender")
}

const byAuthor = async (body) => {
    if (!body) {
        return false
    }
    return await dbo.byAuthor(tableName, body, "author")
}


const insert = async (object) => {
    try {
        await validation.object.validateAsync(object, {
            abortEarly: false
        })
    } catch (error) {
        const errors = error.details.map((el) => el.message)
        return { errors }
    }
    return await dbo.insert(object, tableName)
}

const update = async (object, id) => {
    if (!id) {
        return false
    }
    try {
        await validation.object.validateAsync(object, {
            abortEarly: false
        })
    } catch (error) {
        const errors = error.details.map((el) => el.message)
        return { errors }
    }
    return await dbo.update(object, tableName)
}
