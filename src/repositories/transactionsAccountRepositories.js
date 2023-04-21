import { ObjectId } from "mongodb"
const db = (await import('../db/index.js')).default
// db = db.default
// console.log(await db.listCollections().toArray())

export const transactionsAccountRepository = {
  db: db.collection("transactionsAccount"),
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
          },
          transactions: {
            $push: '$transaction',
          }
        }
      },
      {
        $project: {
          _id: 0,
        }
      }

    ]).toArray()
    console.log(transactions)
    if (transactions.length === 0) {
      return { saldo: 0, transactions: [] }
    }

    return transactions
  }
}