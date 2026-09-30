import { Router } from "express";
import { dashboard } from "../repositories/ticketRepository.js";
const router=Router();router.get("/",async(_req,res,next)=>{try{res.json(await dashboard())}catch(e){next(e)}});export default router;
