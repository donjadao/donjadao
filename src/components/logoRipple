
// src/lib/logoRipple.js
export default function initLogoRipple(
  selector = '#site-logo',
  userOptions = {}
) {
  const defaults = {
    amplitude: 0.015,   // Displacement magnitude (UV units)
    wavelength: 0.18,   // Wave length in UV (0..1). Smaller = tighter ripples.
    speed: 0.35,        // Wavefront travel speed
    falloff: 8.0,       // Spatial decay (higher = fade quicker with distance)
    decay: 1.8,         // Temporal decay (higher = fade quicker over time)
    maxSplats: 16,      // How many recent ripple sources to keep
    dragOnly: true,     // Only create ripples while pointer is down
    strength: 1.0,      // Strength of each "splat"
    backgroundColor: '#00000000', // Transparent canvas
  };
  const opts = { ...defaults, ...userOptions };

  const img = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!img) return console.warn('[logoRipple] No element found for', selector);

  // Respect reduced motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return; // Leave static logo
  }

  // Ensure image is loaded (needed to build texture)
  if (!img.complete) {
    img.addEventListener('load', () => initLogoRipple(img, opts));
    return;
  }

  // Create container + canvas (progressive enhancement)
  const wrapper = document.createElement('div');
  wrapper.className = 'logo-ripple-wrap';
  wrapper.style.position = 'relative';
  wrapper.style.display = 'inline-block';
  wrapper.style.lineHeight = '0';

  // Insert wrapper before img, then move img inside
  img.parentNode.insertBefore(wrapper, img);
  wrapper.appendChild(img);

  // Canvas on top
  const canvas = document.createElement('canvas');
  canvas.className = 'logo-ripple-canvas';
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.background = opts.backgroundColor;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', img.getAttribute('alt') || 'Logo');

  // Keep the <img> for SEO, but hide from screen readers/visuals
  img.setAttribute('aria-hidden', 'true');
  img.style.visibility = 'hidden';

  wrapper.appendChild(canvas);

  // Resize handling
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // Cap DPR for perf
  function resizeCanvas() {
    const rect = wrapper.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // ---- WebGL setup ----
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) {
    console.warn('[logoRipple] WebGL not supported; leaving static logo.');
    canvas.remove(); // fallback to the static <img>
    img.style.visibility = '';
    img.removeAttribute('aria-hidden');
    return;
  }

  // Compile helpers
  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }
  function link(vsSrc, fsSrc) {
    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }
    return prog;
  }

  const MAX_SPLATS = Math.min(32, Math.max(1, opts.maxSplats|0));

  const vertexSrc = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSrc = `
    precision highp float;

    varying vec2 v_uv;
    uniform sampler2D u_tex;
    uniform float u_time;

    const int MAX_SPLATS = ${MAX_SPLATS};
    uniform int u_count;
    uniform vec2 u_centers[MAX_SPLATS];
    uniform float u_birth[MAX_SPLATS];
    uniform float u_strengths[MAX_SPLATS];

    uniform float u_amplitude;
    uniform float u_wavelength;
    uniform float u_speed;
    uniform float u_falloff;
    uniform float u_decay;

    // 2π constant
    const float TAU = 6.28318530718;

    void main() {
      vec2 uv = v_uv;
      vec2 totalOffset = vec2(0.0);

      // Convert wavelength to frequency in UV space
      float frequency = 1.0 / max(1e-4, u_wavelength);

      for (int i = 0; i < MAX_SPLATS; i++) {
        if (i >= u_count) { break; }
        vec2 c = u_centers[i];
        float age = u_time - u_birth[i];
        if (age < 0.0) { continue; }

        float s = u_strengths[i];

        vec2 d = uv - c;
        float r = length(d) + 1e-6;     // avoid div by zero
        vec2 dir = d / r;

        // Traveling circular wave
        float phase = (r - u_speed * age) * frequency * TAU;
        float wave = sin(phase);

        // Spatial + temporal envelope
        float spatial = exp(-r * u_falloff);
        float temporal = exp(-age * u_decay);

        float disp = s * wave * spatial * temporal;
        totalOffset += dir * disp * u_amplitude;
      }

      vec2 uv2 = clamp(uv + totalOffset, 0.0, 1.0);
      vec4 color = texture2D(u_tex, uv2);

      gl_FragColor = color;
    }
  `;

  const program = link(vertexSrc, fragmentSrc);
  if (!program) return;

  const a_position = gl.getAttribLocation(program, 'a_position');
  const u_tex = gl.getUniformLocation(program, 'u_tex');
  const u_time = gl.getUniformLocation(program, 'u_time');
  const u_count = gl.getUniformLocation(program, 'u_count');

  const u_centers = gl.getUniformLocation(program, 'u_centers');
  const u_birth = gl.getUniformLocation(program, 'u_birth');
  const u_strengths = gl.getUniformLocation(program, 'u_strengths');

  const u_amplitude = gl.getUniformLocation(program, 'u_amplitude');
  const u_wavelength = gl.getUniformLocation(program, 'u_wavelength');
  const u_speed = gl.getUniformLocation(program, 'u_speed');
  const u_falloff = gl.getUniformLocation(program, 'u_falloff');
  const u_decay = gl.getUniformLocation(program, 'u_decay');

  // Fullscreen quad
  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1,  1, -1,  -1, 1,
       1, -1,  1,  1,  -1, 1
    ]),
    gl.STATIC_DRAW
  );

  // Build texture from <img>
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  // Allow cross-origin if served with CORS (optional)
  // (If your logo loads from same origin, this is fine.)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

  // Maintain correct aspect by sizing canvas to the displayed image size
  const ro = new ResizeObserver(() => resizeCanvas());
  ro.observe(wrapper);
  resizeCanvas();

  // Ripple state: circular buffer of splats
  const centers = new Float32Array(MAX_SPLATS * 2);
  const birth = new Float32Array(MAX_SPLATS);
  const strengths = new Float32Array(MAX_SPLATS);
  let splatCount = 0; // actual active count
  let splatIndex = 0; // circular index

  function now() {
    return performance.now() * 0.001;
  }

  function addSplat(clientX, clientY, s = opts.strength) {
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    const i = splatIndex % MAX_SPLATS;
    centers[i * 2 + 0] = x;
    centers[i * 2 + 1] = y;
    birth[i] = now();
    strengths[i] = s;

    splatIndex = (splatIndex + 1) % MAX_SPLATS;
    splatCount = Math.min(MAX_SPLATS, splatCount + 1);
  }

  // Pointer handling
  let isDown = false;
  canvas.addEventListener('pointerdown', (e) => {
    isDown = true;
    canvas.setPointerCapture(e.pointerId);
    addSplat(e.clientX, e.clientY);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!opts.dragOnly || isDown) {
      addSplat(e.clientX, e.clientY);
    }
  });
  const end = (e) => {
    isDown = false;
    try { canvas.releasePointerCapture(e.pointerId); } catch {}
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', () => { isDown = false; });

  // Render loop
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.uniform1i(u_tex, 0);

  // Static uniforms
  gl.uniform1f(u_amplitude, opts.amplitude);
  gl.uniform1f(u_wavelength, opts.wavelength);
  gl.uniform1f(u_speed, opts.speed);
  gl.uniform1f(u_falloff, opts.falloff);
  gl.uniform1f(u_decay, opts.decay);

  function draw() {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(u_time, now());
    gl.uniform1i(u_count, splatCount);

    // Push arrays
    gl.uniform2fv(u_centers, centers);
    gl.uniform1fv(u_birth, birth);
    gl.uniform1fv(u_strengths, strengths);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // Pause when not visible to save battery
  let rafActive = true;
  const visibilityHandler = () => {
    if (document.hidden && rafActive) {
      rafActive = false;
    } else if (!document.hidden && !rafActive) {
      rafActive = true;
      requestAnimationFrame(draw);
    }
  };
  document.addEventListener('visibilitychange', visibilityHandler);

  // Cleanup if needed (return a disposer)
  return () => {
    document.removeEventListener('visibilitychange', visibilityHandler);
    ro.disconnect();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    canvas.remove();
    img.style.visibility = '';
    img.removeAttribute('aria-hidden');
  };
}
