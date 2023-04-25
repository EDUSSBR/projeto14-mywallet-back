import { transactionsAccountRepository } from "../repositories/transactionsAccountRepositories.js";
import { transactionsRepository } from "../repositories/transactionsRepository.js";

export async function updateTransactionService(value, desc, transactionID, userID){
    const isOwner = await transactionsAccountRepository.confirmUserTransaction(userID, transactionID)
    if (isOwner===null){
        throw { status: 404, message: "cannot find this transaction"}
    }
    const  updatedTransaction  =  await transactionsRepository.updateTransaction(value, desc, transactionID)
    if (updatedTransaction.acknowledged===false){
        throw { status : 400, message: "try again later."}
    }
}


//FAZER DE DELEÇÃO DEPOIS