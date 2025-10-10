import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

const artworks = [
  {
    id: 1,
    title: 'Cardboard mask',
    category: '3d Sculpture',
    image: 'https://www.behance.net/gallery/224442943/Cardboard-Dragon-Mask',
    tall: false,
  },
  {
    id: 2,
    title: 'Cheeeezzee',
    category: 'Glass Painting',
    image: 'https://www.behance.net/gallery/224442903/2pt-Perspective-Glass-Painting',
    tall: false,
  },
  {
    id: 3,
    title: 'SASE T-Shirt',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/232356293/SASE-SHIRT',
    tall: true,
  },
  {
    id: 4,
    title: 'FSA SPRING GBM',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/223930237/FSA-Event-Graphic',
    tall: true,
  },
  {
    id: 5,
    title: 'City Streets',
    category: 'Illustration',
    image: 'https://www.behance.net/gallery/224151919/Exterior-Design-Composition',
    tall: false,
  },
  {
    id: 6,
    title: 'SASE Tech Talk',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/232355923/Tech-talk-flyer',
    tall: true,
  },
  {
    id: 7,
    title: 'KSA Bake Sale',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/223931219/KSA-Event-Graphic',
    tall: false,
  },
  {
    id: 8,
    title: 'UX Club Portfolio Showcase',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/223931149/UX-Design-Club-Event-Graphic',
    tall: false,
  },
  {
    id: 9,
    title: 'UX Club Giving Day',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/223930423/UX-Design-Club-Giving-Day-Graphic',
    tall: true,
  },
  {
    id: 10,
    title: 'Join UI/UX Poster',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/223930461/UX-Design-Club-Exec-Apps-Graphic',
    tall: true,
  },
  {
    id: 11,
    title: 'UX Club Giving Day',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/223930423/UX-Design-Club-Giving-Day-Graphic',
    tall: true,
  },
  {
    id: 12,
    title: 'FSA TSHIRT',
    category: 'Graphic Design',
    image: 'https://www.behance.net/gallery/223930439/FSA-2025-Tshirt-Design',
    tall: true,
  },
];

export function Gallery() {
  const [selectedArt, setSelectedArt] = useState<typeof artworks[0] | null>(null);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Art & Graphics</h2>
          <p className="max-w-2xl mx-auto text-white/70">
            A showcase of my creative work including digital art, illustrations, and graphic design pieces.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedArt(artwork)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <ImageWithFallback
                  src={artwork.image}
                  alt={artwork.title}
                  className={`w-full ${artwork.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'} object-cover group-hover:scale-105 transition-transform duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="mb-1">{artwork.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {artwork.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedArt} onOpenChange={() => setSelectedArt(null)}>
          <DialogContent className="max-w-4xl">
            {selectedArt && (
              <div className="space-y-4">
                <ImageWithFallback
                  src={selectedArt.image}
                  alt={selectedArt.title}
                  className="w-full rounded-lg"
                />
                <div>
                  <h3 className="mb-2">{selectedArt.title}</h3>
                  <Badge>{selectedArt.category}</Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
