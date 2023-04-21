import express from 'express';
import { validateAccountInfo } from '../middlewares/validateAccountInfo.js';
import { createAccountService } from '../services/createAccountService.js';

const router = new express.Router()

router.post("/signup", validateAccountInfo, async (req, res) => {
    try {
        const { nome, email, senha } = req.body
        await createAccountService(nome, email, senha)
        res.sendStatus(201)
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