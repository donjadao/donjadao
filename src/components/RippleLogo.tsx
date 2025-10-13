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

      // Load logo and ripple map
      const [logoTexture, rippleTexture] = await Promise.all([
        Assets.load('https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png'),
        Assets.load('https://upload.wikimedia.org/wikipedia/commons/5/5f/Displacement_map_example.png'), // Replace with your ripple map URL
      ]);

      // Create logo sprite
      const logo = new Sprite(logoTexture);
      logo.anchor.set(0.5);
      logo.x = app.screen.width / 2;
      logo.y = app.screen.height / 2;

      // Create ripple sprite
      const ripple = new Sprite(rippleTexture);
      ripple.anchor.set(0.5);
      ripple.x = app.screen.width / 2;
      ripple.y = app.screen.height / 2;
      ripple.scale.set(4);
      ripple.alpha = 1;

      // Create and apply displacement filter
      ripple.scale.set(3); // Make ripple map larger
      const filter = new DisplacementFilter(ripple, 1000); // Increase distortion strength
      logo.filters = [filter];


      // Add to stage
      app.stage.addChild(ripple);
      app.stage.addChild(logo);

      // Animate ripple movement with pointer
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
