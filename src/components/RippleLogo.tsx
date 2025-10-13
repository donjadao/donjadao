import { useEffect, useRef } from 'react';
import { Application, Sprite } from 'pixi.js';
import placeholderLogo from './logoplaceholder.png';

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();
    app.init({
      width: 400,
      height: 400,
      backgroundColor: 0x1e1e2f,
    }).then(() => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(app.canvas);
      }

      const logo = Sprite.from(placeholderLogo);
      logo.anchor.set(0.5);
      logo.x = app.screen.width / 2;
      logo.y = app.screen.height / 2;
      logo.alpha = 1;
      logo.visible = true;

      app.stage.addChild(logo);
    });

    return () => {
      app.destroy(true, true);
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
