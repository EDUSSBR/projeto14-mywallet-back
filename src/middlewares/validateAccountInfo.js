import Joi from "joi"
import { strip } from "../helpers/strip.js"

const accountSchema = Joi.object({
    nome: Joi.string().min(3).max(100).pattern(/^[a-zA-Z \p{L}]+$/u).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(3).required()
})

export function validateAccountInfo(req, res, next){
        try{
            const isEverithingRequiredNotSent = req.body.nome === undefined || req.body.email === undefined || req.body.senha === undefined
            if (isEverithingRequiredNotSent) {
                throw { message: "please make a valid request, all fields are required.", status: 422 }
            }
            const [nome, email, senha] = strip(req.body.nome, req.body.email, req.body.senha);
            const newAccount = accountSchema.validate({nome, email, senha},  { abortEarly: false })
            if (newAccount.error) throw {message: newAccount.error.details.map(item=>item.message), status: 422}
            next() 
        } catch (e) {
            if (e.status) {
                return res.status(e.status).send(e.message)
            }
            console.log("A not found Error appeared")
            console.error(e)
            res.status(500).send(e.message)
    
        }
}

