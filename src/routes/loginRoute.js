import express from 'express';

const router = new express.Router()

router.get("/login", (req,res)=>{
    res.send("login route working")
})

export default router