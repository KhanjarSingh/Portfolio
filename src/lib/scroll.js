import Lenis from 'lenis';
import { useEffect, useSyncExternalStore } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { MAX_DEPTH, sections } from '../data/portfolio';

let lenis = null;

export function initSmoothScroll() {
    if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        lenis = null;
    };
}

export function scrollToId(id) {
    const el = id === 'surface' ? 0 : document.getElementById(id);
    if (el === null) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
    else if (el === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
    else el.scrollIntoView({ behavior: 'smooth' });
}

export function lockScroll(locked) {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
}

// --- Active section store -------------------------------------------------
let active = sections[0].id;
const listeners = new Set();

function setActive(id) {
    if (id === active) return;
    active = id;
    listeners.forEach((l) => l());
}

export function useActiveSectionTracker() {
    useEffect(() => {
        const visible = new Map();
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => visible.set(e.target.id, e.intersectionRatio));
                let best = null;
                let bestRatio = 0;
                for (const s of sections) {
                    const r = visible.get(s.id) ?? 0;
                    if (r > bestRatio) {
                        best = s.id;
                        bestRatio = r;
                    }
                }
                if (best) setActive(best);
            },
            { threshold: [0, 0.15, 0.3, 0.5, 0.7], rootMargin: '-35% 0px -35% 0px' },
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) io.observe(el);
        });
        measureStops();
        const ro = new ResizeObserver(measureStops);
        ro.observe(document.body);
        return () => {
            io.disconnect();
            ro.disconnect();
        };
    }, []);
}

export function useActiveSection() {
    return useSyncExternalStore(
        (cb) => {
            listeners.add(cb);
            return () => listeners.delete(cb);
        },
        () => active,
    );
}

// --- Depth --------------------------------------------------------------
// Scroll position → metres, interpolated between each section's nominal depth
// so the island, gauge and section headers always agree.
let stops = [];

function measureStops() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    stops = sections
        .map((s) => {
            const el = document.getElementById(s.id);
            return el ? { y: Math.max(0, el.offsetTop - window.innerHeight * 0.35), d: s.depth } : null;
        })
        .filter(Boolean);
    const last = stops[stops.length - 1];
    if (last) last.y = Math.min(last.y, max);
    stops.push({ y: Math.max(max, (last?.y ?? 0) + 1), d: MAX_DEPTH });
}

function depthAt(y) {
    if (stops.length < 2) return 0;
    if (y <= stops[0].y) return stops[0].d;
    for (let i = 1; i < stops.length; i++) {
        const a = stops[i - 1], b = stops[i];
        if (y <= b.y) return a.d + ((y - a.y) / (b.y - a.y || 1)) * (b.d - a.d);
    }
    return MAX_DEPTH;
}

export function useDepth() {
    const { scrollY } = useScroll();
    return useTransform(scrollY, depthAt);
}

// --- Global events (spotlight, limit break, bubble burst) -----------------
export const emit = (name, detail) => window.dispatchEvent(new CustomEvent(`deepend:${name}`, { detail }));

export function useEvent(name, handler) {
    useEffect(() => {
        const fn = (e) => handler(e.detail);
        window.addEventListener(`deepend:${name}`, fn);
        return () => window.removeEventListener(`deepend:${name}`, fn);
    }, [name, handler]);
}
