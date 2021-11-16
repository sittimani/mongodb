const connection = require("../connection")

module.exports = {
    employess: async() => {
        const db = await connection.connectToDB()
        const data = await db.collection(process.env.COLLECTION).find({}).toArray()
        console.log(data);
        return data
    },
    addEmployee: async(data) => {
        const db = await connection.connectToDB()
        const res = await db.collection(process.env.COLLECTION).insertOne(data)
        return res
    },
    groupEmployee: async() => {
        const db = await connection.connectToDB()
        const aggregate = [{
            '$group': {
                '_id': '$team',
                'Avg salary': {
                    '$avg': '$salary'
                },
                "total employees": {
                    "$sum": 1
                }
            }
        }];
        const res = await db.collection(process.env.COLLECTION).aggregate(aggregate).toArray()
        return res
    },

    updateEmployee: async(id, body) => {
        const db = await connection.connectToDB()
        const res = db.collection(process.env.COLLECTION).findOneAndReplace({ _id: require("mongoose").Types.ObjectId(id) }, body)
        return res
    },

    deleteEmployee: async(id) => {
        const db = await connection.connectToDB()
        const res = await db.collection(process.env.COLLECTION).deleteOne({ _id: require("mongoose").Types.ObjectId(id) })
        return res
    }
}