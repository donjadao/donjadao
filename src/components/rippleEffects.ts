import { DisplacementFilter, Sprite } from 'pixi.js';

export function setupRipple(ripple: Sprite, logo: Sprite, app: any) {
  const filter = new DisplacementFilter(ripple, 300);
  filter.padding = 100;
  logo.filters = [filter];

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
}
