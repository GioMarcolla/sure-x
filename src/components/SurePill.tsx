import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement } from 'react';

const TINT_MAP: Record<string, string> = {
    primary: 'bg-(--accent)/30 border-(--accent)/10',
    strong: 'bg-(--accent-strong)/30 border-(--accent-strong)/10',
    warm: 'bg-(--accent-warm)/30 border-(--accent-warm)/10',
    mint: 'bg-(--accent-mint)/30 border-(--accent-mint)/10',
    contrast: 'bg-(--accent-contrast)/30 border-(--accent-contrast)/10',
};

const GLOW_MAP: Record<string, string> = {
    primary: '--accent',
    strong: '--accent-strong',
    warm: '--accent-warm',
    mint: '--accent-mint',
    contrast: '--accent-contrast',
};

const GLOW_OFFSET = '5px';
const GLOW_SIZE = '25px';

type SurePillProps = HTMLAttributes<HTMLSpanElement> & {
    text: string;
    tint?: 'primary' | 'strong' | 'warm' | 'mint' | 'contrast';
    glow?: boolean;
    icon?: ReactElement;
};

const SurePill: FC<SurePillProps> = ({
    className,
    text,
    icon,
    glow = false,
    tint = 'primary',
    ...props
}): ReactElement => {
    return (
        <span
            className={cn(
                'flex flex-row justify-between rounded-full border-2 px-4 py-1 backdrop-blur-sm backdrop-opacity-10',
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
            {icon && icon}
            <span className="text-sm font-medium">{text}</span>
        </span>
    );
};

SurePill.displayName = 'SurePill';

export default SurePill;
