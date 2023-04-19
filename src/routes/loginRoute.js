import express from 'express';
import { validateAccountInfo } from '../middlewares/validateLoginInfo.js';
import { loginService } from '../services/loginService.js';

const router = new express.Router()

router.post("/login", validateAccountInfo, async (req, res) => {
    try {
        const { email, senha } = req.body
        console.log(email, senha)
        const generatedToken = await loginService( email, senha)
        res.status(200).send(generatedToken)
    } catch (error) {
        if (error.status){
            return res.status(error.status).send(error.message)
        }
        console.log("A not found Error appeared")
        console.log(error)
        res.sendStatus(500)
    }

})

export default router