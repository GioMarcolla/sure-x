import { FC, HTMLAttributes, ReactElement } from 'react';
import SurePill from '@/components/ui/SurePill';
import Image from 'next/image';
import { Map, Sparkles } from 'lucide-react';
import SureHeroButtons from '@/components/home/SureHeroButtons';
import { cn } from '@/lib/tailwind.utils';
import SureBasicCard from '../ui/SureBasicCard';

type SureHeroProps = HTMLAttributes<HTMLDivElement> & {};

const SureHero: FC<SureHeroProps> = ({ className, ...props }): ReactElement => {
    return (
        <section
            id="hero"
            className={cn(
                'mt-16 flex w-full flex-col items-center gap-16 pt-32', 
                'lg:flex-row',
                className
            )}
            {...props}
        >
            <div className="flex flex-1 grow flex-col gap-8 px-4">
                <div
                    className={cn(
                        'mx-auto flex flex-col justify-center gap-4',
                        'sm:flex-row'
                    )}
                >
                    <SurePill text="SurePlay AI!" glow icon={Sparkles} />
                    <SurePill
                        text="Decision Mapping"
                        tint="mint"
                        glow
                        icon={Map}
                    />
                </div>
                <div className="text-center">
                    <h1 className="text-center">
                        It's Time to Level Up
                        <br />
                        <span
                            className={cn(
                                'font-fraunces text-7xl text-(--accent) italic',
                                'md:text-8xl'
                            )}
                        >
                            Your Life Path
                        </span>
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
            <SureBasicCard
                className="w-full flex-1 grow self-stretch overflow-hidden p-0"
                style={{
                    boxShadow: '0 0 60px 5px var(--border-color)',
                }}
            >
                <Image
                    src="/images/hero_img_03.jpg"
                    alt="Colorful isometric decision map worlds in light and dark moods"
                    width={2048}
                    height={1136}
                    priority
                    className={cn(
                        'aspect-square h-full w-full object-cover',
                        'md:aspect-video'
                    )}
                />
            </SureBasicCard>
        </section>
    );
};

SureHero.displayName = 'SureHero';

export default SureHero;
