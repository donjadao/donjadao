import { useEffect, useRef } from 'react';
import { Application, Sprite, DisplacementFilter } from 'pixi.js';
//import logoImage from '../assets/7ce734f2c2e6165613eedbecbb47049bc56bbf5f.png';
import placeholderLogo from './logoplaceholder.png';
import rippleMap from '../assets/water-ripple-texture-blue-background.jpg';

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: Application;

    const setup = async () => {
      app = await Application.init({
        width: 400,
        height: 400,
        backgroundColor: 0x1e1e2f,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(app.canvas);
      }

      app.loader
        .add('logo', logoImage)
        .add('ripple', rippleMap)
        .load((loader, resources) => {
          // Debug: check if textures loaded
          console.log('Logo texture:', resources.logo?.texture);
          console.log('Ripple texture:', resources.ripple?.texture);

          if (!resources.logo?.texture || !resources.ripple?.texture) {
            console.error('Missing textures:', resources);
            return;
          }

          const logo = new Sprite(resources.logo.texture);
          logo.anchor.set(0.5);
          logo.x = app.screen.width / 2;
          logo.y = app.screen.height / 2;
          logo.visible = true;
          logo.alpha = 1;
          logo.tint = 0xffffff; // Ensures visibility on dark background

          const ripple = new Sprite(resources.ripple.texture);
          ripple.anchor.set(0.5);
          ripple.scale.set(1.5);
          ripple.alpha = 0.5;

          const filter = new DisplacementFilter(ripple);
          logo.filters = [filter];

          app.stage.addChild(ripple);
          app.stage.addChild(logo);

          let targetX = ripple.x;
          let targetY = ripple.y;

          app.stage.interactive = true;
          app.stage.on('pointermove', (event) => {
            const pos = event.data.global;
            targetX = pos.x;
            targetY = pos.y;
          });

          app.ticker.add(() => {
            ripple.x += (targetX - ripple.x) * 0.1;
            ripple.y += (targetY - ripple.y) * 0.1;
            ripple.rotation += 0.01;
          });
        });
    };

    setup();

    return () => {
      app?.destroy(true, true);
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
