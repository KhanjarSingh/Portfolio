import {
    BadgePercent, BarChart3, Bug, Clapperboard, Code2, Database, FileSpreadsheet, Gamepad2, Gauge, Gift, IdCard, KeyRound,
    LayoutDashboard, LayoutGrid, Lock, Mail, Medal, MessageCircle, Megaphone, MousePointerClick, Newspaper, PackageCheck,
    Palette, Receipt, RefreshCcw, Rocket, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Store, Timer, Truck, Undo2,
    Users, Waves, Workflow, Zap,
} from 'lucide-react';

// Icons are referenced by name from data files so content stays plain JSON-like.
const ICONS = {
    BadgePercent, BarChart3, Bug, Clapperboard, Code2, Database, FileSpreadsheet, Gamepad2, Gauge, Gift, IdCard, KeyRound,
    LayoutDashboard, LayoutGrid, Lock, Mail, Medal, MessageCircle, Megaphone, MousePointerClick, Newspaper, PackageCheck,
    Palette, Receipt, RefreshCcw, Rocket, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Store, Timer, Truck, Undo2,
    Users, Waves, Workflow, Zap,
};

const SIZES = {
    sm: { box: 32, icon: 15, radius: 10 },
    md: { box: 40, icon: 18, radius: 12 },
    lg: { box: 48, icon: 22, radius: 15 },
};

// A glowing glass tile with a line icon: the site's replacement for emoji.
const Glyph = ({ name, color = '#5eead4', size = 'md', className = '' }) => {
    const Icon = ICONS[name] ?? Sparkles;
    const s = SIZES[size];
    return (
        <span
            className={`relative grid shrink-0 place-items-center ${className}`}
            style={{
                width: s.box,
                height: s.box,
                borderRadius: s.radius,
                padding: 1,
                background: `linear-gradient(145deg, ${color}aa, ${color}10 55%, ${color}55)`,
            }}
        >
            <span
                className="grid h-full w-full place-items-center"
                style={{
                    borderRadius: s.radius - 1,
                    background: `radial-gradient(circle at 30% 20%, ${color}38, transparent 60%), linear-gradient(160deg, #0d2230, #061019)`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,.12), 0 6px 18px -8px ${color}`,
                }}
            >
                <Icon size={s.icon} strokeWidth={1.9} color={color} style={{ filter: `drop-shadow(0 0 6px ${color}88)` }} />
            </span>
        </span>
    );
};

export default Glyph;
