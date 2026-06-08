import { db as prisma } from "@/lib/db";
import Link from "next/link";
import { Search, Plus, Eye, Download, Edit } from "lucide-react";
import { format } from "date-fns";

export default async function AdminPublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const TAKE = 20;
  const SKIP = (currentPage - 1) * TAKE;

  const whereClause = {
    title: { contains: query, mode: "insensitive" as const }
  };

  const [publications, totalCount] = await Promise.all([
    prisma.publication.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: TAKE,
      skip: SKIP
    }),
    prisma.publication.count({ where: whereClause })
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Library Management</h1>
          <p className="text-muted-foreground text-sm">Upload and manage academic resources and legal publications.</p>
        </div>
        <Link 
          href="/dashboard/publications/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Upload Resource
        </Link>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search publications..." 
              defaultValue={query}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-secondary bg-background" 
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold text-primary">Resource Title</th>
                <th className="px-6 py-4 font-bold text-primary">Status</th>
                <th className="px-6 py-4 font-bold text-primary">Published Date</th>
                <th className="px-6 py-4 font-bold text-primary text-right">Analytics</th>
                <th className="px-6 py-4 font-bold text-primary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {publications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No publications found.
                  </td>
                </tr>
              ) : (
                publications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary truncate max-w-xs">{pub.title}</div>
                      <div className="text-xs text-secondary tracking-wider font-bold">{pub.type.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wider
                        ${pub.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                        ${pub.status === 'DRAFT' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                        ${pub.status === 'ARCHIVED' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                      `}>
                        {pub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(pub.publishedDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-muted-foreground">
                        <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {pub.viewCount}</span>
                        <span className="flex items-center gap-1 text-secondary"><Download className="w-4 h-4" /> {pub.downloadCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/publications/${pub.id}/edit`} className="inline-flex p-1.5 text-muted-foreground hover:text-primary border border-transparent hover:border-primary/20 rounded transition-colors" title="Edit Resource">
                        <Edit className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
