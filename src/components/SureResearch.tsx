import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement } from 'react';

type SureResearchProps = HTMLAttributes<HTMLElement> & {};

const SureResearch: FC<SureResearchProps> = ({
    className,
    ...props
}): ReactElement => {
    return (
        <section
            id="research"
            className={cn(
                'mt-16 flex flex-col items-center gap-8 pt-16 px-32',
                className
            )}
            {...props}
        >
            <h2 className="w-full text-center text-5xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Research & development
            </h2>
            <p className="w-full text-center text-lg text-(--ink-muted)">
                SurePlay builds solutions to address the challenges of VUCA. Our
                team of researchers and developers are working tirelessly to
                bring the future of decision-making to life. By breaking down
                complex problems into manageable steps, we empower individuals
                and organizations to navigate uncertainty with confidence and
                agility.
            </p>
        </section>
    );
};

SureResearch.displayName = 'SureResearch';

export default SureResearch;
