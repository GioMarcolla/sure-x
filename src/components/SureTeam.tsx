import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes } from 'react';

type SureTeamProps = HTMLAttributes<HTMLDivElement> & {};

const SureTeam: FC<SureTeamProps> = ({ className, ...props }) => {
    return (
        <section
            className={cn(
                'mt-16 flex flex-col items-center gap-6 pt-16',
                className
            )}
            {...props}
        >
            <h2 className="text-7xl font-bold tracking-tight sm:text-5xl">
                Meet the team
            </h2>
            <p className="max-w-2xl text-center text-lg text-(--ink-muted)">
                A band of misfits, rebels, and visionaries on a mission to
                reinvent how we learn, create, and grow with AI.
            </p>
            <div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
};
