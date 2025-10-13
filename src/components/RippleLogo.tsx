import { useEffect, useRef } from 'react';
import { Application, Sprite, Assets } from 'pixi.js';

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

      const imageUrl =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png';

      try {
        const texture = await Assets.load(imageUrl);
        const logo = new Sprite(texture);

        console.log('Loaded texture:', texture);
        console.log('Logo dimensions:', logo.width, logo.height);

        logo.anchor.set(0.5);
        logo.x = app.screen.width / 2;
        logo.y = app.screen.height / 2;
        logo.alpha = 1;
        logo.visible = true;
        logo.tint = 0xffffff;

        app.stage.addChild(logo);
        app.renderer.render(app.stage);
      } catch (err) {
        console.error('Failed to load image:', err);
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
