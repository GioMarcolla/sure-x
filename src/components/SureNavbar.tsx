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
} from 'lucide-react';

type MENU_ITEM = {
    label: string;
    href: string;
    icon: LucideIcon;
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
] as const;

type SureNavbarProps = HTMLAttributes<HTMLDivElement> & {};

const SureNavbar: FC<SureNavbarProps> = ({
    className,
    ...props
}): ReactElement => {
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
                'md:flex-row md:gap-8 md:text-base',
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    'flex w-full grow justify-between items-center',
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
                        'grid grow grid-cols-2 grid-rows-2 items-center justify-center gap-px bg-(--border-color)',
                        'md:flex md:flex-row md:gap-8 md:bg-transparent'
                    )}
                >
                    {MENU_ITENS.map((item, index) => {
                        return (
                            <Link
                                key={'nav-menu-item-' + index}
                                href={item.href}
                                className={cn(
                                    `row-start-${Math.floor(index / 2)} col-start-${index % 2}`,
                                    'flex aspect-square flex-col items-center justify-center gap-4 bg-(--bg) px-4 py-2 text-base text-(--ink-muted) transition-colors',
                                    'md:aspect-auto md:flex-row md:justify-center md:gap-2',
                                    'hover:text-(--accent-strong)'
                                )}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
                <SureUserNav />
            </div>
        </nav>
    );
};

SureNavbar.displayName = 'SureNavbar';

export default SureNavbar;
