import express from 'express';
import { authenticateUserMiddleware } from '../middlewares/authenticateUser.js';

const router = new express.Router()

router.post("/nova-transacao/:tipo", authenticateUserMiddleware, async (req, res) => {
    const { authorization } = req.headers
    const { tipo } = req.params
    
    res.send("transaction route working")
})

export default router