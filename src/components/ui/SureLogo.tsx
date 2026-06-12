import Image from 'next/image';
import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement } from 'react';

type SureLogoProps = HTMLAttributes<HTMLDivElement> & {};

/**
 * A component that renders the SurePlay logo.
 * @param {SureLogoProps} props - The props object.
 * @param {string} [props.className] - Additional CSS classes to be applied to the container element.
 * @returns {ReactElement} - The rendered SurePlay logo component.
 */
const SureLogo: FC<SureLogoProps> = ({ className, ...props }): ReactElement => {
    return (
        <div
            className={cn(
                'flex h-fit w-fit flex-row items-center justify-center gap-1',
                className
            )}
            {...props}
        >
            <div className="h-fit">
                <Image
                    src="/images/SURE_LOGO.jpeg"
                    alt="SurePlay Logo"
                    className="aspect-square h-8 min-h-8 w-8 min-w-8 object-contain"
                    loading="eager"
                    fetchPriority="high" // Above the folde
                    aria-description="SurePlay Logo"
                    width={300}
                    height={300}
                    priority
                />
            </div>
            <h1 className="space_grotesk flex items-center p-0 text-lg/3.5 font-black">
                <div className="flex flex-col">
                    <span>Sure</span>
                    <span>Play</span>
                </div>
                <span className="text-4xl text-(--ink)">!</span>
            </h1>
        </div>
    );
};

SureLogo.displayName = 'SureLogo';

export default SureLogo;
