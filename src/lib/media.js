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
