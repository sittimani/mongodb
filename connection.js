const mongoDB = require("mongodb").MongoClient
require("dotenv").config()

module.exports = {
    connectToDB: async() => {
        const database = await mongoDB.connect(process.env.URL)
        return database.db(process.env.DB)
    }
}