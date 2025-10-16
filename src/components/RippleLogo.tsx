import { useEffect, useRef } from 'react';
import {
  Application,
  Sprite,
  Assets,
  DisplacementFilter,
  Container,
} from 'pixi.js';
import logoPath from '../assets/donsnamelogo.png';
import rippleTexturePath from '../assets/waterrippletexture.png';

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setup = async () => {
      const app = new Application();
      await app.init({
        backgroundColor: 0x2a2d45,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
      });

      if (!containerRef.current) return;
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(app.canvas);

      const resizeCanvas = () => {
        const { offsetWidth, offsetHeight } = containerRef.current!;
        app.renderer.resize(offsetWidth, offsetHeight);
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
      };

      resizeCanvas();

      const [logoTexture, rippleTexture] = await Promise.all([
        Assets.load(logoPath),
        Assets.load(rippleTexturePath),
      ]);

      const logo = new Sprite(logoTexture);
      logo.anchor.set(0.5);

      const rippleContainer = new Container();
      app.stage.addChild(rippleContainer);
      app.stage.addChild(logo);

      const filter = new DisplacementFilter({
        sprite: rippleContainer,
        scale: 100,
        padding: 300,
      });

      logo.filters = [filter];

      const positionElements = () => {
        const padding = 40;
        const scaleFactor = Math.min(
          (app.screen.width - padding) / logo.texture.width,
          (app.screen.height - padding) / logo.texture.height
        );
        logo.scale.set(scaleFactor);
        logo.x = app.screen.width / 2;
        logo.y = app.screen.height / 2;
      };

      positionElements();

      const observer = new ResizeObserver(() => {
        resizeCanvas();
        positionElements();
      });
      observer.observe(containerRef.current);

      // Ripple logic
      const ripples: Sprite[] = [];

      app.stage.eventMode = 'static';
      app.stage.hitArea = app.screen;

      app.stage.on('pointerdown', (event) => {
        const pos = event.global;
        const ripple = new Sprite(rippleTexture);
        ripple.anchor.set(0.5);
        ripple.x = pos.x;
        ripple.y = pos.y;
        ripple.scale.set(0.5);
        ripple.alpha = 1;
        rippleContainer.addChild(ripple);
        ripples.push(ripple);
      });

      app.ticker.add(() => {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const ripple = ripples[i];
          ripple.scale.x += 0.05;
          ripple.scale.y += 0.05;
          ripple.alpha -= 0.02;

          if (ripple.alpha <= 0) {
            rippleContainer.removeChild(ripple);
            ripples.splice(i, 1);
          }
        }
      });
    };

    setup();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        pointerEvents: 'auto',
        zIndex: 1,
      }}
    />
  );
}
