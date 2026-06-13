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
                'relative min-h-0 w-full overflow-hidden',
                className
            )}
            {...props}
        >
            <div
                className="absolute inset-8 rounded-3xl bg-linear-to-b from-(--accent)/12 via-transparent to-(--accent-contrast)/10 opacity-80"
                aria-hidden
            />
            <svg
                className="relative z-1 min-h-0 h-[stretch] text-(--accent)"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden
            >
                {prefersReducedMotion || isMobile ? (
                    <path
                        key="static-pathline"
                        d="M 18.75 0 C 37.5 21.4, 12.5 38.1, 31.25 50 S 75 61.9, 62.5 76.2 S 25 90.5, 50 100"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        opacity={0.7}
                    />
                ) : (
                    <path
                        key="animated-pathline"
                        className="animate-quest-pathline"
                        d="M 18.75 0 C 37.5 21.4, 12.5 38.1, 31.25 50 S 75 61.9, 62.5 76.2 S 25 90.5, 50 100"
                        stroke="currentColor"
                        strokeWidth="1"
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
