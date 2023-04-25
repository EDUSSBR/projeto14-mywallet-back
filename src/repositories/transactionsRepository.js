import { ObjectId } from "mongodb"
const db = (await import('../db/index.js')).default

export const transactionsRepository = {
  db: db.collection("transactions"),

  deleteTransaction: async function deleteTransaction(transactionId) {
    return await this.db.deleteOne({ transactionID:new ObjectId(transactionId) })
  },
  updateTransaction: async function updateTransaction(value, desc, transactionID){
    return await this.db.updateOne({_id: new ObjectId(transactionID)}, { $set: { value, desc }})
  }
}


