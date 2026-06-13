import { cn } from '@/lib/tailwind.utils';
import { InfinityIcon, LucideIcon, Medal, Trophy } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureBasicCard from '../ui/SureBasicCard';

export type SURE_NUMBERS_STAT = {
    stat: string;
    label: string;
    icon: LucideIcon;
    tone: string;
};

const STATS: Array<SURE_NUMBERS_STAT> = [
    {
        stat: '10K+',
        label: 'Missions accomplished',
        icon: Trophy,
        tone: 'var(--bg-lg-yellow)',
    },
    {
        stat: '2.3×',
        label: 'Skill boost on focus weeks',
        icon: Trophy,
        tone: 'var(--bg-lg-red)',
    },
    {
        stat: '87%+',
        label: 'Win rate on committed paths',
        icon: Medal,
        tone: 'var(--bg-lg-teal)',
    },
    {
        stat: '∞',
        label: 'Endless levels to explore',
        icon: InfinityIcon,
        tone: 'var(--bg-lg-purple)',
    },
] as const;

type SureNumbers = HTMLAttributes<HTMLDivElement> & {};

const SureNumbers: FC<SureNumbers> = ({
    className,
    ...props
}): ReactElement => {
    return (
        <section
            className={cn(
                'mt-16 grid grid-cols-1 items-center justify-between gap-8 pt-16',
                'md:grid-cols-2',
                'lg:grid-cols-4',
                className
            )}
            {...props}
        >
            {STATS.map((item, index) => {
                const Icon = item.icon;
                return (
                    <SureBasicCard
                        key={'stat-list-' + index}
                        className="group relative mt-16 pt-16 flex flex-col items-center gap-4 overflow-visible"
                    >
                        <div
                            className="absolute z-10 flex h-24 w-24 -translate-y-[calc(100%+1rem)] items-center justify-center rounded-2xl text-white shadow-xl ring-4 ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            style={{ backgroundImage: item.tone }}
                        >
                            <Icon
                                className="h-12 w-12 drop-shadow-md"
                                strokeWidth={1.5}
                                aria-hidden
                            />
                        </div>

                        <h3 className="mt-8 text-5xl font-black tracking-tighter text-(--ink) sm:text-6xl">
                            {item.stat}
                        </h3>
                        <p className="text-sm font-bold tracking-widest text-(--ink-muted) uppercase opacity-80">
                            {item.label}
                        </p>
                    </SureBasicCard>
                );
            })}
        </section>
    );
};

SureNumbers.displayName = 'SureNumbers';

export default SureNumbers;
