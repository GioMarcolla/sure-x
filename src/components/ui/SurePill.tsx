import { cn } from '@/lib/tailwind.utils';
import { LucideIcon } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';

type GLOW_KEYS = 'primary' | 'strong' | 'warm' | 'mint' | 'contrast';

const TINT_MAP: Record<GLOW_KEYS, string> = {
    primary: 'bg-(--accent)/30 border-(--accent)/5',
    strong: 'bg-(--accent-strong)/30 border-(--accent-strong)/5',
    warm: 'bg-(--accent-warm)/30 border-(--accent-warm)/5',
    mint: 'bg-(--accent-mint)/30 border-(--accent-mint)/5',
    contrast: 'bg-(--accent-contrast)/30 border-(--accent-contrast)/5',
} as const;

const GLOW_MAP: Record<GLOW_KEYS, string> = {
    primary: '--accent',
    strong: '--accent-strong',
    warm: '--accent-warm',
    mint: '--accent-mint',
    contrast: '--accent-contrast',
} as const;

const GLOW_OFFSET = '5px';
const GLOW_SIZE = '25px';

type SurePillProps = HTMLAttributes<HTMLSpanElement> & {
    text: string;
    tint?: GLOW_KEYS;
    glow?: boolean;
    icon?: LucideIcon;
};

const SurePill: FC<SurePillProps> = ({
    className,
    text,
    icon: Icon,
    glow = false,
    tint = 'primary',
    ...props
}): ReactElement => {
    return (
        <span
            className={cn(
                'flex flex-row items-center justify-between gap-2 rounded-full border-2 px-4 py-2 align-middle backdrop-blur-sm backdrop-opacity-10',
                TINT_MAP[tint],
                className
            )}
            style={{
                boxShadow: glow
                    ? `0 0 ${GLOW_SIZE} ${GLOW_OFFSET} color-mix(in srgb, var(${GLOW_MAP[tint]}) 50%, transparent)`
                    : undefined,
            }}
            {...props}
        >
            {Icon && <Icon className="h-4 w-4" />}
            <span className="text-sm font-medium">{text}</span>
        </span>
    );
};

SurePill.displayName = 'SurePill';

export default SurePill;
