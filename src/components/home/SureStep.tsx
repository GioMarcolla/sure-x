import { cn } from '@/lib/tailwind.utils';
import { LucideIcon } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';

export type STEP = {
    stepNumber: number;
    title: string;
    description: string;
    icon: LucideIcon;
};

type SureStepProps = HTMLAttributes<HTMLDivElement> & STEP & {};

const SureStep: FC<SureStepProps> = ({
    title,
    description,
    icon: Icon,
    stepNumber,
    className,
    ...props
}): ReactElement => {
    return (
        <div
            className={cn(
                'flex flex-row gap-5 rounded-4xl border-2 border-(--border-color) p-5 backdrop-blur-lg',
                'sm:gap-6 sm:p-6',
                className
            )}
            {...props}
        >
            {Icon && (
                <div
                    className="h-fit shrink-0 rounded-2xl border-2 border-(--bg-accent-contrast)/50 bg-(--accent-contrast)/20"
                    style={{
                        boxShadow:
                            '0 0 12px color-mix(in srgb, var(--accent-contrast) 55%, transparent)',
                    }}
                >
                    <Icon
                        size={32}
                        className="m-3.5 text-(--ink)"
                        strokeWidth={1.35}
                    />
                </div>
            )}
            <div className="min-w-0">
                {stepNumber && (
                    <p className="text-xs font-bold tracking-widest text-(--accent-warm) uppercase">
                        Checkpoint {stepNumber}
                    </p>
                )}
                <h3 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    {title}
                </h3>
                <p className="mt-2 text-base text-(--ink-muted) sm:text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
};

SureStep.displayName = 'SureStep';

export default SureStep;
