'use client';

import Link from 'next/link';
import { FC, HTMLAttributes, ReactElement, useEffect, useState } from 'react';
import SureLogo from '@/components/ui/SureLogo';
import { cn } from '@/lib/tailwind.utils';
import SureUserNav from '@/components/SureUserNav';
import SureButton from '@/components/ui/SureButton';
import {
    Book,
    CircleQuestionMark,
    Home,
    LayoutGrid,
    LucideIcon,
    MenuIcon,
    Rss,
    ShieldUser,
} from 'lucide-react';

type MENU_ITEM = {
    label: string;
    href: string;
    icon?: LucideIcon;
};

const MENU_ITENS: Array<MENU_ITEM> = [
    {
        label: 'Home',
        href: '/#home',
        icon: Home,
    },
    {
        label: 'Research',
        href: '/#research',
        icon: Book,
    },
    {
        label: 'How it works',
        href: '/#how-it-works',
        icon: CircleQuestionMark,
    },
    {
        label: 'Features',
        href: '/#features',
        icon: LayoutGrid,
    },
    {
        label: 'News',
        href: '/#news-sign-up',
        icon: Rss,
    },
    {
        label: '#team',
        href: '/#team',
        icon: ShieldUser,
    },
] as const;

type SureNavbarProps = HTMLAttributes<HTMLDivElement> & {};

const SureNavbar: FC<SureNavbarProps> = ({
    className,
    ...props
}): ReactElement => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    useEffect(() => {
        const mql = window.matchMedia('(min-width: 1024px)');

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
                'lg:flex-row lg:gap-8 md:text-base',
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    'flex w-full grow items-center justify-between',
                    'lg:w-min lg:grow-0'
                )}
            >
                <div>
                    <Link href="/">
                        <SureLogo />
                    </Link>
                </div>
                <SureButton
                    className={cn('lg:hidden')}
                    onClick={() => setCollapsed((prev) => !prev)}
                >
                    <MenuIcon />
                </SureButton>
            </div>
            <div
                className={cn(
                    collapsed ? 'hidden' : 'flex',
                    'w-full grow flex-col-reverse',
                    'lg:flex lg:flex-row!'
                )}
            >
                <div
                    className={cn(
                        'grid grow w-full grid-cols-3 grid-rows-2 items-center justify-center gap-px bg-(--border-color)',
                        'md:grid-cols-6 md:grid-rows-1',
                        'lg:flex lg:flex-row lg:gap-4 lg:bg-transparent'
                    )}
                >
                    {MENU_ITENS.map((item, index) => {
                        return (
                            <Link
                                key={'nav-menu-item-' + index}
                                href={item.href}
                                className={cn(
                                    `row-start-${Math.floor(index / 2)} col-start-${index % 2}`,
                                    'flex aspect-square flex-col items-center justify-center gap-px bg-(--bg) px-4 py-2 text-sm text-(--ink-muted) transition-colors',
                                    'lg:aspect-auto lg:flex-row lg:justify-center lg:gap-2 lg:text-sm',
                                    'xl:text-base',
                                    'hover:text-(--accent-strong)'
                                )}
                            >
                                {item.icon ? <item.icon size={20} /> : null}
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
                <SureUserNav className='w-full' />
            </div>
        </nav>
    );
};

SureNavbar.displayName = 'SureNavbar';

export default SureNavbar;
