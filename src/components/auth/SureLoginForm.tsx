'use client';

import { FC, HTMLAttributes, ReactElement, useState } from 'react';
import SureForm, { SubmitResultType } from '@/components/SureForm';
import SureButton from '@/components/ui/SureButton';
import { cn } from '@/lib/tailwind.utils';
import SureInput from '@/components/ui/SureInput';
import loginSchema from '@/lib/schema/login.vSchema';

const FORM_ID: string = 'home-news-signup-form';

type SureLoginFormProps = HTMLAttributes<HTMLElement> & {
    onSuccess?: () => void;
};

const SureLoginForm: FC<SureLoginFormProps> = ({ onSuccess }): ReactElement => {
    const [username, setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const handleSubmit = async (): Promise<SubmitResultType> => {
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
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
            id={FORM_ID + '-username'}
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            aria-autocomplete="both"
            autoComplete="username"
            rule={loginSchema.entries.username}
            label="Username"
            required
        />,
        <SureInput
            id={FORM_ID + '-password'}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            aria-autocomplete="both"
            autoComplete="current-password"
            rule={loginSchema.entries.password}
            label="Password"
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

SureLoginForm.displayName = 'SureLoginForm';

export default SureLoginForm;
