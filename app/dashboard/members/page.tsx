/* eslint-disable @typescript-eslint/no-explicit-any */
import { db as prisma } from "@/lib/db";
import Link from "next/link";
import { Search, Filter, UserCheck, Clock, XCircle, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default async function MembersTablePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const statusFilter = resolvedParams.status || "ALL";
  const currentPage = Number(resolvedParams.page) || 1;
  const TAKE = 20;
  const SKIP = (currentPage - 1) * TAKE;

  // Global filters
  const whereClause = {
    ...(statusFilter !== "ALL" && { status: statusFilter as any }),
    user: {
      OR: [
        { name: { contains: query, mode: "insensitive" as const } },
        { email: { contains: query, mode: "insensitive" as const } },
      ]
    }
  };

  // Perform highly efficient paginated query + count
  const [memberships, totalCount, allStatusCounts] = await Promise.all([
    prisma.membership.findMany({
      where: whereClause,
      include: { user: true },
      orderBy: { appliedAt: "desc" },
      take: TAKE,
      skip: SKIP
    }),
    prisma.membership.count({ where: whereClause }),
    prisma.membership.groupBy({
      by: ['status'],
      _count: { status: true }
    })
  ]);

  const totalPages = Math.ceil(totalCount / TAKE);

  // Extract stat blocks safely
  const getCount = (s: string) => allStatusCounts.find(x => x.status === s)?._count.status || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Membership Applications</h1>
          <p className="text-muted-foreground text-sm">Review, approve, and manage TeLSA members securely.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border p-4 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
          </div>
          <p className="text-2xl font-bold">{getCount("PENDING")}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <UserCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Active</span>
          </div>
          <p className="text-2xl font-bold">{getCount("ACTIVE")}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 text-destructive mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Rejected</span>
          </div>
          <p className="text-2xl font-bold">{getCount("REJECTED")}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Expired</span>
          </div>
          <p className="text-2xl font-bold">{getCount("EXPIRED")}</p>
        </div>
      </div>

      {/* Table Controls (Static visual representation for now) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-card p-4 border border-border rounded-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            defaultValue={query}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-secondary" 
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-border rounded-sm text-sm bg-background focus:outline-none focus:border-secondary" defaultValue={statusFilter}>
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <button className="px-4 py-2 border border-border rounded-sm text-sm flex items-center gap-2 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold text-primary">Applicant Name</th>
                <th className="px-6 py-4 font-bold text-primary">Contact</th>
                <th className="px-6 py-4 font-bold text-primary">Type</th>
                <th className="px-6 py-4 font-bold text-primary">Status</th>
                <th className="px-6 py-4 font-bold text-primary">Applied Date</th>
                <th className="px-6 py-4 font-bold text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {memberships.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                        <UserCheck className="w-8 h-8 text-primary opacity-70" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary mb-2">No Applications Found</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        There are currently no membership applications matching the active filters or search queries.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                memberships.map((membership) => (
                  <tr key={membership.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">{membership.user.name}</div>
                      <div className="text-xs text-muted-foreground">{membership.user.college}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{membership.user.email}</div>
                      <div className="text-xs text-muted-foreground">{membership.user.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-sm border border-border">
                        {membership.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border
                        ${membership.status === 'ACTIVE' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                        ${membership.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                        ${membership.status === 'REJECTED' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                        ${membership.status === 'EXPIRED' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                      `}>
                        {membership.status === 'ACTIVE' ? 'Approved Membership' : membership.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(membership.appliedAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/dashboard/members/${membership.id}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 border border-primary/20 text-primary hover:bg-primary/5 rounded-sm text-xs font-bold transition-colors"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-slate-50 dark:bg-slate-900">
            <span className="text-sm text-muted-foreground">
              Showing {SKIP + 1} to {Math.min(SKIP + TAKE, totalCount)} of {totalCount} entries
            </span>
            <div className="flex gap-2">
              <Link 
                href={`/dashboard/members?page=${Math.max(currentPage - 1, 1)}&q=${query}&status=${statusFilter}`}
                className={`px-3 py-1.5 border border-border rounded-sm text-sm flex items-center ${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-background'}`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Link>
              <Link 
                href={`/dashboard/members?page=${Math.min(currentPage + 1, totalPages)}&q=${query}&status=${statusFilter}`}
                className={`px-3 py-1.5 border border-border rounded-sm text-sm flex items-center ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-background'}`}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
