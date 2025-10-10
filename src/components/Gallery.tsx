import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

const artworks = [
  {
    id: 1,
    title: 'Abstract Composition',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1633743252577-ccb68cbdb6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYwMDE1NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tall: true,
  },
  {
    id: 2,
    title: 'Visual Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1606937492590-2c6e942b1951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2MDA3MTczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tall: false,
  },
  {
    id: 3,
    title: 'Creative Poster',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1678726716587-f87dac946417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydHdvcmslMjBwb3N0ZXJ8ZW58MXx8fHwxNzYwMDcwNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tall: true,
  },
  {
    id: 4,
    title: 'Digital Illustration',
    category: 'Illustration',
    image: 'https://images.unsplash.com/photo-1633743252577-ccb68cbdb6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYwMDE1NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tall: false,
  },
  {
    id: 5,
    title: 'Typography Experiment',
    category: 'Typography',
    image: 'https://images.unsplash.com/photo-1606937492590-2c6e942b1951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2MDA3MTczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tall: false,
  },
  {
    id: 6,
    title: 'Modern Art Piece',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1678726716587-f87dac946417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydHdvcmslMjBwb3N0ZXJ8ZW58MXx8fHwxNzYwMDcwNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
