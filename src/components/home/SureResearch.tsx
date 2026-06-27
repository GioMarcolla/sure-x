import { cn } from '@/lib/tailwind.utils';
import { ArrowRight } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureVuca from '@/components/home/SureVuca';

type SureResearchProps = HTMLAttributes<HTMLElement> & {};

const SureResearch: FC<SureResearchProps> = ({
    className,
    ...props
}): ReactElement => {
    return (
        <section
            id="research"
            className={cn(
                'mt-16 flex flex-col items-center gap-8 px-32 pt-32',
                className
            )}
            {...props}
        >
            <h2 className="group flex w-full items-center justify-center gap-4 text-center text-5xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Research & Development
            </h2>
            <p className="mt-4 text-lg text-(--ink-muted) sm:text-xl md:text-2xl">
                SurePlay builds solutions to address the challenges of VUCA. Our
                team of researchers and developers are working tirelessly to
                bring the future of decision-making to life. By breaking down
                complex problems into manageable steps, we empower individuals
                and organizations to navigate uncertainty with confidence and
                agility.
            </p>
            <SureVuca />
        </section>
    );
};

SureResearch.displayName = 'SureResearch';

export default SureResearch;
