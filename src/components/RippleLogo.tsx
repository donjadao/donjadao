const ripple = new Sprite(rippleTexture);
ripple.anchor.set(0.5);
ripple.x = width / 2;
ripple.y = height / 2;
ripple.scale.set(3);
ripple.visible = false;
rippleRef.current = ripple;

app.stage.addChild(ripple);

// Dynamically load ripple effect logic
const { setupRipple } = await import('./rippleEffect');
setupRipple(ripple, logo, app);
