import type { Agent, DashboardStats, Status, Ticket, TicketPage, Priority, Category } from "@/types";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function request<T>(path:string, options?:RequestInit):Promise<T> {
  const response = await fetch(`${API}${path}`, { ...options, headers:{"Content-Type":"application/json", ...(options?.headers ?? {})}, cache:"no-store" });
  const body:unknown = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof body === "object" && body !== null && "message" in body && typeof body.message === "string" ? body.message : "Request failed";
    throw new Error(message);
  }
  return body as T;
}
export const api = {
  dashboard: () => request<DashboardStats>("/dashboard"),
  agents: () => request<Agent[]>("/agents"),
  tickets: (params:string) => request<TicketPage>(`/tickets?${params}`),
  ticket: (id:number) => request<Ticket>(`/tickets/${id}`),
  createTicket: (data:{name:string;email:string;subject:string;description:string;priority:Priority;category:Category}) => request<Ticket>("/tickets",{method:"POST",body:JSON.stringify(data)}),
  updateTicket: (id:number,data:Partial<{subject:string;description:string;priority:Priority;category:Category}>) => request<Ticket>(`/tickets/${id}`,{method:"PUT",body:JSON.stringify(data)}),
  assign: (id:number,agentId:number|null) => request<Ticket>(`/tickets/${id}/assign`,{method:"PATCH",body:JSON.stringify({agent_id:agentId})}),
  status: (id:number,status:Status) => request<Ticket>(`/tickets/${id}/status`,{method:"PATCH",body:JSON.stringify({status})}),
  deleteTicket: (id:number) => request<{message:string}>(`/tickets/${id}`,{method:"DELETE"})
};
