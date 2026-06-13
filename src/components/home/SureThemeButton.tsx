'use client';

import { useState, useEffect, HTMLAttributes, FC } from 'react';
import SureBasicButton from '@/components/ui/SureBasicButton';
import { cn } from '@/lib/tailwind.utils';

const SunIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className={className}
    >
        <circle cx={12} cy={12} r={4} />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
);

const MoonIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className={className}
    >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
);

type SureThemeButtonProps = HTMLAttributes<HTMLButtonElement> & {};

const SureThemeButton: FC<SureThemeButtonProps> = ({ className, ...props }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);

        document.documentElement.classList.remove(next ? 'light' : 'dark');
        document.documentElement.classList.add(next ? 'dark' : 'light');

        // Set cookie (expires in 1 year) + localStorage
        document.cookie = `theme=${next ? 'dark' : 'light'};path=/;max-age=31536000`;
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <SureBasicButton
            type="button"
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className={cn(
                'bg-bg hover:bg-bg-strong text-ink focus:ring-accent inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent transition focus:ring-2 focus:outline-none',
                className
            )}
            title={isDark ? 'Light mode' : 'Dark mode'}
            {...props}
        >
            <span className="sr-only">Toggle theme</span>
            {isDark ? (
                <MoonIcon className="text-accent h-5 w-5" />
            ) : (
                <SunIcon className="text-accent h-5 w-5" />
            )}
        </SureBasicButton>
    );
};

SureThemeButton.displayName = 'SureThemeButton';

export default SureThemeButton;
