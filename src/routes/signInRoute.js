import express from 'express';
import { validateAccountInfo } from '../middlewares/validateSignInInfo.js';
import { signInService } from '../services/signInService.js';

const router = new express.Router()

router.post("/signin", validateAccountInfo, async (req, res) => {
    try {
        const { email, senha } = req.body
        const generatedToken = await signInService( email, senha)
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