import express from 'express';
import { authenticateUserMiddleware } from '../middlewares/authenticateUser.js';
import { validateTransactionInfo } from '../middlewares/validateTransactionInfo.js';
import { executeTransaction } from '../db/executeTransaction.js';
import { getTransactionService } from '../services/getTransactionsService.js';
import {deleteTransactionService}from '../services/deleteTransactionsService.js';
import { updateTransactionService } from '../services/updateTransactionService.js';
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
router.delete("/transaction/:transactionID", authenticateUserMiddleware, async (req, res) => {
    try {
        const {id: userID} = req.headers
        const {transactionID} = req.params
        const data = await deleteTransactionService(userID, transactionID)
        res.send(data)
    } catch (e) {
        if (e.status) {
            return res.status(e.status).send(e.message)
        }
        console.log("A not found Error appeared")
        console.error(e)
        res.status(500).send(e.message)
    }
})
router.put("/transaction/:tipo", authenticateUserMiddleware, validateTransactionInfo,  async (req, res) => {
    try {
  
        const {id: userID} = req.headers
        const {value, desc, transactionID} = req.body
        console.log(value, desc, transactionID, userID)
        const data = await updateTransactionService(value, desc, transactionID, userID)
        res.send(data)
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