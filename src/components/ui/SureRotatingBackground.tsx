import useIsMobile from '@/hooks/useIsMobile';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes } from 'react';

type SureRotatingBackgroundProps = HTMLAttributes<HTMLDivElement> & {};

const SureRotatingBackground: FC<SureRotatingBackgroundProps> = ({
    className,
    ...props
}) => {
    const isMobile = useIsMobile(); 
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 top-[10%] -left-full min-h-[80%] w-[300%] origin-center opacity-30 will-change-transform',
                className
            )}
            style={{
                background:
                    'conic-gradient(from 120deg, color-mix(in srgb, var(--accent) 35%, transparent), transparent, color-mix(in srgb, var(--accent-contrast) 35%, transparent))',
                animation:
                    prefersReducedMotion || isMobile
                        ? 'none'
                        : 'breathing-spin 48s linear infinite',
                transform: 'translateZ(0)',
            }}
            {...props}
        />
    );
};

SureRotatingBackground.displayName = 'SureRotatingBackground';

export default SureRotatingBackground;
