import { accountRepository } from "../repositories/accountRepository.js"
import { uuidValidateV4 } from '../helpers/uuidValidator.js';
export async  function authenticateUserMiddleware(req, res, next) {
    try { 
        const { authorization, id } = req.headers
        const token = authorization?.replace("Bearer ", "")
        console.log(token)
        if (token === undefined || token.length === 0 || !uuidValidateV4(token)) {
            return res.status(401).send("Token invalido")
        }
        console.log(token)
        const userTokens = await accountRepository.getTokensByID(id)
        let tokenExists= false;
        console.log("TOKEN",userTokens)
        for (let item of userTokens.token) {
            console.log("item for",item)
            if (item === token){
                tokenExists=true
            }
        }
        if (!tokenExists){
            return res.status(401).send("Token invalido")
        }
        next()
    } catch (e) {
        if (e.status) {
            return res.status(e.status).send(e.message)
        }
        console.log(e)
        res.sendStatus(500)
    }
}



