import { ObjectId } from "mongodb"
const db = (await import('../db/index.js')).default
// db = db.default
// console.log(await db.listCollections().toArray())

export const accountRepository = {
  db: db.collection("account"),
  createAccount: async function createAccount(nome, email, senha) {
    const id = new ObjectId()
    const createdAccount = await this.db.insertOne({ _id: id , nome, email, senha })
    return {id, acknowledged:createdAccount.acknowledged }
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
  removeTokenByID: async function removeTokenByID(id, token) {
    return await this.db.updateOne({ _id: new ObjectId(id) }, { $pull: { token } })
  }
}


