import { FC, HTMLAttributes, ReactElement } from 'react';
import SurePill from '@/components/SurePill';
import Image from 'next/image';
import { Map, Sparkles } from 'lucide-react';
import SureHeroButtons from '@/components/home/SureHeroButtons';
import { cn } from '@/lib/tailwind.utils';

type SureHeroProps = HTMLAttributes<HTMLDivElement> & {};

const SureHero: FC<SureHeroProps> = (): ReactElement => {
    return (
        <section
            className={cn(
                'mt-32 flex w-full flex-col items-center gap-16',
                'lg:flex-row'
            )}
        >
            <div className="flex flex-1 grow flex-col gap-8 px-4">
                <div className="flex w-full flex-row justify-center gap-4">
                    <SurePill text="SurePlay AI!" glow icon={Sparkles} />
                    <SurePill
                        text="Decision Mapping"
                        tint="mint"
                        glow
                        icon={Map}
                    />
                </div>
                <div className="text-center">
                    <h1 className="text-7xl font-black">
                        <div className="text-6xl font-black">
                            It's Time to Level Up
                        </div>
                        <div className="font-fraunces text-(--accent) italic">
                            Your Life Path
                        </div>
                    </h1>
                    <p className="mt-4 text-lg text-(--ink-muted) sm:text-xl md:text-2xl">
                        A living decision map that branches with you—playful,
                        clear, and powered by adaptive AI that learns from every
                        choice and retry.
                    </p>
                </div>
                <div>
                    <SureHeroButtons />
                </div>
            </div>
            <div
                className="w-full flex-1 grow overflow-hidden rounded-4xl border-2 border-(--border-color)"
                style={{
                    boxShadow: '0 0 60px 5px var(--border-color)',
                }}
            >
                <Image
                    src="/images/hero-hazemap-landing.png"
                    alt="Colorful isometric decision map worlds in light and dark moods"
                    width={900}
                    height={900}
                    priority
                    className={cn(
                        'aspect-square h-full w-full object-cover',
                        'md:aspect-video'
                    )}
                />
            </div>
        </section>
    );
};

SureHero.displayName = 'SureHero';

export default SureHero;
