import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config()
const client = new MongoClient(process.env.DATABASE_URL)

export async function executeTransaction(id, value, desc, type) {
    try {
        await client.connect()
        const session = client.startSession();
        session.startTransaction()
        let newTransactionAccountID = new ObjectId();
        const db = client.db()
        const user = await db.collection('account').findOne({_id: new ObjectId(id)})
        if (user === null) {
            throw { message: "Houve um problema em sua transação", status: 404}
        } 

        const [transactionAccount, transaction] = await Promise.all([
            new Promise((res)=>res(db.collection('transactionsAccount').insertOne({accountID: user._id, transactionID: newTransactionAccountID}))), 
            new Promise((res)=>res(db.collection('transactions').insertOne({ _id: newTransactionAccountID , value: Number(value).toFixed(2), desc, type, date: new Date() })))
        ])
        if (!transactionAccount.acknowledged || !transaction.acknowledged){
            throw { message: "Houve um problema em sua transação", status: 404}
        }
        console.log(" TRANSACAO criada com sucesso")
    } catch (e) {
        console.log(e)
    } finally {
        console.log("Closing db connection...")
        await client.close();
    }

}