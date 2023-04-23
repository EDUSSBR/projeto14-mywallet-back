import { accountRepository } from "../repositories/accountRepository.js";

export async  function logoutService(id, token){
    console.log(await accountRepository.removeTokensByID(id,token))
}