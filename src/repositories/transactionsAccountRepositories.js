import { ObjectId } from "mongodb"
const db = (await import('../db/index.js')).default

export const transactionsAccountRepository = {
  db: db.collection("transactionsAccount"),
  addNewAccount: async function addNewAccount(accountID) {
    const newAcc = await this.db.insertOne({ accountID })
    return newAcc.acknowledged
  },
  confirmUserTransaction: async function confirmUserTransaction(accountID, transactionID){
    return await this.db.findOne({transactionID: new ObjectId(transactionID), accountID: new ObjectId(accountID)})
  },
  getTransactionsByUserID: async function getTransactionsByUserID(id) {
    const transactions = await this.db.aggregate([
      {
        $match: { accountID: new ObjectId(id) }
      },
      {
        $lookup: {
          from: "account",
          localField: "accountID",
          foreignField: "_id",
          as: "account"
        }
      },
      {
        $unwind: {
          path: "$account",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "transactions",
          localField: "transactionID",
          foreignField: "_id",
          as: "transaction"
        }
      },
      {
        $unwind: {
          path: "$transaction",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { "transaction.date": -1 }
      },
      {
        $group: {
          _id: '$accountID',
          nome: { $first: '$account.nome' },
          saldo: {
            $sum: {
              $cond: {
                if: { $eq: ['$transaction.type', 'entrada'] },
                then: { $toDouble: '$transaction.value' },
                else: { $subtract: [0, { $toDouble: '$transaction.value' }] }
              }
            }
          }
          ,
          transactions: {
            $push: '$transaction',
          }
        }
      },
      {
        $project: {
          _id: 0,
          nome: 1,
          saldo: 1,
          transactions: {
            $filter: {
              input: "$transactions",
              as: "transaction",
              cond: { $gt: ["$$transaction.value", 0] }
            }
          }
        }
      }
    ]).toArray()
    console.log(transactions)
    return transactions
  },
  deleteByTransactionsID: async function deleteByTransactionsID(accountId, transactionId) {
    const [deleteResponse, dataResponse] =  await Promise.all([this.db.deleteOne({ accountID: new ObjectId(accountId) , transactionID:new ObjectId(transactionId) }),
     this.getTransactionsByUserID(accountId)])
    return {deleteResponse, dataResponse}
  },
}