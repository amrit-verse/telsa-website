import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore the photo albums of TeLSA events, moot courts, and cultural programs.",
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">
      <div className="mb-16 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Event Gallery</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A visual journey through our legal awareness campaigns, academic competitions, and community programs.
        </p>
      </div>

      {/* Featured Album */}
      <section className="mb-16">
        <div className="relative h-[400px] md:h-[500px] w-full bg-slate-200 dark:bg-slate-800 rounded-sm overflow-hidden group">
          <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <span className="inline-block px-3 py-1 bg-secondary text-primary font-bold text-xs uppercase tracking-wider mb-3 rounded-sm">Featured Album</span>
            <h2 className="font-serif text-3xl font-bold mb-2">Inaugural Assembly 2080</h2>
            <p className="text-white/80 text-sm">Pokhara, Kaski • 24 Photos</p>
          </div>
        </div>
      </section>

      {/* Album Grid Architecture */}
      <h3 className="font-serif text-2xl font-bold text-primary mb-8 border-b pb-4">All Albums</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Empty State / Curation Notice */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-sm p-12 border border-border flex flex-col items-center justify-center min-h-[300px] text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-80"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <h4 className="font-serif text-2xl font-bold text-primary mb-3">Gallery Curation in Progress</h4>
            <p className="text-muted-foreground max-w-lg leading-relaxed">
              Official imagery from recent academic workshops, moot courts, and cultural programs are currently being curated and will be uploaded shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
