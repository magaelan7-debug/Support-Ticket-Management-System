import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = { title: "SupportDesk", description: "Support Ticket Management System" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="min-h-screen lg:flex"><Sidebar/><main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main></div></body></html>;
}
