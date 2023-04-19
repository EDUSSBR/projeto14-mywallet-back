import { accountRepository } from "../repositories/accountRepository.js";
import bcrypt from 'bcrypt';

export async function createAccountService(nome, email, senha) {
    const user = await accountRepository.getAccountByEmail(email)
    if (user !== null) {
        throw { message: 'Já existe um usuário cadastrado com este endereço de e-mail.', status: 409 }
    }
    const hashedPassword = await bcrypt.hash(senha, 10)
    const createdUser = await accountRepository.createAccount(nome,email,hashedPassword)
    if (!createdUser.acknowledged) {
        throw { message: 'Problemas no servidor, tente novamente mais tarde.', status: 500 }
    }
}