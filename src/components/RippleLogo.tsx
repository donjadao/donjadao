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
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    const setup = async () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth || 300;
      const height = container.offsetHeight || 300;

      const app = new Application();
      await app.init({
        width,
        height,
        backgroundColor: 0x2a2d45,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
      });

      appRef.current = app;
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
        logo.x = width / 2;
        logo.y = height / 2;

        const scaleFactor = Math.min(
          width / logo.width,
          height / logo.height
        ) * 0.6; // Adjust multiplier for fill
        logo.scale.set(scaleFactor);

        const ripple = new Sprite(rippleTexture);
        ripple.anchor.set(0.5);
        ripple.x = width / 2;
        ripple.y = height / 2;
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
            : { x: width / 2, y: height / 2 };

          ripple.x += (target.x - ripple.x) * ease;
          ripple.y += (target.y - ripple.y) * ease;

          if (isHovering) {
            ripple.rotation += 0.01;
          }
        });

        // ResizeObserver for responsiveness
        const observer = new ResizeObserver(() => {
          const newWidth = container.offsetWidth || 300;
          const newHeight = container.offsetHeight || 300;
          app.renderer.resize(newWidth, newHeight);

          logo.x = newWidth / 2;
          logo.y = newHeight / 2;
          ripple.x = newWidth / 2;
          ripple.y = newHeight / 2;

          const newScale = Math.min(
            newWidth / logo.width,
            newHeight / logo.height
          ) * 0.6;
          logo.scale.set(newScale);
        });

        observer.observe(container);
      } catch (err) {
        console.error('Failed to load assets:', err);
      }
    };

    setup();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] mx-auto relative z-10"
    />
  );
}
