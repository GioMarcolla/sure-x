'use client';

import Link from 'next/link';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureLogo from '@/components/SureLogo';
import { cn } from '@/lib/tailwind.utils';
import SureUserNav from './SureUserNav';
import { usePathname } from 'next/navigation';

type SureHeaderProps = HTMLAttributes<HTMLElement> & {};

const SureHeader: FC<SureHeaderProps> = async (): Promise<ReactElement> => {
    const currentPath = usePathname();

    const getActiveClass = (path: string) => {
        return currentPath === path ? 'active' : '';
    };

    return (
        <header className="w-full h-16 flex items-center justify-between px-4 border-b">
            <nav className="navbar flex w-full flex-wrap items-center justify-start gap-4 px-4 py-3 text-sm font-semibold md:gap-8 md:px-8 md:py-4 md:text-base">
                <div className="navbar-logo shrink-0">
                    <Link
                        href="/"
                        className="flex items-center justify-between gap-1"
                    >
                        <SureLogo />
                    </Link>
                </div>
                <ul className="navbar-items flex flex-1 flex-wrap items-center justify-center gap-4 md:gap-8">
                    <li className="nav-item">
                        <Link
                            href="/#home-features"
                            className={cn(
                                'text-(--ink-muted) transition-colors hover:text-(--accent-strong)',
                                getActiveClass('/')
                            )}
                        >
                            Features
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/#account"
                            className={cn(
                                'text-(--ink-muted) transition-colors hover:text-(--accent-strong)',
                                getActiveClass('/pricing')
                            )}
                        >
                            Pricing
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/#haze-map-intro"
                            className={cn(
                                'text-(--ink-muted) transition-colors hover:text-(--accent-strong)',
                                getActiveClass('/team')
                            )}
                        >
                            Team
                        </Link>
                    </li>
                </ul>
                <SureUserNav />
            </nav>
        </header>
    );
};

export default SureHeader;
