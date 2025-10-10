import { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import fsaSpringGbm from '../assets/fsa spring gbm.jpg';
import dragonMask from '../assets/Dragon mask.jpg';
import FSAshirt from '../assets/portfolio pics/FSAshirt.png';
import Figmafiesta from '../assets/portfolio pics/Figmafiesta.png';
import NATCON from '../assets/portfolio pics/NATCON.png';
import SaseTechTalk from '../assets/portfolio pics/SaseTechTalk.png';
import UXGivingDay from '../assets/portfolio pics/UXGivingDay.png';
import UXRecruiting from '../assets/portfolio pics/UXRecruiting.png';
import UXSpeaker from '../assets/portfolio pics/UXSpeaker.png';
import glasscheese from '../assets/portfolio pics/glasscheese.jpeg';
import ksabakesale from '../assets/portfolio pics/ksabakesale.png';
import markerpainting from '../assets/portfolio pics/markerpainting.jpeg';
import saseshirt from '../assets/portfolio pics/saseshirt.png';
import ux_portfolio_showcase from '../assets/portfolio pics/ux_portfolio_showcase.png';
import meetux2023 from '../assets/portfolio pics/meetUX2023.jpg';


const artworks = [
  {
    id: 1,
    title: 'Cardboard mask',
    category: '3d Sculpture',
    image: dragonMask,
    tall: false,
  },
  {
    id: 2,
    title: 'Cheeeezzee',
    category: 'Glass Painting',
    image: glasscheese,
    tall: true,
  },
  {
    id: 3,
    title: 'SASE T-Shirt',
    category: 'Graphic Design',
    image: saseshirt,
    tall: false,
  },
  {
    id: 4,
    title: 'FSA SPRING GBM',
    category: 'Graphic Design',
    image: fsaSpringGbm,
    tall: true,
  },
  {
    id: 5,
    title: 'City Streets',
    category: 'Illustration',
    image: markerpainting,
    tall: true,
  },
  {
    id: 6,
    title: 'SASE Tech Talk',
    category: 'Graphic Design',
    image: SaseTechTalk,
    tall: true,
  },
  {
    id: 7,
    title: 'KSA Bake Sale',
    category: 'Graphic Design',
    image: ksabakesale,
    tall: false,
  },
  {
    id: 8,
    title: 'UX Club Portfolio Showcase',
    category: 'Graphic Design',
    image: ux_portfolio_showcase,
    tall: false,
  },
  {
    id: 9,
    title: 'UX Club Giving Day',
    category: 'Graphic Design',
    image: UXGivingDay,
    tall: true,
  },
  {
    id: 10,
    title: 'Join UI/UX Poster',
    category: 'Graphic Design',
    image: UXRecruiting,
    tall: false,
  },
  {
    id: 11,
    title: 'UX Figma Workshop',
    category: 'Graphic Design',
    image: Figmafiesta,
    tall: false,
  },
  {
    id: 12,
    title: 'FSA TSHIRT',
    category: 'Graphic Design',
    image: FSAshirt,
    tall: true,
  },
  {
    id: 12,
    title: 'UX CS Speaker',
    category: 'Graphic Design',
    image: UXSpeaker,
    tall: false,
  },
  {
    id: 12,
    title: 'Meet the UX Exec',
    category: 'Graphic Design',
    image: meetux2023,
    tall: false,
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
