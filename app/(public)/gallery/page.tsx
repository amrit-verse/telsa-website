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
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-6xl">
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 md:mb-6">Event Gallery</h1>
        <div className="w-16 md:w-24 h-px md:h-1 bg-secondary mx-auto mb-6 md:mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A visual journey through our legal awareness campaigns, academic competitions, and community programs.
        </p>
      </div>

      <h3 className="font-serif text-2xl font-bold text-primary mb-6 md:mb-8 border-b pb-4">TeLSA Events & Activities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventImages.map((img, index) => (
          <div key={index} className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-sm overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
            <Image
              src={`/images/events/${img}`}
              alt={`TeLSA Event Activity ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
