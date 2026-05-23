import Link from 'next/link';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureLogo from '@/components/SureLogo';
import { cn } from '@/lib/tailwind.utils';
import SureUserNav from './SureUserNav';
import SureThemeButton from '@/components/SureThemeButton';

type SureHeaderProps = HTMLAttributes<HTMLElement> & {};

const SureHeader: FC<SureHeaderProps> = (): ReactElement => {
    return (
        <header className="flex w-full items-center justify-between border-b border-(--border-color-strong) px-[5%] backdrop-blur-lg">
            <nav className="navbar my-4 flex w-full flex-wrap items-center justify-center gap-4 p-0 text-sm font-semibold md:gap-8 md:text-base">
                <div>
                    <Link href="/">
                        <SureLogo />
                    </Link>
                </div>
                <ul className="navbar-items flex grow flex-wrap items-center justify-center gap-4 md:gap-8">
                    <li className="nav-item">
                        <Link
                            href="/#home-features"
                            className={cn(
                                'text-(--ink-muted) transition-colors hover:text-(--accent-strong)'
                            )}
                        >
                            Features
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/#account"
                            className={cn(
                                'text-(--ink-muted) transition-colors hover:text-(--accent-strong)'
                            )}
                        >
                            Pricing
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/#haze-map-intro"
                            className={cn(
                                'text-(--ink-muted) transition-colors hover:text-(--accent-strong)'
                            )}
                        >
                            Team
                        </Link>
                    </li>
                </ul>
                <SureUserNav />
                <SureThemeButton className="border border-(--card-border) bg-(--glass-bg) shadow-sm backdrop-blur-sm" />
            </nav>
        </header>
    );
};

export default SureHeader;
