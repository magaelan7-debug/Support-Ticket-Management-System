import type { ErrorRequestHandler } from "express";
export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{void req;void next;console.error(err);const status=typeof err?.statusCode==="number"?err.statusCode:500;res.status(status).json({message:status===500?"Internal server error":err.message??"Request failed"})};
