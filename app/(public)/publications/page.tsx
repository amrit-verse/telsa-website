import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications & Resources",
  description: "Access the official legal resource library of TeLSA, featuring research papers, notes, and Moot Court materials.",
};

export default function PublicationsPage() {
  const categories = ["Notes", "Research Papers", "Legal Articles", "Moot Court Resources"];

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Publications & Library</h1>
        <div className="w-24 h-1 bg-secondary mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A centralized, professional legal repository for Terai law students. Access academic notes, published articles, and essential moot court preparation materials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
            <h3 className="font-bold text-primary uppercase tracking-wider mb-4 text-sm">Resource Categories</h3>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left px-3 py-2 text-sm font-medium bg-primary/5 text-primary rounded-sm border-l-2 border-secondary">
                  All Resources
                </button>
              </li>
              {categories.map((cat, i) => (
                <li key={i}>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-slate-50 rounded-sm transition-colors">
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-bold text-primary uppercase tracking-wider mb-4 text-sm">Access Level</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-border text-secondary focus:ring-secondary" checked readOnly />
                  Public Resources
                </label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer opacity-70">
                  <input type="checkbox" className="rounded border-border" disabled />
                  Members Only
                  <span className="ml-auto text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-sm">PRO</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content List */}
        <main className="lg:col-span-3">
          {/* Search Bar UI */}
          <div className="mb-8 flex gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input type="text" placeholder="Search publications by title or author..." className="w-full pl-10 pr-4 py-2 border border-border rounded-sm bg-card text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
            </div>
            <button className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:bg-primary/90">Search</button>
          </div>

          {/* Placeholder List */}
          <div className="space-y-4">
            <div className="p-8 text-center bg-card border border-dashed border-border rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-muted-foreground opacity-50"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              <h3 className="font-serif text-xl text-primary font-bold mb-2">No Publications Yet</h3>
              <p className="text-muted-foreground text-sm">The digital library is currently being compiled. Check back soon for research papers and moot court resources.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
