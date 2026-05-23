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
const SureLogo: FC<SureLogoProps> = ({ className }): ReactElement => {
    return (
        <div
            className={cn(
                'flex h-fit w-fit flex-row items-center justify-center gap-1',
                className
            )}
        >
            <div
                className="h-fit"
                style={{ boxShadow: '0 0 30px var(--accent)' }}
            >
                <Image
                    src="/images/SURE_LOGO.jpeg"
                    alt="SurePlay Logo"
                    className="h-8 w-8"
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
                    <span
                        style={{
                            textShadow: '0 0 10px var(--accent-contrast)',
                        }}
                    >
                        Sure
                    </span>
                    <span
                        style={{
                            textShadow: '0 0 10px var(--accent-contrast)',
                        }}
                    >
                        Play
                    </span>
                </div>
                <span
                    className="text-4xl text-(--accent)"
                    style={{
                        color: 'var(--accent)',
                        textShadow: '0 0 30px var(--accent)',
                    }}
                >
                    !
                </span>
            </h1>
        </div>
    );
};

SureLogo.displayName = 'SureLogo';

export default SureLogo;
