import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config()
let db;
let client;
export default db = await (async (host = process.env.DATABASE_URL) => {
    try {
        console.log("Trying to connect with mongo..")
         client = new MongoClient(host, { useUnifiedTopology: true })
        const conn = await client.connect()
        console.log("Mongo connected!")
        return conn.db()
    } catch (e) {
        console.log(e)
    }
})()