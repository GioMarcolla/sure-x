import { cn } from '@/lib/tailwind.utils';
import { FC, InputHTMLAttributes } from 'react';

type SureInputProps = InputHTMLAttributes<HTMLInputElement> & {};

const SureInput: FC<SureInputProps> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                'h-full max-w-lg grow rounded-xl border border-(--border-color) bg-(--bg-strong) p-3 text-base text-(--ink)',
                'shadow-[0_4px_0_color-mix(in_srgb,var(--border-color),black_10%)]',
                'focus:border-(--accent-contrast) focus:outline-none focus:shadow-[0_4px_0_color-mix(in_srgb,var(--accent-contrast),black_10%)]',
                'disabled:opacity-50',
                className
            )}
            {...props}
        />
    );
};

SureInput.displayName = 'SureInput';

export default SureInput;
