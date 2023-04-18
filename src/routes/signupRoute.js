import express from 'express';

const router = new express.Router()

router.get("/signup", (req,res)=>{
    res.send("signup route working")
})

export default router