import { InfinityIcon, LucideIcon, Medal, Trophy } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';

type STAT = {
    stat: string;
    label: string;
    icon: LucideIcon;
    tone: string;
};

const STATS: Array<STAT> = [
    {
        stat: '1M+',
        label: 'Missions accomplished',
        icon: Trophy,
        tone: 'var(--bg-lg-yellow)',
    },
    {
        stat: '2.5×',
        label: 'Skill boost on focus weeks',
        icon: Trophy,
        tone: 'var(--bg-lg-red)',
    },
    {
        stat: '90%+',
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

const SureNumbers: FC<SureNumbers> = (): ReactElement => {
    return (
        <section className="mt-48 flex flex-row items-center justify-between gap-8">
            {STATS.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={'stat-list-' + index}
                        className="group relative flex flex-col items-center gap-4 overflow-visible rounded-4xl border-2 border-(--border-color) p-8 text-center backdrop-blur-lg"
                    >
                        <div
                            className="absolute z-10 flex h-24 w-24 -translate-y-[calc(50%+2rem)] items-center justify-center rounded-2xl text-white shadow-xl ring-4 ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
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
                        <p className="max-w-56 text-sm font-bold tracking-widest text-(--ink-muted) uppercase opacity-80">
                            {item.label}
                        </p>
                    </div>
                );
            })}
        </section>
    );
};

SureNumbers.displayName = 'SureNumbers';

export default SureNumbers;
