'use client';

import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement, useState } from 'react';
import SureBasicCard from '@/components/ui/SureBasicCard';
import SureButton from '@/components/ui/SureButton';
import SureInput from '@/components/ui/SureInput';
import SureRotatingBackground from '../ui/SureRotatingBackground';
import SureForm, { SubmitResultType } from '../SureForm';
import SureNestedInputs from '../ui/SureNestedInputs';
import newsSignupSchema from '@/lib/schema/newsSignup.vSchema';

const FORM_ID: string = 'home-news-signup-form';

type SureNewsSignUpProps = HTMLAttributes<HTMLDivElement> & {};

const SureNewsSignUp: FC<SureNewsSignUpProps> = ({
    className,
    ...props
}): ReactElement => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

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
        <SureNestedInputs>
            <SureInput
                id={FORM_ID + '-name'}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                aria-autocomplete="both"
                autoComplete="name"
                rule={newsSignupSchema.entries.name}
                required
            />
            <SureInput
                id={FORM_ID + '-email'}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                autoComplete="email"
                rule={newsSignupSchema.entries.email}
                required
            />
        </SureNestedInputs>,
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
            Sign Up NOW!
        </SureButton>
    );

    return (
        <section
            id="sign-up"
            className={cn('mt-32 pt-16', className)}
            {...props}
        >
            <SureBasicCard className="flex flex-col items-center gap-8 overflow-hidden p-32">
                <SureRotatingBackground />
                <h2
                    className={cn(
                        'text-5xl font-black italic',
                        'sm:text-6xl',
                        'md:text-7xl'
                    )}
                >
                    Sign up for the latest news!
                </h2>
                <p
                    className={cn(
                        'mt-2 text-base text-(--ink-muted)',
                        'md:text-lg'
                    )}
                >
                    Be the first to know about our launch, updates, and
                    exclusive content. Join our community of adventurers today!
                </p>

                <SureForm
                    id={FORM_ID}
                    submitHandler={handleSubmit}
                    className={cn('max-w-[70%]')}
                    submitBtn={submitBtn}
                    inputs={fields}
                />
            </SureBasicCard>
        </section>
    );
};

SureNewsSignUp.displayName = 'SureNewsSignUp';

export default SureNewsSignUp;
