import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config()
let db;
export default db = await (async (host = process.env.DATABASE_URL) => {
    try {
        console.log
        console.log("Trying to connect with mongo..")
        const client = new MongoClient(host, {useUnifiedTopology: true})
        const conn = await client.connect()
        console.log("Mongo connected!")
        return conn.db()
    } catch (e) {
        console.log(e)
    }
})()