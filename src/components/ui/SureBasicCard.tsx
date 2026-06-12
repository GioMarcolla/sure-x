import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement } from 'react';

type SureBasicCardProps = HTMLAttributes<HTMLDivElement> & {
    glowColor?: 'primary' | 'strong' | 'warm' | 'mint' | 'contrast';
    glow?: boolean;
};

const SureBasicCard: FC<SureBasicCardProps> = ({
    className,
    children,
    ...props
}): ReactElement => {
    return (
        <div
            className={cn(
                'rounded-4xl border border-(--border-color) bg-(--bg-strong) p-8 backdrop-blur-lg',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

SureBasicCard.displayName = 'SureBasicCard';

export default SureBasicCard;
