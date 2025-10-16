//ripplelogov1

import { useEffect, useRef } from 'react';
import {
  Application,
  Sprite,
  Assets,
  DisplacementFilter,
} from 'pixi.js';
import logoPath from '../assets/donsnamelogo2.png';
import rippleTexturePath from '../assets/watertexture2.png';

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

      const ripple = new Sprite(rippleTexture);
      ripple.anchor.set(0.5);
      ripple.scale.set(1.5); // Reduced scale to prevent cutoff
      ripple.visible = false;

      const filter = new DisplacementFilter({
        sprite: ripple,
        scale: 300,
        padding: 300, // Increased padding
      });

      app.stage.addChild(ripple);
      app.stage.addChild(logo);

      const positionElements = () => {
        const padding = 40;
        const scaleFactor = Math.min(
          (app.screen.width - padding) / logo.texture.width,
          (app.screen.height - padding) / logo.texture.height
        );
        logo.scale.set(scaleFactor);
        logo.x = app.screen.width / 2;
        logo.y = app.screen.height / 2;
        ripple.x = app.screen.width / 2;
        ripple.y = app.screen.height / 2;
      };

      positionElements();

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

      const observer = new ResizeObserver(() => {
        resizeCanvas();
        positionElements();
      });

      observer.observe(containerRef.current);
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
        height: '80vh',
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
