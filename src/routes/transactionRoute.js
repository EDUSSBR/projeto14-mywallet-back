import express from 'express';
import { authenticateUserMiddleware } from '../middlewares/authenticateUser.js';
import { validateTransactionInfo } from '../middlewares/validateTransactionInfo.js';
import { executeTransaction } from '../db/executeTransaction.js';
import { getTransactionService } from '../services/getTransactionsService.js';

const router = new express.Router()

router.post("/transaction/:tipo", authenticateUserMiddleware, validateTransactionInfo, async (req, res) => {
    try {
        const { id } = req.headers
        const { tipo } = req.params
        const { value, desc } = req.body
        await executeTransaction(id, value, desc, tipo)
        res.send("Transaction created!")
    } catch (e) {
        if (e.status) {
            return res.status(e.status).send(e.message)
        }
        console.log("A not found Error appeared")
        console.error(e)
        res.status(500).send(e.message)
    }
})

router.get("/transaction", authenticateUserMiddleware, async (req, res) => {
    try {
        const {id} = req.headers
        const transactions = await getTransactionService(id)
        res.send(transactions)
    } catch (e) {
        if (e.status) {
            return res.status(e.status).send(e.message)
        }
        console.log("A not found Error appeared")
        console.error(e)
        res.status(500).send(e.message)
    }
})

export default router