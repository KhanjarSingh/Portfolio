const luminance = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

// iOS-style squircle app icon from a simple-icons path (or a text monogram).
const AppIcon = ({ app, size = 56, className = '' }) => {
    const dark = luminance(app.color) < 0.25;
    const num = typeof size === 'number';
    const scaled = (k, fallback) => (num ? size * k : fallback);
    return (
        <span
            className={`relative grid shrink-0 place-items-center overflow-hidden shadow-[0_6px_16px_-6px_rgba(0,0,0,.6)] ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: scaled(0.235, '23.5%'),
                containerType: num ? undefined : 'size',
                background: dark
                    ? 'linear-gradient(160deg,#ffffff,#d8e3e8)'
                    : `linear-gradient(160deg, #1d2a33, #0b1319)`,
            }}
        >
            <span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" style={{ height: '50%' }} />
            {app.path ? (
                <svg viewBox="0 0 24 24" width={scaled(0.55, '55%')} height={scaled(0.55, '55%')} fill={dark ? '#0b1319' : app.color} aria-hidden>
                    <path d={app.path} />
                </svg>
            ) : (
                <span className="font-display font-extrabold" style={{ color: app.color, fontSize: scaled(0.34, '34cqw') }}>
                    {app.label}
                </span>
            )}
        </span>
    );
};

export default AppIcon;
