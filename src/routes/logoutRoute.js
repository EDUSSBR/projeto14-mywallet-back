import { Router } from 'express';
import { validateAccountInfo } from '../middlewares/validateSignInInfo.js';
import { authenticateUserMiddleware } from '../middlewares/authenticateUser.js';
import { logoutService } from '../services/logoutService.js';

const router = new Router()

router.post("/logout", authenticateUserMiddleware, async (req, res) => {
    try {
        const token = req.token
        const id = req.headers.id
        await logoutService(id, token)
        res.status(200).send()
    } catch (error) {
        if (error.status) {
            return res.status(error.status).send(error.message)
        }
        console.log("A not found Error appeared")
        console.log(error)
        res.sendStatus(500)
    }

})

export default router