import { useSyncExternalStore } from 'react';

const LG = '(min-width: 1024px)';

// True on laptop-and-up widths; re-renders when the breakpoint is crossed.
export const useIsDesktop = () =>
    useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia(LG);
            mq.addEventListener('change', cb);
            return () => mq.removeEventListener('change', cb);
        },
        () => window.matchMedia(LG).matches,
    );

// Phones and touch devices get a lighter build: same look, no per-frame scroll effects.
export const LITE = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
