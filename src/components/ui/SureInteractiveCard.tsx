import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureBasicCard from './SureBasicCard';

type GLOW_KEYS = 'primary' | 'strong' | 'warm' | 'mint' | 'contrast';

const GLOW_MAP: Record<GLOW_KEYS, string> = {
    primary: '--accent',
    strong: '--accent-strong',
    warm: '--accent-warm',
    mint: '--accent-mint',
    contrast: '--accent-contrast',
} as const;

type SureInteractiveCardProps = HTMLAttributes<HTMLDivElement> & {
    glow?: GLOW_KEYS;
};

const SureInteractiveCard: FC<SureInteractiveCardProps> = ({
    className,
    children,
    glow,
    ...props
}): ReactElement => {
    return (
        <SureBasicCard
            className={cn(
                'transition-all duration-300 ease-in-out',
                'hover:-translate-y-1',
                glow &&
                    `hover:shadow-[0_0_50px_color-mix(in_srgb,var(${GLOW_MAP[glow]})_40%,transparent)]`,
                className
            )}
            {...props}
        >
            {children}
        </SureBasicCard>
    );
};

SureInteractiveCard.displayName = 'SureInteractiveCard';

export default SureInteractiveCard;
