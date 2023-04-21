import { accountRepository } from '../repositories/accountRepository.js'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
export async function signInService(email, senha) {
    const userExists = await accountRepository.getAccountByEmail(email)
    if (userExists === null) {
        throw { message: "Usuário não encontrado", status: 404 }
    }
    const isCorrectPasword = await bcrypt.compare(senha, userExists.senha)
    if (!isCorrectPasword) {
        throw { message: "Senha incorreta, verifique e tente novamente.", status: 401 }
    }
    const newAuthToken  = uuidv4()
    if (userExists?.token?.length>0){
        const tokens = [...userExists.token, newAuthToken]
        await accountRepository.setUserToken(userExists._id, tokens)
    } else {
        await accountRepository.setUserToken(userExists._id, [newAuthToken])
    }
    return {token: newAuthToken, id: userExists._id}
}