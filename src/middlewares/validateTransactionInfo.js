import Joi from "joi"
import { strip } from "../helpers/strip.js"

const accountSchema = Joi.object({
    value: Joi.number().positive().precision(2).required(),
    desc: Joi.string().trim().min(3).required()
})

export function validateTransactionInfo(req, res, next) {
    try {
        const isEverithingRequiredNotSent = req.body.value === undefined || req.body.desc === undefined
        if (isEverithingRequiredNotSent) {
            throw { message: "please make a valid request, all fields are required.", status: 422 }
        }
        const [value, desc] = strip(req.body?.value, req.body?.desc);
        const newAccount = accountSchema.validate({ value, desc }, { abortEarly: false })
        if (newAccount.error) throw { message: newAccount.error.details.map(item => item.message), status: 422 }
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

