import { transactionsAccountRepository } from "../repositories/transactionsAccountRepositories.js";

export async function getTransactionService(id){
    const [transactions] = await transactionsAccountRepository.getTransactionsByUserID(id)
    transactions.saldo =  Number(transactions.saldo).toFixed(2)
    return transactions
}