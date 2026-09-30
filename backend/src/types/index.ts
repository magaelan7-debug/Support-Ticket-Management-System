export type Priority = "LOW"|"MEDIUM"|"HIGH"|"CRITICAL";
export type Category = "TECHNICAL"|"BILLING"|"ACCOUNT"|"GENERAL";
export type Status = "OPEN"|"IN_PROGRESS"|"RESOLVED"|"CLOSED";
export type AgentStatus = "ACTIVE"|"INACTIVE";
export interface TicketRow { id:number; customer_id:number; customer_name:string; customer_email:string; agent_id:number|null; agent_name:string|null; subject:string; description:string; priority:Priority; category:Category; status:Status; created_at:Date; updated_at:Date; }
export interface AgentRow { id:number; name:string; email:string; department:string; status:AgentStatus; created_at:Date; }
export interface TicketInput { name:string; email:string; subject:string; description:string; priority:Priority; category:Category; }
