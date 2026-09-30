import { Router } from "express";
import * as c from "../controllers/ticketController.js";
const router=Router();
router.post("/",c.create);router.get("/",c.list);router.get("/:id",c.get);router.put("/:id",c.update);router.delete("/:id",c.remove);router.patch("/:id/assign",c.assign);router.patch("/:id/status",c.status);
export default router;
