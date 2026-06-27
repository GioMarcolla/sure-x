'use client';

import { FC, HTMLAttributes, ReactElement, useState } from 'react';
import SureForm, { SubmitResultType } from '../SureForm';
import SureButton from '@/components/ui/SureButton';
import { cn } from '@/lib/tailwind.utils';
import SureInput from '../ui/SureInput';
import registerSchema from '@/lib/schema/register.vSchema';

const FORM_ID: string = 'home-news-signup-form';

type SureRegisterFormProps = HTMLAttributes<HTMLElement> & {
    onSuccess?: () => void;
};

const SureRegisterForm: FC<SureRegisterFormProps> = ({
    onSuccess,
}): ReactElement => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [confirmPassword, setConfirmPassword] = useState<
        string | undefined
    >();

    const handleSubmit = async (): Promise<SubmitResultType> => {
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
            });

            const data = await res.json();

            if (res.ok) {
                return { ok: true };
            } else {
                return { ok: false, error: 'Something went wrong' };
            }
        } catch {
            return { ok: false, error: 'Network error. Please try again.' };
        }
    };

    const fields = [
        <SureInput
            id={FORM_ID + '-email'}
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            aria-autocomplete="both"
            autoComplete="email"
            rule={registerSchema.entries.email}
            label='Username'
            required
        />,
        <SureInput
            id={FORM_ID + '-password'}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            aria-autocomplete="both"
            autoComplete="new-password"
            rule={registerSchema.entries.password}
            label='New password'
            required
        />,
        <SureInput
            id={FORM_ID + '-confirm-password'}
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            aria-autocomplete="both"
            autoComplete="new-password"
            rule={registerSchema.entries.passwordConfirm}
            label='Confirm password'
            required
        />,
    ];

    const submitBtn = (
        <SureButton
            id={FORM_ID + '-submit'}
            type="submit"
            className={cn(
                'h-full min-w-32 px-4 py-2',
                'disabled:cursor-not-allowed disabled:opacity-50'
            )}
        >
            Register
        </SureButton>
    );

    return (
        <SureForm
            id={FORM_ID}
            submitHandler={handleSubmit}
            inputs={fields}
            submitBtn={submitBtn}
            btnsPosition="bottom"
            className={cn('gap-4')}
        />
    );
};

SureRegisterForm.displayName = 'SureRegisterForm';

export default SureRegisterForm;
