import { FC, HTMLAttributes, ReactElement } from 'react';
import SurePill from '../SurePill';
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
import SureLoadingCard from '../ui/SureLoadingCards';

type CAPABILITY = {
    title: string;
    description: string;
    icon: LucideIcon;
    level: number; // 0-100
};

const CAPABILITIES: Array<CAPABILITY> = [
    {
        title: 'Adaptive learning',
        description:
            'Neural suggestions that get sharper as you log outcomes—especially the messy ones.',
        icon: BrainIcon,
        level: 86,
    },
    {
        title: 'Non-linear mapping',
        description:
            'Branch, backtrack, and remix routes without losing the thread of where you started.',
        icon: GitBranchIcon,
        level: 92,
    },
    {
        title: 'Mix & refine',
        description:
            'Retries are fuel. The map learns what to nudge next time a similar fork appears.',
        icon: TrendingUpIcon,
        level: 78,
    },
    {
        title: 'Node intelligence',
        description:
            'Each node carries its own mini-model of context so the whole web feels coherent.',
        icon: NetworkIcon,
        level: 81,
    },
    {
        title: 'Contextual memory',
        description:
            'Your goals, constraints, and language stick around—without turning into a boring CRM.',
        icon: LayersIcon,
        level: 88,
    },
    {
        title: 'Precision guidance',
        description:
            'Hints stay short and human: just enough direction to unblock the next real-world step.',
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
                'mt-16 pt-16 flex flex-col items-center justify-center gap-8',
                className
            )}
            {...props}
        >
            <SurePill text="Action deck" icon={CpuIcon} glow />
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Intelligence that evolves
            </h2>
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {CAPABILITIES.map((c, i) => (
                    <SureLoadingCard
                        title={c.title}
                        description={c.description}
                        icon={c.icon}
                        level={c.level}
                    />
                ))}
            </div>
        </section>
    );
};

SureFeatures.displayName = 'SureFeatures';

export default SureFeatures;
