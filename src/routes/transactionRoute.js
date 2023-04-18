import express from 'express';

const router = new express.Router()

router.get("/transaction", (req,res)=>{
    res.send("transaction route working")
})

export default router