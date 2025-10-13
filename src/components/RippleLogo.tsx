import { useEffect, useRef } from 'react';
import {
  Application,
  Sprite,
  Assets,
  DisplacementFilter,
} from 'pixi.js';

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setup = async () => {
      const app = new Application();
      await app.init({
        width: 400,
        height: 400,
        backgroundColor: 0x1e1e2f,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(app.canvas);
      }

      const logoUrl =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png';

      const rippleMapUrl =
        'https://www.filterforge.com/filters/940-normal-seamless.html'; // Replace with your own ripple map if needed

      try {
        const [logoTexture, rippleTexture] = await Promise.all([
          Assets.load(logoUrl),
          Assets.load(rippleMapUrl),
        ]);

        const logo = new Sprite(logoTexture);
        logo.anchor.set(0.5);
        logo.x = app.screen.width / 2;
        logo.y = app.screen.height / 2;
        logo.alpha = 1;
        logo.visible = true;
        logo.tint = 0xffffff;

        const ripple = new Sprite(rippleTexture);
        ripple.anchor.set(0.5);
        ripple.x = app.screen.width / 2;
        ripple.y = app.screen.height / 2;
        ripple.scale.set(3);
        ripple.alpha = 1;

        const filter = new DisplacementFilter(ripple, 150);
        filter.padding = 100;
        logo.filters = [filter];

        app.stage.addChild(ripple);
        app.stage.addChild(logo);

        let targetX = ripple.x;
        let targetY = ripple.y;

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        app.stage.on('pointermove', (event) => {
          const pos = event.global;
          targetX = pos.x;
          targetY = pos.y;
        });

        app.ticker.add(() => {
          ripple.x += (targetX - ripple.x) * 0.1;
          ripple.y += (targetY - ripple.y) * 0.1;
          ripple.rotation += 0.01;
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
        width: '400px',
        height: '400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}
    />
  );
}
