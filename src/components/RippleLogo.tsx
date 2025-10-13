import { useEffect, useRef } from 'react';
import {
  Application,
  Sprite,
  Assets,
  DisplacementFilter,
} from 'pixi.js';
import logoPath from '../assets/7ce734f2c2e6165613eedbecbb47049bc56bbf5f.png'; // ✅ Your logo

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
const observer = new ResizeObserver(() => {
  const newWidth = container?.clientWidth || 900;
  const newHeight = container?.clientHeight || 600;
  app.renderer.resize(newWidth, newHeight);

  logo.x = newWidth / 2;
  logo.y = newHeight / 2;
  ripple.x = newWidth / 2;
  ripple.y = newHeight / 2;

  const scaleFactor = Math.min(
    newWidth / logo.texture.width,
    newHeight / logo.texture.height
  ) * 0.6;
  logo.scale.set(scaleFactor);
});

observer.observe(container);


      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(app.canvas);
      }

      const rippleMapUrl = 'https://i.imgur.com/2yYayZk.png'; // ✅ Verified ripple map

      try {
        const [logoTexture, rippleTexture] = await Promise.all([
          Assets.load(logoPath),
          Assets.load(rippleMapUrl),
        ]);

        const logo = new Sprite(logoTexture);
        logo.anchor.set(0.5);
        logo.x = app.screen.width / 2;
        logo.y = app.screen.height / 2;

        // ✅ Dynamically scale logo to fit within 900×600
        const maxWidth = 900;
        const maxHeight = 600;
        const scaleFactor = Math.min(
          (maxWidth - 40) / logo.width,
          (maxHeight - 40) / logo.height
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
          logo.filters = [filter]; // ✅ Apply ripple
        });

        app.stage.on('pointerout', () => {
          isHovering = false;
          logo.filters = []; // ✅ Remove ripple
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
      style={{
        width: '900px',
        height: '600px',
        margin: '10 auto',
        position: 'relative',
        zIndex: 1,
      }}
    />
  );
}
