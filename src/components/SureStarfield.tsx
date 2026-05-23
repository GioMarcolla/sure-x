'use client';

import { FC, HTMLAttributes, ReactElement, useEffect, useState } from 'react';
import { cn } from '@/lib/tailwind.utils';

type StarHue = 'accent' | 'contrast' | 'warm' | 'mint' | 'bright';

interface Star {
    id: number;
    left: string;
    top: string;
    duration: string;
    twinkleDur: string;
    delay: string;
    hue: StarHue;
    size: number;
    driftX: string;
    driftY: string;
}

// ─── TUNE THESE ───────────────────────────────────────
const SPEED = 1.5; // Higher = faster movement (divides animation duration)
const DISTANCE = 2; // Higher = stars drift farther (multiplies drift px)

const CROSS_ARM_LENGTH = 60; // px — length of each cross arm
const CROSS_GLOW_BLUR = 60; // px — softness of the cross glow
// ──────────────────────────────────────────────────────

const TOTAL_STARS = 25;
const HUE_ARR: StarHue[] = ['accent', 'contrast', 'warm', 'mint', 'bright'];

const STAR_DATA: Star[] = Array.from({ length: TOTAL_STARS }).map((_, i) => {
    const r = (Math.sin(i * 60) * 43758.5453) % 1;
    const r2 = (Math.sin(i * 12) * 43758.5453) % 1;

    return {
        id: i,
        left: `${Math.abs(r * 100).toFixed(2)}%`,
        top: `${Math.abs(r2 * 100).toFixed(2)}%`,
        duration: `${((50 + (i % 20) * 3) / SPEED).toFixed(2)}s`,
        twinkleDur: `${((3 + (i % 10) * 0.5) / SPEED).toFixed(2)}s`,
        delay: `-${((i % 50) * 0.7).toFixed(2)}s`,
        hue: HUE_ARR[i % 5]!,
        size: 500 + (i % 3) * 20,
        driftX: `${((10 + (i % 15) * 5) * DISTANCE).toFixed(2)}px`,
        driftY: `${((12 + (i % 10) * 4) * DISTANCE).toFixed(2)}px`,
    };
});

const HUE_CORES: Record<StarHue, string> = {
    accent: 'var(--accent)',
    contrast: 'var(--accent-contrast)',
    warm: 'var(--accent-warm)',
    mint: 'var(--accent-mint)',
    bright: '#ffffffaa',
};

type SureStarfieldProps = HTMLAttributes<HTMLElement> & {};

const SureStarfield: FC<SureStarfieldProps> = ({ className }): ReactElement => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div
            className={cn(
                'pointer-events-none fixed inset-0 z-0 overflow-hidden select-none',
                className
            )}
            aria-hidden
        >
            <div
                className="absolute inset-0 opacity-30 transition-opacity duration-1000 dark:opacity-50"
                style={{
                    background: `
                        radial-gradient(ellipse at 50% -20%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%),
                        radial-gradient(ellipse at 80% 40%, color-mix(in srgb, var(--accent-contrast) 8%, transparent), transparent 40%)
                    `,
                }}
            />

            {mounted &&
                STAR_DATA.map((star) => {
                    const color = HUE_CORES[star.hue];

                    return (
                        <div
                            key={star.id}
                            className="absolute"
                            style={{
                                left: star.left,
                                top: star.top,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                // Center the large gradient
                                transform: 'translate(-50%, -50%)',
                                backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${color}, transparent 80%) 0%, color-mix(in srgb, ${color}, transparent 95%) 1%, transparent 70%)`,
                                mixBlendMode: 'screen',
                                // Pass the drift values to CSS
                                ['--drift-x' as string]: star.driftX,
                                ['--drift-y' as string]: star.driftY,
                                animation: `star-twinkle ${star.twinkleDur} ease-in-out ${star.delay} infinite alternate, star-drift ${star.duration} ease-in-out ${star.delay} infinite alternate`,
                            }}
                        >
                            <div
                                className="absolute top-1/2 left-1/2 h-[1.5px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 0 20px 2px ${color}, 0 0 40px 4px ${color}`,
                                    opacity: 0.2,
                                }}
                                
                            >
                                {/* Cross arm 1-1 — diagonal / */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: `${CROSS_ARM_LENGTH}px`,
                                        height: '2px',
                                        transform:
                                            'translate(-40%, -40%) rotate(45deg)',
                                        background: `linear-gradient(90deg, transparent 0%, ${color} 45%, ${color} 55%, transparent 100%)`,
                                        boxShadow: `0 0 ${CROSS_GLOW_BLUR}px 2px --color-mix(in srgb, ${color}, transparent 80%), 0 0 ${CROSS_GLOW_BLUR * 2}px 4px ${color}`,
                                        opacity: 0.2,
                                    }}
                                />
                                {/* Cross arm 1-1 — diagonal / */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: `${CROSS_ARM_LENGTH}px`,
                                        height: '2px',
                                        transform:
                                            'translate(-60%, -60%) rotate(45deg)',
                                        background: `linear-gradient(90deg, transparent 0%, ${color} 45%, ${color} 55%, transparent 100%)`,
                                        boxShadow: `0 0 ${CROSS_GLOW_BLUR}px 2px --color-mix(in srgb, ${color}, transparent 80%), 0 0 ${CROSS_GLOW_BLUR * 2}px 4px ${color}`,
                                        opacity: 0.2,
                                    }}
                                />
                                {/* Cross arm 2-1 — diagonal \ */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: `${CROSS_ARM_LENGTH}px`,
                                        height: '2px',
                                        transform:
                                            'translate(-40%, -40%) rotate(-45deg)',
                                        background: `linear-gradient(90deg, transparent 0%, ${color} 45%, ${color} 55%, transparent 100%)`,
                                        boxShadow: `0 0 ${CROSS_GLOW_BLUR}px 2px --color-mix(in srgb, ${color}, transparent 80%), 0 0 ${CROSS_GLOW_BLUR * 2}px 4px ${color}`,
                                        opacity: 0.2,
                                    }}
                                />
                                {/* Cross arm 2-2 — diagonal \ */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: `${CROSS_ARM_LENGTH}px`,
                                        height: '2px',
                                        transform:
                                            'translate(-60%, -60%) rotate(-45deg)',
                                        background: `linear-gradient(90deg, transparent 0%, ${color} 45%, ${color} 55%, transparent 100%)`,
                                        boxShadow: `0 0 ${CROSS_GLOW_BLUR}px 2px --color-mix(in srgb, ${color}, transparent 80%), 0 0 ${CROSS_GLOW_BLUR * 2}px 4px ${color}`,
                                        opacity: 0.2,
                                    }}
                                />
                                {/* Central core */}
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '1px',
                                        height: '1px',
                                        borderRadius: '9999px',
                                        backgroundColor: color,
                                        opacity: 0.4,
                                        boxShadow: `0 0 10px --color-mix(in srgb, ${color}, transparent 80%), 0 0 40px --color-mix(in srgb, ${color}, transparent 50%)`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

SureStarfield.displayName = 'SureStarfield';

export default SureStarfield;
