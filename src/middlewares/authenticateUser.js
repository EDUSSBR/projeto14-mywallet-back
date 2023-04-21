import { accountRepository } from "../repositories/accountRepository.js"
import { uuidValidateV4 } from '../helpers/uuidValidator.js';
export async  function authenticateUserMiddleware(req, res, next) {
    try { 
        const { authorization, id } = req.headers
        const token = authorization?.replace("Bearer ", "")
        const isNotAvalidToken = token === undefined || token.length === 0 || !uuidValidateV4(token)
        if (isNotAvalidToken) {
            return res.status(401).send("Invalid token")
        }
        const user = await accountRepository.getUserByID(id)
        let tokenExistsInDatabase= false;
        for (let item of user.token) {
            if (item === token){
                tokenExistsInDatabase=true
            }
        }
        if (!tokenExistsInDatabase){
            return res.status(401).send("Invalid token")
        }
        req.token=token
        next()
    } catch (e) {
        if (e.status) {
            return res.status(e.status).send(e.message)
        }
        console.error(e)
        res.sendStatus(500)
    }
}



