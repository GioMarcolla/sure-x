import { cn } from '@/lib/tailwind.utils';
import { MapPin, PartyPopper } from 'lucide-react';
import { FC, HTMLAttributes, ReactElement } from 'react';

type SureQuestPathArtProps = HTMLAttributes<HTMLDivElement> & {};

const SureQuestPathArt: FC<SureQuestPathArtProps> = ({
    className,
}): ReactElement => {
    return (
        <div
            className={cn(
                'relative flex h-full min-h-100 min-w-100 w-full items-center justify-center overflow-hidden rounded-4xl border-2 border-(--border-color) backdrop-blur-lg',
                className
            )}
        >
            <div
                className="absolute inset-6 rounded-3xl bg-linear-to-b from-(--accent)/12 via-transparent to-(--accent-contrast)/10 opacity-80"
                aria-hidden
            />
            <svg
                className="relative z-1 h-[90%] w-full max-w-md text-(--accent)"
                viewBox="0 0 320 420"
                fill="none"
                aria-hidden
            >
                <path
                    className="quest-path-line"
                    d="M 60 40 C 120 90, 40 160, 100 210 S 240 260, 200 320 S 80 380, 160 400"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity={0.9}
                />
            </svg>
            <div className="pointer-events-none absolute top-[10px] left-[calc(50%-165px)] z-2 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-(--border-color) bg-(--accent-warm) object-center text-(--ink) shadow-lg">
                <MapPin className="h-6 w-6" aria-hidden />
            </div>
            <div className="pointer-events-none absolute bottom-[10px] left-1/2 z-2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border-2 border-(--border-color) bg-(--accent-contrast) text-(--ink) shadow-lg">
                <PartyPopper className="h-7 w-7" aria-hidden />
            </div>
        </div>
    );
};

SureQuestPathArt.displayName = 'SureQuestPathArt';

export default SureQuestPathArt;
