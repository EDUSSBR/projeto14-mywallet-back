import { ObjectId } from "mongodb"
const db = (await import('../db/index.js')).default
// db = db.default
// console.log(await db.listCollections().toArray())

export const accountRepository = {
  db: db.collection("account"),
  createAccount: async function createAccount(nome, email, senha) {
    return await this.db.insertOne({ nome, email, senha })
  },
  getAccountByEmail: async function getAccountByEmail(email) {
    const account = await this.db.findOne({ email })
    return account
  },
  setUserToken: async function setUserToken(userId, token) {
    return await this.db.updateOne({ _id: userId }, { $set: { token } })
  },
  getUserByID: async function getUserByID(id) {
    return await this.db.findOne({ _id: new ObjectId(id) })
  },
  getTokensByID: async function removeTokensByID(id, token) {
    return await this.db.updateOne({ _id: new ObjectId(id) }, { $pull: { token } })
  }
}


