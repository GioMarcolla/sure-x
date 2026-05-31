'use client';

import Link from 'next/link';
import { FC, HTMLAttributes, ReactElement, useEffect, useState } from 'react';
import SureLogo from '@/components/SureLogo';
import { cn } from '@/lib/tailwind.utils';
import SureUserNav from '@/components/SureUserNav';
import SureButton from '@/components/SureButton';
import { MenuIcon } from 'lucide-react';

type MENU_ITEM = {
    label: string;
    href: string;
};

const MENU_ITENS: Array<MENU_ITEM> = [
    {
        label: 'Features',
        href: '/#features',
    },
    {
        label: 'Pricing',
        href: '/#pricing',
    },
    {
        label: 'Team',
        href: '/#team',
    },
];

type SureNavbarProps = HTMLAttributes<HTMLDivElement> & {};

const SureNavbar: FC<SureNavbarProps> = (): ReactElement => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    useEffect(() => {
        const mql = window.matchMedia('(min-width: 768px)');

        if (mql.matches) setCollapsed(true);

        const handler = (e: MediaQueryListEvent) => {
            if (e.matches) setCollapsed(true);
        };

        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return (
        <nav
            className={cn(
                'my-4 flex w-full flex-col items-center justify-center gap-4 p-0 text-sm font-semibold',
                'md:flex-row md:gap-8 md:text-base'
            )}
        >
            <div
                className={cn(
                    'flex w-full grow justify-between',
                    'md:w-min md:grow-0'
                )}
            >
                <div>
                    <Link href="/">
                        <SureLogo />
                    </Link>
                </div>
                <SureButton
                    className={cn('md:hidden')}
                    onClick={() => setCollapsed((prev) => !prev)}
                >
                    <MenuIcon />
                </SureButton>
            </div>
            <div
                className={cn(
                    collapsed ? 'hidden' : 'flex',
                    'w-full grow flex-col-reverse',
                    'md:flex md:flex-row!'
                )}
            >
                <div
                    className={cn(
                        'flex grow flex-col items-center justify-center gap-0',
                        'md:flex-row md:gap-8'
                    )}
                >
                    {MENU_ITENS.map((item, index) => (
                        <Link
                            key={'nav-menu-item-' + index}
                            href={item.href}
                            className={cn(
                                'px-4 py-2 text-base text-(--ink-muted) transition-colors hover:text-(--accent-strong)'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <SureUserNav />
            </div>
        </nav>
    );
};

SureNavbar.displayName = 'SureNavbar';

export default SureNavbar;
