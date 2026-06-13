import { ButtonHTMLAttributes, FC, HTMLAttributes, ReactElement } from 'react';
import SureBasicButton from '@/components/ui/SureBasicButton';
import { cn } from '@/lib/tailwind.utils';

const VARIANTS: Record<string, string> = {
    primary:
        `relative min-h-[44px] px-8 py-2.5 text-base font-semibold tracking-tight text-(--text-negative) shadow-[0_4px_0_color-mix(in_srgb,var(--accent),black_20%)]
        transition-all duration-200 ease-out 
        active:translate-y-[2px] active:shadow-[0_2px_0_var(--accent-strong)]
        hover:bg-(--accent-contrast) hover:shadow-[0_4px_0_color-mix(in_srgb,var(--accent-contrast),black_20%)]`,
    secondary:
        'relative min-h-[44px] border border-(--border-color) bg-(--bg-strong) px-8 py-2.5 text-base font-semibold tracking-tight text-(--ink) shadow-[0_4px_0_var(--border-color-strong)] backdrop-blur-sm transition-all duration-200 hover:border-(--accent) hover:shadow-[0_4px_0_var(--accent-strong)] hover:text-(--accent-strong)',
    error: 'bg-(--error) px-8 py-2.5 text-base font-semibold text-(--text-negative) shadow-sm hover:opacity-95',
    'error-inline':
        'bg-(--error) px-4 py-1 text-xs font-medium text-(--text-negative) shadow-sm hover:opacity-95',
};

const PRIMARY_SURFACE =
    'rounded-[14px] bg-(--accent) before:pointer-events-none before:absolute before:inset-0 before:rounded-[14px] before:bg-gradient-to-b before:from-white/25 before:to-transparent before:opacity-40';

type SureButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof VARIANTS;
    size?: 'primary' | 'sm' | 'lg' | 'icon';
};

const SureButton: FC<SureButtonProps> = ({
    className,
    variant = 'primary',
    size = 'primary',
    children,
    ...props
}): ReactElement => {
    const isPrimary = variant === 'primary';

    return (
        <SureBasicButton
            className={cn(
                'inline-flex cursor-pointer items-center justify-center rounded-[14px] font-semibold',
                VARIANTS[variant],
                isPrimary && PRIMARY_SURFACE,
                props.disabled && 'pointer-events-none opacity-50 saturate-50',
                !props.disabled &&
                    variant === 'secondary' &&
                    'hover:-translate-y-0.5',
                !props.disabled && isPrimary && 'hover:-translate-y-0.5',
                {
                    'h-10 px-4 py-2': size === 'primary',
                    'h-9 rounded-md px-3': size === 'sm',
                    'h-11 rounded-md px-8': size === 'lg',
                    'h-10 w-10': size === 'icon',
                },
                className
            )}
            {...props}
        >
            <span className={cn('relative z-1', isPrimary && 'drop-shadow-sm')}>
                {children}
            </span>
        </SureBasicButton>
    );
};

SureButton.displayName = 'SureButton';

export default SureButton;
