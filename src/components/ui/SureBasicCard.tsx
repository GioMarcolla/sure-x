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
                'flex flex-col gap-4 rounded-4xl border border-(--border-color) bg-(--bg-strong)/5 p-8 backdrop-blur-[2px]',
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
