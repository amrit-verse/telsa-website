import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore the photo albums of TeLSA events, moot courts, and cultural programs.",
};

const eventImages = [
  "IMG-20260608-WA0028.jpg",
  "IMG-20260608-WA0040.jpg",
  "IMG-20260608-WA0046.jpg",
  "IMG-20260609-WA0005.jpg",
  "IMG-20260609-WA0006.jpg",
  "IMG-20260609-WA0007.jpg",
  "IMG-20260609-WA0008.jpg",
  "IMG-20260609-WA0009.jpg",
  "IMG-20260609-WA0010.jpg",
  "IMG-20260609-WA0011.jpg",
  "IMG-20260609-WA0012.jpg",
  "IMG-20260609-WA0013.jpg",
  "IMG-20260609-WA0014.jpg",
  "IMG-20260609-WA0015.jpg",
  "IMG-20260609-WA0016.jpg",
  "IMG-20260609-WA0017.jpg",
  "IMG-20260609-WA0018.jpg",
  "IMG-20260609-WA0019.jpg",
  "IMG-20260609-WA0020.jpg",
  "IMG-20260609-WA0021.jpg",
  "IMG-20260609-WA0022.jpg",
  "IMG-20260609-WA0023.jpg"
];

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

      <h3 className="font-serif text-2xl font-bold text-primary mb-8 border-b pb-4">TeLSA Events & Activities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventImages.map((img, index) => (
          <div key={index} className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-sm overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
            <Image
              src={`/images/events/${img}`}
              alt={`TeLSA Event Activity ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
