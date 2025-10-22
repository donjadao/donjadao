import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Gallery } from './components/Gallery';
import { Leadership } from './components/Leadership';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2a2d45' }}>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Gallery />
        <Leadership />
        <Contact />
      </main>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p style={{ color: '#e8a5ad' }}>
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <p className="mt-2 text-white/50">
            Designed & Built with passion
          </p>
        </div>
      </footer>
    </div>
  );
}
