import { useEffect } from 'react';

// Feeds the pointer position into any hovered `.glass` card as --mx/--my,
// which the CSS turns into a soft light that follows the cursor.
export function useGlassSpotlight() {
    useEffect(() => {
        let current = null;
        let queued = null;
        let raf = 0;
        // batch to one style write per frame
        const move = (e) => {
            queued = e;
            if (!raf) raf = requestAnimationFrame(apply);
        };
        const apply = () => {
            raf = 0;
            const e = queued;
            const el = e.target.closest?.('.glass');
            if (current && current !== el) {
                current.style.removeProperty('--mx');
                current.style.removeProperty('--my');
            }
            current = el;
            if (!el) return;
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${e.clientX - r.left}px`);
            el.style.setProperty('--my', `${e.clientY - r.top}px`);
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', move);
        };
    }, []);
}
