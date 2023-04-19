import Joi from "joi"
import { strip } from "../helpers/strip.js"

const accountSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(3).required()
})

export function validateAccountInfo(req, res, next){
        try{
            const [ email, senha] = strip(req.body.email, req.body.senha);
            const newAccount = accountSchema.validate({email, senha},  { abortEarly: false })
            if (newAccount.error) throw {message: newAccount.error.details.map(item=>item.message), status: 422}
            console.log("passou aqui")
            next() 
        } catch (e) {
            res.status(e.status).send(e.message)
        }
}

