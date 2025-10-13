// RippleLogo.tsx
import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import logo from 'figma:asset/7ce734f2c2e6165613eedbecbb47049bc56bbf5f.png';
import rippleMap from '../assets/water-ripple-texture-blue-background.jpg';

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 300,
      height: 300,
      transparent: true,
    });

    containerRef.current?.appendChild(app.view);

    app.loader
      .add('logo', logoImage)
      .add('ripple', rippleMap)
      .load((loader, resources) => {
        const logo = new PIXI.Sprite(resources.logo.texture);
        logo.anchor.set(0.5);
        logo.x = app.screen.width / 2;
        logo.y = app.screen.height / 2;

        const ripple = new PIXI.Sprite(resources.ripple.texture);
        const filter = new PIXI.filters.DisplacementFilter(ripple);
        ripple.anchor.set(0.5);
        ripple.scale.set(2);
        ripple.alpha = 0.5;

        app.stage.addChild(ripple);
        app.stage.addChild(logo);
        logo.filters = [filter];

        let targetX = logo.x;
        let targetY = logo.y;

        app.stage.interactive = true;
        app.stage.on('pointermove', (e) => {
          const pos = e.data.global;
          targetX = pos.x;
          targetY = pos.y;
        });

        app.ticker.add(() => {
          ripple.x += (targetX - ripple.x) * 0.1;
          ripple.y += (targetY - ripple.y) * 0.1;
          ripple.rotation += 0.01;
        });
      });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div ref={containerRef} className="h-48 w-auto mx-auto" />;
}
