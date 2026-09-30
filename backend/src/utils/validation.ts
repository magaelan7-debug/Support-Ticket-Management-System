import type { Category, Priority, Status, TicketInput } from "../types/index.js";
const priorities:Priority[]=["LOW","MEDIUM","HIGH","CRITICAL"];
const categories:Category[]=["TECHNICAL","BILLING","ACCOUNT","GENERAL"];
const statuses:Status[]=["OPEN","IN_PROGRESS","RESOLVED","CLOSED"];
export function isPriority(v:string):v is Priority{return priorities.includes(v as Priority)}
export function isCategory(v:string):v is Category{return categories.includes(v as Category)}
export function isStatus(v:string):v is Status{return statuses.includes(v as Status)}
export function validateTicketInput(body:Partial<TicketInput>):string[]{const errors:string[]=[];if(!body.name?.trim())errors.push("Name is required");if(!body.subject?.trim())errors.push("Subject is required");if(!body.priority||!isPriority(body.priority))errors.push("Valid priority is required");if(!body.category||!isCategory(body.category))errors.push("Valid category is required");if(!body.email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))errors.push("Valid email is required");if(!body.description||body.description.trim().length<10)errors.push("Description must contain at least 10 characters");return errors}
