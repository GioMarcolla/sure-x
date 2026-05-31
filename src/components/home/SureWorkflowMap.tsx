import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureQuestPathArt from '@/components/home/SureQuestPathArt';
import SureStep, { STEP } from '@/components/home/SureStep';
import {
    CpuIcon,
    Footprints,
    NetworkIcon,
    TargetIcon,
    TrendingUpIcon,
} from 'lucide-react';
import SurePill from '@/components/SurePill';

const STEPS: Array<STEP> = [
    {
        stepNumber: 1,
        title: 'Initial decision point',
        description:
            'Plant a single fork in the road. We capture context and mint your first node.',
        icon: TargetIcon,
    },
    {
        stepNumber: 2,
        title: 'Map expansion',
        description:
            'Branches sprout as you explore. Nothing is &ldquo;wrong path&rdquo;&mdash;just alternate quests.',
        icon: NetworkIcon,
    },
    {
        stepNumber: 3,
        title: 'Continuous learning',
        description:
            'Outcomes become training signals. The tone stays friendly, the hints get sharper.',
        icon: CpuIcon,
    },
    {
        stepNumber: 4,
        title: 'Optimized outcomes',
        description:
            'Over time, the map steers you toward moves that feel obvious—after you see them.',
        icon: TrendingUpIcon,
    },
];

type SureWorkflowMapProps = HTMLAttributes<HTMLDivElement> & {};

const SureWorkflowMap: FC<SureWorkflowMapProps> = (): ReactElement => {
    return (
        <section className="mt-32 flex w-full flex-col items-center justify-center gap-8">
            <div>
                <SurePill text="A Journey" icon={Footprints} glow tint="mint" />
            </div>
            <h2
                className={cn(
                    'flex flex-col justify-center align-middle items-baseline gap-4 text-center text-5xl font-extrabold',
                    'md:flex-row md:text-6xl'
                )}
            >
                <span>How your</span>{' '}
                <span
                    className={cn(
                        'font-fraunces text-7xl text-(--accent-contrast) italic',
                        'lg:text-8xl'
                    )}
                >
                    decisions
                </span>{' '}
                <span>level up!</span>
            </h2>
            <p className="text-lg text-(--ink-muted) sm:text-xl">
                From a single choice to an ever-growing map! Every choice you make
                evolves in a playful, adaptive adventure that delivers insights and 
                results faster and better than you ever!
            </p>
            <div className={cn('flex flex-col gap-16', 'lg:flex-row')}>
                <SureQuestPathArt className="flex-1" />
                <div className="flex h-full grow flex-col gap-4">
                    {STEPS.map((step) => (
                        <SureStep
                            key={step.stepNumber}
                            stepNumber={step.stepNumber}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

SureWorkflowMap.displayName = 'SureWorkflowMap';

export default SureWorkflowMap;
