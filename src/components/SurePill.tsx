import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement } from 'react';

const COLOR_MAP: Record<string, string> = {
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
                `bg-(${COLOR_MAP[tint]})/30 border-(${COLOR_MAP[tint]})/10 text-(--ink)`,
                className
            )}
            style={{
                boxShadow: glow
                    ? `0 0 ${GLOW_SIZE} ${GLOW_OFFSET} color-mix(in srgb, var(${COLOR_MAP[tint]}) 50%, transparent)`
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
