import { Router } from "express";
import { agents } from "../repositories/ticketRepository.js";
const router=Router();router.get("/",async(_req,res,next)=>{try{res.json(await agents())}catch(e){next(e)}});export default router;
