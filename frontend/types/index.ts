export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Category = "TECHNICAL" | "BILLING" | "ACCOUNT" | "GENERAL";
export type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type AgentStatus = "ACTIVE" | "INACTIVE";

export interface Agent { id:number; name:string; email:string; department:string; status:AgentStatus; created_at:string; }
export interface Ticket { id:number; customer_id:number; customer_name:string; customer_email:string; agent_id:number|null; agent_name:string|null; subject:string; description:string; priority:Priority; category:Category; status:Status; created_at:string; updated_at:string; }
export interface TicketPage { data:Ticket[]; page:number; limit:number; total:number; totalPages:number; }
export interface DashboardStats { total:number; open:number; inProgress:number; resolved:number; recent:Ticket[]; }
