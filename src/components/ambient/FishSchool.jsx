import { useEffect, useRef } from 'react';
import { useDepth } from '../../lib/scroll';
import { LITE } from '../../lib/media';

const VIEW = 70; // neighbour radius
const MAX_SPEED = 2.2;

// Bioluminescent fish that flock (boids), drift toward the cursor and scatter on click.
// They fade in once the dive passes ~25m.
const FishSchoolCanvas = () => {
    const ref = useRef(null);
    const depth = useDepth();

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // soft glowing dots don't need retina
        const count = window.innerWidth < 768 ? 16 : 32;
        let W = 0, H = 0, raf, alpha = 0;
        const pointer = { x: -1e4, y: -1e4, active: false };
        let scatter = 0;

        const resize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        // Pre-render each glowing body once; per-frame shadowBlur is far too expensive.
        const sprites = {};
        for (const hue of ['94,234,212', '255,92,138']) {
            const c = document.createElement('canvas');
            c.width = 64;
            c.height = 32;
            const g = c.getContext('2d');
            g.shadowColor = `rgba(${hue},0.9)`;
            g.shadowBlur = 10;
            g.fillStyle = `rgba(${hue},0.9)`;
            g.beginPath();
            g.ellipse(32, 16, 16, 6, 0, 0, Math.PI * 2);
            g.fill();
            sprites[hue] = c;
        }

        const fish = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: 3 + Math.random() * 4,
            hue: Math.random() > 0.8 ? '255,92,138' : '94,234,212',
            phase: Math.random() * Math.PI * 2,
        }));

        const step = (t) => {
            for (const f of fish) {
                let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0, n = 0;
                for (const o of fish) {
                    if (o === f) continue;
                    const dx = o.x - f.x, dy = o.y - f.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 > VIEW * VIEW) continue;
                    n++;
                    ax += o.vx; ay += o.vy;
                    cx += o.x; cy += o.y;
                    if (d2 < 400) {
                        sx -= dx / (d2 + 1) * 20;
                        sy -= dy / (d2 + 1) * 20;
                    }
                }
                if (n) {
                    f.vx += (ax / n - f.vx) * 0.04 + (cx / n - f.x) * 0.0006;
                    f.vy += (ay / n - f.vy) * 0.04 + (cy / n - f.y) * 0.0006;
                }
                f.vx += sx * 0.05;
                f.vy += sy * 0.05;

                // curious about the cursor, terrified of clicks
                const px = pointer.x - f.x, py = pointer.y - f.y;
                const pd = Math.hypot(px, py);
                if (scatter > 0 && pd < 260) {
                    f.vx -= (px / pd) * 1.6;
                    f.vy -= (py / pd) * 1.6;
                } else if (pointer.active && pd < 320 && pd > 40) {
                    f.vx += (px / pd) * 0.05;
                    f.vy += (py / pd) * 0.05;
                }

                const sp = Math.hypot(f.vx, f.vy);
                const limit = scatter > 0 ? MAX_SPEED * 3 : MAX_SPEED;
                if (sp > limit) {
                    f.vx = (f.vx / sp) * limit;
                    f.vy = (f.vy / sp) * limit;
                } else if (sp < 0.6) {
                    f.vx *= 1.2;
                    f.vy *= 1.2;
                }
                f.x += f.vx;
                f.y += f.vy;
                if (f.x < -20) f.x = W + 20;
                if (f.x > W + 20) f.x = -20;
                if (f.y < -20) f.y = H + 20;
                if (f.y > H + 20) f.y = -20;
            }
            if (scatter > 0) scatter--;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            ctx.globalAlpha = alpha;
            for (const f of fish) {
                const ang = Math.atan2(f.vy, f.vx);
                const k = f.size / 10; // sprite body is 16px long → ~1.6×size
                const cos = Math.cos(ang) * dpr, sin = Math.sin(ang) * dpr;
                ctx.setTransform(cos, sin, -sin, cos, f.x * dpr, f.y * dpr);
                ctx.drawImage(sprites[f.hue], -32 * k, -16 * k, 64 * k, 32 * k);
                // tail: a cheap triangle that wiggles
                const w = Math.sin(t / 120 + f.phase) * f.size * 0.5;
                ctx.fillStyle = `rgba(${f.hue},0.85)`;
                ctx.beginPath();
                ctx.moveTo(-f.size * 1.3, 0);
                ctx.lineTo(-f.size * 2.6, -f.size * 0.8 + w);
                ctx.lineTo(-f.size * 2.6, f.size * 0.8 + w);
                ctx.closePath();
                ctx.fill();
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const loop = (t) => {
            raf = requestAnimationFrame(loop);
            const m = depth.get();
            // cap at 0.5 so the fish stay background life and never compete with text
            const target = m < 22 ? 0 : Math.min(0.5, (m - 22) / 40);
            alpha += (target - alpha) * 0.05;
            canvas.style.opacity = alpha > 0.01 ? '1' : '0';
            if (alpha > 0.01) step(t);
        };
        raf = requestAnimationFrame(loop);

        const move = (e) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
            pointer.active = true;
        };
        const leave = () => (pointer.active = false);
        const down = (e) => {
            move(e);
            scatter = 40;
        };
        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('pointerdown', down);
        document.addEventListener('pointerleave', leave);
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerdown', down);
            document.removeEventListener('pointerleave', leave);
            window.removeEventListener('resize', resize);
        };
    }, [depth]);

    return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-[5] h-full w-full transition-opacity duration-700" />;
};

// Phones skip the flocking simulation entirely.
const FishSchool = LITE ? () => null : FishSchoolCanvas;

export default FishSchool;
