import { accountRepository } from "../repositories/accountRepository.js";
import { transactionsAccountRepository } from "../repositories/transactionsAccountRepositories.js";
import bcrypt from 'bcrypt';


const serverErrorMessage =  { message: 'Server problem, please try again.', status: 500 }
export async function createAccountService(nome, email, senha) {
    const user = await accountRepository.getAccountByEmail(email)
    if (user !== null) {
        throw { message: 'User already exists', status: 409 }
    }
    const hashedPassword = await bcrypt.hash(senha, 10)

    const createdAccount = await accountRepository.createAccount(nome,email,hashedPassword)
    if (!createdAccount.acknowledged){
        throw serverErrorMessage
    }
    const created = await transactionsAccountRepository.addNewAccount(createdAccount.id)
    if (!created) {
        throw serverErrorMessage
    }
}