"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [{href:"/",label:"Dashboard",icon:"▦"},{href:"/tickets",label:"Tickets",icon:"◫"},{href:"/create",label:"Create Ticket",icon:"＋"},{href:"/agents",label:"Agents",icon:"♙"}];
export function Sidebar(){ const path=usePathname(); return <aside className="w-full shrink-0 border-b border-slate-200 bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r"><div className="flex items-center justify-between px-5 py-5"><Link href="/" className="text-xl font-bold text-indigo-600">SupportDesk</Link><span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">ADMIN</span></div><nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1">{links.map(l=><Link key={l.href} href={l.href} className={`flex min-w-max items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${path===l.href|| (l.href==="/tickets"&&path.startsWith("/tickets/"))?"bg-indigo-50 text-indigo-700":"text-slate-600 hover:bg-slate-50"}`}><span className="w-5 text-center">{l.icon}</span>{l.label}</Link>)}</nav></aside> }
