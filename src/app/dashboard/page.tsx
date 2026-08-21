import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-4xl mx-auto border-2 border-[var(--gray-light)] p-8 shadow-[8px_8px_0px_0px_var(--gray-dark)] bg-neutral-900">
        <h1 className="font-mono text-3xl font-bold text-[var(--accent-telemetry-orange)] mb-6 uppercase">
          &gt; SYSTEM_DASHBOARD
        </h1>
        <p className="font-mono text-[var(--foreground)] mb-8">
          Logged in as: operator@spacepoint.com
        </p>
        
        <DashboardClient />
      </div>
    </div>
  );
}
