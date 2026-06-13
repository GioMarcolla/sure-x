import { FC, HTMLAttributes, ReactElement } from 'react';
import SurePill from '@/components/ui/SurePill';
import {
    BrainIcon,
    CpuIcon,
    GitBranchIcon,
    LayersIcon,
    LucideIcon,
    NetworkIcon,
    TargetIcon,
    TrendingUpIcon,
} from 'lucide-react';
import { cn } from '@/lib/tailwind.utils';
import SureLoadingCard from '@/components/ui/SureLoadingCard';

export type FEATURE = {
    title: string;
    description: string;
    icon: LucideIcon;
    level: number; // 0-100
};

const FEATURES: Array<FEATURE> = [
    {
        title: 'Life Awareness',
        description:
            'Suggestions adapt to your previous choices, your life, and your goals.',
        icon: BrainIcon,
        level: 86,
    },
    {
        title: 'Non-linear mapping',
        description:
            'Branch and backtrack without losing the thread of where you started.',
        icon: GitBranchIcon,
        level: 92,
    },
    {
        title: 'Mix & refine',
        description: 'Change directions by throwing more context into the mix.',
        icon: TrendingUpIcon,
        level: 78,
    },
    {
        title: 'Real-life Awerness',
        description:
            'Introduce real-life resources to create meaningful outcomes.',
        icon: NetworkIcon,
        level: 81,
    },
    {
        title: 'Lifetime Memory',
        description:
            'Your goals, constraints, and preferences stick around and modl future suggestions.',
        icon: LayersIcon,
        level: 88,
    },
    {
        title: 'Struggles Awareness',
        description:
            'Suggestions are aware of your struggles and adapt to help you overcome them.',
        icon: TargetIcon,
        level: 90,
    },
] as const;

type SureFeaturesProps = HTMLAttributes<HTMLDivElement> & {};

const SureFeatures: FC<SureFeaturesProps> = ({
    className,
    ...props
}): ReactElement => {
    return (
        <section
            id="features"
            className={cn(
                'mt-16 flex flex-col items-center justify-center gap-8 pt-16',
                className
            )}
            {...props}
        >
            <SurePill text="Action deck" icon={CpuIcon} glow />
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Intelligence that evolves
            </h2>
            <div className="max-w-2/3">
                <p className="text-muted-foreground text-center text-lg">
                    Our AI adapts to your unique way of thinking and working.
                    Making decision that are relevant to{' '}
                    <span className="font-fraunces text-2xl font-black text-(--accent-mint) italic">
                        you
                    </span>{' '}
                    and that align with your goals, constraints, and
                    preferences. The more you use it, the smarter it gets.
                </p>
                <p className="text-muted-foreground text-center text-lg">
                    It learns from{' '}
                    <span className="font-fraunces text-2xl font-black text-(--accent-mint) italic">
                        your choices, your feedback, and your outcomes
                    </span>{' '}
                    to provide better suggestions over time.
                </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {FEATURES.map((feature, index) => (
                    <SureLoadingCard
                        key={'feature-' + index}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        level={feature.level}
                    />
                ))}
            </div>
        </section>
    );
};

SureFeatures.displayName = 'SureFeatures';

export default SureFeatures;
