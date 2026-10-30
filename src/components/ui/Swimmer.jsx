import { motion } from 'framer-motion';

// Top-down freestyle swimmer heading down the lane: arms windmill, feet kick.
const Swimmer = ({ className = '' }) => (
    <motion.svg
        width="34"
        height="56"
        viewBox="0 0 34 56"
        className={`block drop-shadow-[0_0_10px_rgba(94,234,212,.6)] ${className}`}
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
    >
        {/* kicking feet */}
        <motion.g animate={{ y: [0, 2, 0] }} transition={{ duration: 0.3, repeat: Infinity }}>
            <rect x="11" y="2" width="4" height="12" rx="2" fill="#f1c7a3" />
            <rect x="19" y="2" width="4" height="12" rx="2" fill="#f1c7a3" />
        </motion.g>
        {/* body */}
        <rect x="9" y="10" width="16" height="26" rx="8" fill="#0e7490" />
        <rect x="9" y="10" width="16" height="8" rx="4" fill="#f1c7a3" />
        {/* arms */}
        <motion.rect
            x="2" y="30" width="5" height="22" rx="2.5" fill="#f1c7a3"
            style={{ originX: '4.5px', originY: '32px' }}
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.rect
            x="27" y="30" width="5" height="22" rx="2.5" fill="#f1c7a3"
            style={{ originX: '29.5px', originY: '32px' }}
            animate={{ scaleY: [0.2, 1, 0.2] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* head with cap + goggles */}
        <circle cx="17" cy="40" r="8" fill="#ff5c8a" />
        <rect x="10" y="41" width="14" height="3" rx="1.5" fill="#111" />
        <circle cx="13" cy="42.5" r="2" fill="#5eead4" />
        <circle cx="21" cy="42.5" r="2" fill="#5eead4" />
    </motion.svg>
);

export default Swimmer;
