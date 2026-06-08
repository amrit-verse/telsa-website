/* eslint-disable @typescript-eslint/no-explicit-any */
import { db as prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Search, FileText, Download, BookOpen, Clock } from "lucide-react";
import { format } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Library | TeLSA",
  description: "Explore the Terai Law Students' Association academic repository featuring research papers, legal notes, and moot court resources.",
  openGraph: {
    title: "Resource Library | TeLSA",
    description: "Access TeLSA's extensive legal research archive.",
    type: "website",
  }
};

export default async function PublicPublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const typeFilter = resolvedParams.type || "";

  const whereClause: any = {
    status: "PUBLISHED",
  };
  
  if (query) {
    whereClause.title = { contains: query, mode: "insensitive" };
  }
  if (typeFilter) {
    whereClause.type = typeFilter;
  }

  const publications = await prisma.publication.findMany({
    where: whereClause,
    orderBy: { publishedDate: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Resource Library</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          TeLSA&apos;s open academic repository. Access research papers, comprehensive notes, and legal articles authored by students and professionals.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border p-4 rounded-sm shadow-sm mb-12 flex flex-col md:flex-row gap-4">
        <form className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Search by title..." 
            className="w-full pl-10 pr-4 py-3 border border-border rounded-sm bg-background focus:outline-none focus:border-secondary" 
          />
          {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
        </form>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Link href="/publications" className={`px-4 py-3 border rounded-sm whitespace-nowrap text-sm font-bold ${!typeFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-slate-50'}`}>All Resources</Link>
          <Link href="/publications?type=RESEARCH_PAPER" className={`px-4 py-3 border rounded-sm whitespace-nowrap text-sm font-bold ${typeFilter === 'RESEARCH_PAPER' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-slate-50'}`}>Research Papers</Link>
          <Link href="/publications?type=NOTES" className={`px-4 py-3 border rounded-sm whitespace-nowrap text-sm font-bold ${typeFilter === 'NOTES' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-slate-50'}`}>Notes</Link>
          <Link href="/publications?type=LEGAL_ARTICLE" className={`px-4 py-3 border rounded-sm whitespace-nowrap text-sm font-bold ${typeFilter === 'LEGAL_ARTICLE' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-slate-50'}`}>Articles</Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publications.map(pub => (
          <div key={pub.id} className="bg-card border border-border rounded-sm shadow-sm flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md overflow-hidden group">
            {pub.coverImageUrl ? (
              <div className="relative h-48 w-full bg-slate-100 border-b border-border overflow-hidden">
                <Image src={pub.coverImageUrl} alt={pub.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ) : (
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-muted-foreground border-b border-border">
                <BookOpen className="w-12 h-12 opacity-30" />
              </div>
            )}
            
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-3">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">{pub.type.replace('_', ' ')}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2 line-clamp-2">{pub.title}</h3>
              <p className="text-sm font-medium text-slate-500 mb-4">{pub.author}</p>
              
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1">{pub.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground font-medium pt-4 border-t border-border mt-auto">
                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {format(new Date(pub.publishedDate), 'MMM yyyy')}</div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> {pub.downloadCount}</span>
                </div>
              </div>
            </div>
            
            <Link href={`/publications/${pub.slug}`} className="absolute inset-0 z-10"><span className="sr-only">View {pub.title}</span></Link>
          </div>
        ))}
      </div>

      {publications.length === 0 && (
        <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-sm border border-border shadow-sm max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-primary opacity-80" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">No Resources Found</h3>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed mb-8">
            We couldn&apos;t find any publications matching your current search criteria. Try adjusting your filters or search terms.
          </p>
          <Link href="/publications" className="inline-flex items-center justify-center h-12 px-8 bg-background border-2 border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary">
            Clear All Filters
          </Link>
        </div>
      )}
    </div>
  );
}
