import { useEffect, useRef } from 'react';
import {
  Application,
  Sprite,
  Assets,
  DisplacementFilter,
} from 'pixi.js';
import logoPath from '../assets/7ce734f2c2e6165613eedbecbb47049bc56bbf5f.png';

export default function RippleLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    const setup = async () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth || 300;
      const height = container.offsetHeight || 300;

      const app = new Application();
      await app.init({
        width,
        height,
        backgroundColor: 0x2a2d45,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
      });

      appRef.current = app;
      container.innerHTML = '';
      container.appendChild(app.canvas);

      const rippleMapUrl = 'https://i.imgur.com/2yYayZk.png';

      try {
        const [logoTexture, rippleTexture] = await Promise.all([
          Assets.load(logoPath),
          Assets.load(rippleMapUrl),
        ]);

        const logo = new Sprite(logoTexture);
        logo.anchor.set(0.5);
        logo.x = width / 2;
        logo.y = height / 2;

        const scaleFactor = Math.min(
          (width - 40) / logo.width,
          (height - 40) / logo.height
        );
        logo.scale.set(scaleFactor);

        const ripple = new Sprite(rippleTexture);
        ripple.anchor.set(0.5);
        ripple.x = width / 2;
        ripple.y = height / 2;
        ripple.scale.set(3);
        ripple.visible = false;

        const filter = new DisplacementFilter(ripple, 300);
        filter.padding = 100;

        app.stage.addChild(ripple);
        app.stage.addChild(logo);

        let targetX = ripple.x;
        let targetY = ripple.y;
        let isHovering = false;

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;

        app.stage.on('pointerover
