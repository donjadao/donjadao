import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import logoImage from 'figma:asset/7ce734f2c2e6165613eedbecbb47049bc56bbf5f.png';

export function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 300,
      height: 300,
      transparent: true,
      antialias: true,
    });

    if (containerRef.current) {
      containerRef.current.appendChild(app.view);
    }

    const logo = PIXI.Sprite.from(logoImage);
    logo.anchor.set(0.5);
    logo.x = app.screen.width / 2;
    logo.y = app.screen.height / 2;

    const displacementSprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/displacement_map_repeat.jpg');
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    displacementSprite.scale.set(2);
    app.stage.addChild(displacementSprite);

    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    logo.filters = [displacementFilter];

    app.stage.addChild(logo);

    app.stage.interactive = true;
    app.stage.on('pointermove', (event) => {
      displacementSprite.x = event.data.global.x - displacementSprite.width / 2;
      displacementSprite.y = event.data.global.y - displacementSprite.height / 2;
    });

    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  return <div ref={containerRef} className="mx-auto w-[300px] h-[300px]" />;
}
