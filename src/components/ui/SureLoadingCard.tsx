import { cn } from '@/lib/tailwind.utils';
import { LucideIcon } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureInteractiveCard from '@/components/ui/SureInteractiveCard';

type SureLoadingCardProps = HTMLAttributes<HTMLDivElement> & {
    title: string;
    description?: string;
    icon?: LucideIcon;
    level: number; // 0-100
};

const SureLoadingCard: FC<SureLoadingCardProps> = ({
    title,
    description,
    icon: Icon,
    level,
    className,
    ...props
}): ReactElement => {
    const clamped = Math.min(100, Math.max(8, level));

    return (
        <SureInteractiveCard
            className={cn('gap-4', className)}
            glow="contrast"
            {...props}
        >
            <div className="flex items-start justify-between gap-4">
                {Icon && (
                    <div
                        className="rounded-2xl border-2 border-(--bg-accent)/40 bg-(--accent)/25"
                        style={{
                            boxShadow:
                                '0 0 12px color-mix(in srgb, var(--accent) 55%, transparent)',
                        }}
                    >
                        <Icon
                            size={34}
                            className="m-3.5 text-(--ink)"
                            strokeWidth={1.35}
                        />
                    </div>
                )}
                <div className="min-w-30 flex-1 text-right">
                    <p className="text-[10px] font-bold tracking-widest text-(--ink-muted) uppercase">
                        Power
                    </p>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-(--bg-strong) ring-1 ring-(--card-border)">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-(--accent) to-(--accent-contrast) transition-[width] duration-700 ease-out"
                            style={{ width: `${clamped}%` }}
                        />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-(--accent-strong)">
                        {clamped}%
                    </p>
                </div>
            </div>
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl pt-2">
                {title}
            </h3>
            {description && (
                <p className="text-base leading-relaxed text-(--ink-muted)">
                    {description}
                </p>
            )}
        </SureInteractiveCard>
    );
};

SureLoadingCard.displayName = 'SureLoadingCard';

export default SureLoadingCard;
