'use client';

import useIsMobile from '@/hooks/useIsMobile';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/tailwind.utils';
import { ArrowRight } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';

export type SURE_VUCA_ROW = {
    left: string;
    center: string;
    right: string;
    color: string;
    delay: string;
};

const rows: Array<SURE_VUCA_ROW> = [
    {
        left: 'Volatility',
        center: 'V',
        right: 'Velocity',
        color: 'var(--accent)',
        delay: '0s',
    },
    {
        left: 'Uncertainty',
        center: 'U',
        right: 'Understanding',
        color: 'var(--accent-contrast)',
        delay: '0.5s',
    },
    {
        left: 'Complexity',
        center: 'C',
        right: 'Clarity',
        color: 'var(--accent-mint)',
        delay: '1s',
    },
    {
        left: 'Ambiguity',
        center: 'A',
        right: 'Agility',
        color: 'var(--accent-warm)',
        delay: '1.5s',
    },
] as const;

type SureVucaProps = HTMLAttributes<HTMLDivElement> & {};

const SureVuca: FC<SureVucaProps> = ({ className, ...props }): ReactElement => {
    const isMobile = useIsMobile();
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <div
            className={cn(
                'mt-8 flex w-full flex-col items-center justify-center gap-8',
                className
            )}
            {...props}
        >
            <h3 className="text-4xl font-bold">SurePlay Transforms:</h3>

            <div className="flex w-full flex-col gap-4 text-2xl">
                {rows.map((row) => (
                    <div
                        key={row.center}
                        className="relative grid w-full grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-4 overflow-hidden"
                    >
                        {/* Faint glow — color matches the center letter */}
                        {!(isMobile || prefersReducedMotion) ? (
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 h-full max-h-full w-1/4 rounded-full blur-2xl will-change-transform"
                                style={{
                                    background: `linear-gradient(90deg, ${row.color}, transparent)`,
                                    animation: `glow-sweep 2s ease-in-out infinite`,
                                    animationDelay: row.delay,
                                }}
                            />
                        ) : null}

                        <p className="my-auto text-end align-middle text-lg text-(--ink-muted) sm:text-xl md:text-2xl">
                            {row.left}
                        </p>
                        <ArrowRight />
                        <p
                            className="relative z-10 text-center text-4xl font-black"
                            style={{ color: row.color }}
                        >
                            {row.center}
                        </p>
                        <ArrowRight />
                        <p className="my-auto text-start align-middle text-lg text-(--ink-muted) sm:text-xl md:text-2xl">
                            {row.right}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

SureVuca.displayName = 'SureVuca';

export default SureVuca;
