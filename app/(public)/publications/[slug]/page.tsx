import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ChevronLeft, Download, FileText, User, Calendar, Eye, Tags } from "lucide-react";
import { format } from "date-fns";
import DownloadTracker from "@/components/publications/download-tracker"; // We will create this client component

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const pub = await prisma.publication.findUnique({ where: { slug: resolvedParams.slug, status: "PUBLISHED" } });
  
  if (!pub) return { title: "Not Found" };

  return {
    title: `${pub.title} | TeLSA Library`,
    description: pub.summary,
    authors: [{ name: pub.author }],
    openGraph: {
      title: pub.title,
      description: pub.summary,
      type: "article",
      publishedTime: pub.publishedDate.toISOString(),
      authors: [pub.author],
      images: pub.coverImageUrl ? [pub.coverImageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pub.title,
      description: pub.summary,
      images: pub.coverImageUrl ? [pub.coverImageUrl] : [],
    }
  };
}

export default async function PublicationDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const pub = await prisma.publication.findUnique({
    where: { slug: resolvedParams.slug, status: "PUBLISHED" }
  });

  if (!pub) return notFound();

  // JSON-LD Structured Data for Google Scholar / SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": pub.title,
    "author": {
      "@type": "Person",
      "name": pub.author
    },
    "abstract": pub.summary,
    "datePublished": pub.publishedDate.toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Terai Law Students' Association (TeLSA)"
    },
    "url": `https://telsa.org.np/publications/${pub.slug}`,
    "keywords": pub.tags.join(", ")
  };

  return (
    <div className="pb-24">
      {/* Inject Structured Data */}
      <Script
        id={`json-ld-pub-${pub.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 dark:bg-slate-900 border-b border-border py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/publications" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Library
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {pub.coverImageUrl && (
              <div className="w-full md:w-1/3 shrink-0 rounded-sm overflow-hidden border border-border shadow-md">
                <Image src={pub.coverImageUrl} alt={pub.title} width={400} height={560} className="w-full h-auto object-cover" priority />
              </div>
            )}
            
            <div className="flex-1 space-y-6">
              <div>
                <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 text-xs font-bold uppercase tracking-wider rounded-sm inline-block mb-4">
                  {pub.type.replace('_', ' ')}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary leading-tight">
                  {pub.title}
                </h1>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium border-y border-border py-4">
                <div className="flex items-center gap-2"><User className="w-4 h-4" /> {pub.author}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {format(new Date(pub.publishedDate), 'MMMM dd, yyyy')}</div>
                <div className="flex items-center gap-2"><Eye className="w-4 h-4" /> {pub.viewCount} Views</div>
              </div>

              <div className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {pub.summary}
              </div>

              <DownloadTracker 
                publicationId={pub.id} 
                fileUrl={pub.fileUrl} 
                title={pub.title} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6 border-b pb-2">Abstract & Details</h2>
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
              {pub.content}
            </div>
          </div>

          <div className="space-y-8">
            {pub.tags.length > 0 && (
              <div className="bg-card border border-border rounded-sm shadow-sm p-6">
                <h3 className="font-bold text-primary flex items-center gap-2 mb-4"><Tags className="w-4 h-4" /> Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {pub.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium rounded-sm border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
