import { useEffect, useRef } from 'react';
import {
  Application,
  Sprite,
  Assets,
  DisplacementFilter,
} from 'pixi.js';
import logoPath from '../assets/7ce734f2c2e6165613eedbecbb47049bc56bbf5f.png';

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setup = async () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const app = new Application();
      await app.init({
        width,
        height,
        backgroundColor: 0x2a2d45,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
      });

      container.innerHTML = '';
      container.appendChild(app.canvas);

      const rippleMapUrl = 'https://i.imgur.com/2yYayZk.png';

      try {
        const [logoTexture, rippleTexture] = await Promise.all([
          Assets.load(logoPath),
          Assets.load(rippleMapUrl),
        ]);

        const logo = new Sprite(logoTexture);
        logo.anchor.set(0.5);
        logo.x = app.screen.width / 2;
        logo.y = app.screen.height / 2;

        // Scale logo to fit container
        const scaleFactor = Math.min(
          (width - 40) / logo.width,
          (height - 40) / logo.height
        );
        logo.scale.set(scaleFactor);

        const ripple = new Sprite(rippleTexture);
        ripple.anchor.set(0.5);
        ripple.x = app.screen.width / 2;
        ripple.y = app.screen.height / 2;
        ripple.scale.set(3);
        ripple.visible = false;

        const filter = new DisplacementFilter(ripple, 300);
        filter.padding = 100;

        app.stage.addChild(ripple);
        app.stage.addChild(logo);

        let targetX = ripple.x;
        let targetY = ripple.y;
        let isHovering = false;

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;

        app.stage.on('pointerover', () => {
          isHovering = true;
          logo.filters = [filter];
        });

        app.stage.on('pointerout', () => {
          isHovering = false;
          logo.filters = [];
        });

        app.stage.on('pointermove', (event) => {
          if (isHovering) {
            const pos = event.global;
            targetX = pos.x;
            targetY = pos.y;
          }
        });

        app.ticker.add(() => {
          const ease = 0.1;
          const target = isHovering
            ? { x: targetX, y: targetY }
            : { x: app.screen.width / 2, y: app.screen.height / 2 };

          ripple.x += (target.x - ripple.x) * ease;
          ripple.y += (target.y - ripple.y) * ease;

          if (isHovering) {
            ripple.rotation += 0.01;
          }
        });

        // ResizeObserver for dynamic responsiveness
        const observer = new ResizeObserver(() => {
          const newWidth = container.offsetWidth;
          const newHeight = container.offsetHeight;
          app.renderer.resize(newWidth, newHeight);
          logo.x = newWidth / 2;
          logo.y = newHeight / 2;
          ripple.x = newWidth / 2;
          ripple.y = newHeight / 2;
        });

        observer.observe(container);
      } catch (err) {
        console.error('Failed to load assets:', err);
      }
    };

    setup();

    return () => {
      // Optional cleanup
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] aspect-[3/2] mx-auto relative z-10"
    />
  );
}
