<template>
  <canvas ref="canvas" class="galaxy-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref(null);
let ctx = null;
let animationId = null;
let particles = [];
let width = 0;
let height = 0;
let mouse = { x: 0.5, y: 0.5 };

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y, radius, color, vx, vy, baseAlpha, twinkleSpeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.baseAlpha = baseAlpha;
    this.twinkleSpeed = twinkleSpeed;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(dt, parallaxX, parallaxY) {
    // Drift
    this.x += this.vx * dt * 0.06;
    this.y += this.vy * dt * 0.06;

    // wrap around edges so particles stay distributed
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    if (this.y < -10) this.y = height + 10;
    if (this.y > height + 10) this.y = -10;

    // gentle parallax offset
    const px = parallaxX * 12 * (this.radius / 3);
    const py = parallaxY * 12 * (this.radius / 3);

    this.phase += this.twinkleSpeed * dt * 0.001;
    const alpha = Math.max(0, Math.min(1, this.baseAlpha + Math.sin(this.phase) * 0.35));
    this.draw(this.x + px, this.y + py, alpha);
  }

  draw(x, y, alpha) {
    if (!ctx) return;
    const r = this.radius;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
    // solid center -> soft fade
    g.addColorStop(0, this.color);
    // apply alpha to middle and outer stops
    const hexAlpha = Math.round(alpha * 255).toString(16).padStart(2, '0');
    g.addColorStop(0.5, this.color + hexAlpha);
    g.addColorStop(1, this.color + '00');
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles(count = 120) {
  particles = [];
  const palettes = ['#ff6b6b', '#ffd166', '#6be7ff', '#b28cff', '#7ef3a1', '#ff9fd1'];
  for (let i = 0; i < count; i++) {
    const x = rand(0, width);
    const y = rand(0, height);
    const radius = rand(0.6, 3.5);
    const vx = rand(-0.02, 0.02);
    const vy = rand(-0.02, 0.02);
    const baseAlpha = rand(0.25, 0.9);
    const twinkleSpeed = rand(0.2, 1.5);
    const color = palettes[Math.floor(Math.random() * palettes.length)];
    particles.push(new Particle(x, y, radius, color, vx, vy, baseAlpha, twinkleSpeed));
  }
}

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const el = canvas.value;
  if (!el) return;
  width = el.clientWidth;
  height = el.clientHeight;
  el.width = Math.max(1, Math.floor(width * dpr));
  el.height = Math.max(1, Math.floor(height * dpr));
  ctx = el.getContext('2d');
  // Reset transform then scale once to avoid cumulative scaling
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // particle count scaled to area; tweak divisor for density
  createParticles(Math.round((width * height) / 9000));
}

let last = performance.now();
function loop(now) {
  const dt = now - last;
  last = now;
  if (!ctx) return;
  // clear each frame
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'lighter';
  // parallax based on mouse position
  const parallaxX = (mouse.x - 0.5) * 2;
  const parallaxY = (mouse.y - 0.5) * 2;
  for (let p of particles) p.update(dt, parallaxX, parallaxY);
  animationId = requestAnimationFrame(loop);
}

onMounted(() => {
  const el = canvas.value;
  if (!el) return;
  // make canvas fill parent
  el.style.width = '100%';
  el.style.height = '100%';
  resize();
  window.addEventListener('resize', resize);
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width;
    mouse.y = (e.clientY - rect.top) / rect.height;
  });
  el.addEventListener('mouseleave', () => { mouse.x = 0.5; mouse.y = 0.5; });
  last = performance.now();
  animationId = requestAnimationFrame(loop);
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
});
</script>

<style scoped>
.galaxy-canvas {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* will be layered by parent */
  pointer-events: none; /* allow clicks through */
}
</style>
