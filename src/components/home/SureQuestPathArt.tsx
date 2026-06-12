'use client';

import useIsMobile from '@/hooks/useIsMobile';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/tailwind.utils';
import { MapPin, PartyPopper } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement, useEffect, useState } from 'react';
import SureBasicCard from '../ui/SureBasicCard';

type SureQuestPathArtProps = HTMLAttributes<HTMLDivElement> & {};

const SureQuestPathArt: FC<SureQuestPathArtProps> = ({
    className,
    ...props
}): ReactElement => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const isMobile = useIsMobile();

    return (
        <SureBasicCard
            className={cn(
                'relative flex h-full w-full items-center justify-center overflow-hidden',
                className
            )}
            {...props}
        >
            <div
                className="absolute inset-6 rounded-3xl bg-linear-to-b from-(--accent)/12 via-transparent to-(--accent-contrast)/10 opacity-80"
                aria-hidden
            />
            <svg
                className="relative z-1 text-(--accent)"
                viewBox="0 0 320 420"
                fill="none"
                aria-hidden
            >
                {prefersReducedMotion || isMobile ? (
                    <path
                        key="static-pathline"
                        d="M 60 0 C 120 90, 40 160, 100 210 S 240 260, 200 320 S 80 380, 160 420"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity={0.7}
                    />
                ) : (
                    <path
                        key="animated-pathline"
                        className="animate-quest-pathline"
                        d="M 60 0 C 120 90, 40 160, 100 210 S 240 260, 200 320 S 80 380, 160 420"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity={0.7}
                    />
                )}
            </svg>
            <div className="pointer-events-none absolute top-2.5 left-[20%] z-2 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-(--border-color) bg-(--accent-warm) text-(--ink) shadow-lg">
                <MapPin className="h-6 w-6" aria-hidden />
            </div>
            <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border-2 border-(--border-color) bg-(--accent-contrast) text-(--ink) shadow-lg">
                <PartyPopper className="h-7 w-7" aria-hidden />
            </div>
        </SureBasicCard>
    );
};

SureQuestPathArt.displayName = 'SureQuestPathArt';

export default SureQuestPathArt;
