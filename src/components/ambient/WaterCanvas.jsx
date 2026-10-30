import { useEffect, useRef } from 'react';

const DAMPING = 0.982;

// 2D height-field ripple simulation. Pointer makes waves, click makes a splash.
const WaterCanvas = ({ className = '' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const off = document.createElement('canvas');
        const offCtx = off.getContext('2d');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let W = 0, H = 0, CELL = 4, cur, prev, img, raf, visible = true, lastDrop = 0;

        const resize = () => {
            const r = canvas.getBoundingClientRect();
            // coarser grid on big screens; smoothing on upscale hides it
            CELL = r.width > 1100 ? 6 : r.width > 700 ? 5 : 4;
            canvas.width = r.width;
            canvas.height = r.height;
            W = Math.max(2, Math.ceil(r.width / CELL));
            H = Math.max(2, Math.ceil(r.height / CELL));
            off.width = W;
            off.height = H;
            cur = new Float32Array(W * H);
            prev = new Float32Array(W * H);
            img = offCtx.createImageData(W, H);
        };

        const disturb = (cx, cy, radius, power) => {
            const gx = Math.floor(cx / CELL), gy = Math.floor(cy / CELL);
            for (let y = -radius; y <= radius; y++) {
                for (let x = -radius; x <= radius; x++) {
                    const px = gx + x, py = gy + y;
                    if (px < 1 || py < 1 || px >= W - 1 || py >= H - 1) continue;
                    const d = Math.sqrt(x * x + y * y);
                    if (d <= radius) cur[py * W + px] += power * (1 - d / (radius + 1));
                }
            }
        };

        const step = () => {
            for (let y = 1; y < H - 1; y++) {
                for (let x = 1; x < W - 1; x++) {
                    const i = y * W + x;
                    prev[i] = ((cur[i - 1] + cur[i + 1] + cur[i - W] + cur[i + W]) * 0.5 - prev[i]) * DAMPING;
                }
            }
            const t = prev;
            prev = cur;
            cur = t;
        };

        const render = () => {
            const d = img.data;
            for (let y = 0; y < H; y++) {
                const fy = y / H;
                // deep-pool gradient: lighter teal at the top
                const br = 8 + (1 - fy) * 10, bg = 52 + (1 - fy) * 60, bb = 70 + (1 - fy) * 60;
                for (let x = 0; x < W; x++) {
                    const i = y * W + x;
                    const l = x > 0 ? cur[i - 1] : 0, r = x < W - 1 ? cur[i + 1] : 0;
                    const u = y > 0 ? cur[i - W] : 0, dn = y < H - 1 ? cur[i + W] : 0;
                    // soft-clamp so big splashes brighten instead of blowing out
                    const shade = 26 * Math.tanh(((l - r) + (u - dn)) / 60);
                    const spec = shade > 14 ? (shade - 14) * 6 : 0;
                    const p = i * 4;
                    d[p] = br + shade * 0.6 + spec;
                    d[p + 1] = bg + shade * 1.4 + spec;
                    d[p + 2] = bb + shade * 1.6 + spec;
                    d[p + 3] = 255;
                }
            }
            offCtx.putImageData(img, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
        };

        const loop = (t) => {
            raf = requestAnimationFrame(loop);
            if (!visible) return;
            if (t - lastDrop > 700) {
                lastDrop = t;
                disturb(Math.random() * canvas.width, Math.random() * canvas.height, 2, 60);
            }
            step();
            render();
        };

        const pos = (e) => {
            const r = canvas.getBoundingClientRect();
            return [e.clientX - r.left, e.clientY - r.top];
        };
        let last = null;
        const move = (e) => {
            const [x, y] = pos(e);
            if (last) {
                const dist = Math.hypot(x - last[0], y - last[1]);
                disturb(x, y, 3, Math.min(120, 20 + dist * 3));
            }
            last = [x, y];
        };
        const down = (e) => {
            const [x, y] = pos(e);
            disturb(x, y, 6, 450);
        };

        resize();
        // seed a few ripples so the surface is alive immediately
        for (let i = 0; i < 6; i++) disturb(Math.random() * canvas.width, Math.random() * canvas.height, 4, 160);
        render();

        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        io.observe(canvas);
        const host = canvas.parentElement;
        host.addEventListener('pointermove', move);
        host.addEventListener('pointerdown', down);
        window.addEventListener('resize', resize);
        if (!reduced) raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            host.removeEventListener('pointermove', move);
            host.removeEventListener('pointerdown', down);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />;
};

export default WaterCanvas;
