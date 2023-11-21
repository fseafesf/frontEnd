const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')

const clientFun = async function (c) {
    await client.connect()
    const db = client.db('mytest')
    return db.collection(c)
}

const main = async () => {
    let cc = await clientFun('cc')
    //    let d = await cc.insertOne({username:'monica',age:60})
    //    console.log(d)
    //    let d = await cc.find({age:{$gt:15}})
    //    console.log(await d.toArray())
    let d = await cc.updateOne({username:'znx'},{$set:{age:Number(60)}})
    console.log(d)
}
main().finally(() => {
    client.close()
})