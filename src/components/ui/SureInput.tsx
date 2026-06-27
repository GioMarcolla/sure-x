'use client';

import { cn } from '@/lib/tailwind.utils';
import {
    type FocusEvent as ReactFocusEvent,
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    memo,
    useCallback,
    useState,
} from 'react';
import { GenericSchema, safeParse } from 'valibot';

type SureInputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    autoComplete: AutoFillField;
    required?: boolean;
    rule: GenericSchema;
    validateOn?: 'blur' | 'change' | 'both';
};

const SureInput: FC<SureInputProps> = memo(
    ({
        id,
        autoComplete,
        required = false,
        rule,
        validateOn = 'both',
        className,
        onChange,
        onBlur,
        ...props
    }) => {
        const [error, setError] = useState<string | undefined>();

        const validate = useCallback(
            (value: string) => {
                const result = safeParse(rule, value);
                if (!result.success) {
                    setError(result.issues[0]?.message ?? 'Invalid value');
                } else {
                    setError(undefined);
                }
            },
            [rule]
        );

        const handleChange = useCallback(
            (ev: ChangeEvent<HTMLInputElement>) => {
                if (
                    ev.target.value &&
                    (validateOn === 'change' || validateOn === 'both')
                ) {
                    validate(ev.target.value);
                }
                onChange?.(ev);
            },
            [validateOn, validate, onChange]
        );

        const handleBlur = useCallback(
            (ev: ReactFocusEvent<HTMLInputElement>) => {
                if (
                    ev.target.value &&
                    (validateOn === 'blur' || validateOn === 'both')
                ) {
                    validate(ev.currentTarget.value);
                }
                onBlur?.(ev);
            },
            [validateOn, validate, onBlur]
        );

        return (
            <div className={cn('h-fit w-full', className)}>
                <input
                    id={id}
                    name={id}
                    key={id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete={autoComplete}
                    className={cn(
                        'h-full w-full max-w-lg grow rounded-xl border border-(--border-color) bg-(--bg-strong)! p-3 text-base text-(--ink)',
                        'shadow-[0_4px_0_color-mix(in_srgb,var(--border-color),black_10%)]',
                        'focus:border-(--accent-contrast) focus:shadow-[0_4px_0_color-mix(in_srgb,var(--accent-contrast),black_10%)] focus:outline-none',
                        'disabled:opacity-50',
                        error?.trim().length
                            ? 'border-(--error) shadow-[0_4px_0_color-mix(in_srgb,var(--error),black_10%)]'
                            : ''
                    )}
                    required={required}
                    aria-required={required}
                    aria-invalid={error?.trim().length ? 'true' : 'false'}
                    {...props}
                />
                <p
                    className={cn(
                        'm-auto w-fit pt-4 text-center text-sm text-(--error)'
                    )}
                >
                    {error}
                </p>
            </div>
        );
    }
);

SureInput.displayName = 'SureInput';

export default SureInput;
export { type SureInputProps };
