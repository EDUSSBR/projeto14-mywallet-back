import { transactionsAccountRepository } from "../repositories/transactionsAccountRepositories.js"
import { transactionsRepository } from "../repositories/transactionsRepository.js"
export async function deleteTransactionService(userID, transactionID) {
        const isOwner = await transactionsAccountRepository.confirmUserTransaction(userID, transactionID)
        if (isOwner===null){
            throw { status: 404, message: "cannot find this transaction"}
        }
        const {deleteResponse, dataResponse} = await transactionsAccountRepository.deleteByTransactionsID(userID, transactionID)
        if (deleteResponse.deletedCount === 0) {
                throw { message: "Cannot find transaction", status: 404 }
        }
        transactionsRepository.deleteTransaction(transactionID)
        return dataResponse
}