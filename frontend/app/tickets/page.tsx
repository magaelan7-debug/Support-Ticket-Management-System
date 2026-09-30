import Link from "next/link";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/PageHeader";
import { TicketFilters } from "@/components/TicketFilters";
import { TicketTable } from "@/components/TicketTable";
import { Pagination } from "@/components/Pagination";

export default async function TicketsPage({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){const sp=await searchParams;const q=new URLSearchParams();for(const [k,v] of Object.entries(sp)){if(v)q.set(k,v)}if(!q.has("page"))q.set("page","1");q.set("limit","10");let data;let agents=[];let error=false;try{[data,agents]=await Promise.all([api.tickets(q.toString()),api.agents()])}catch{error=true;data={data:[],page:1,limit:10,total:0,totalPages:0}}return <><PageHeader title="Tickets" description={`${data.total} total tickets`} action={<Link href="/create" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white">+ New Ticket</Link>}/>{error&&<div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Backend connection failed. Make sure MySQL and the Express server are running.</div>}<TicketFilters agents={agents}/><TicketTable tickets={data.data}/><Pagination page={data.page} totalPages={data.totalPages}/></>}
