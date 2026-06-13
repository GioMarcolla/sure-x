'use client';

import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement, SubmitEvent, useState } from 'react';
import SureBasicCard from '@/components/ui/SureBasicCard';
import SureButton from '@/components/ui/SureButton';
import SureInput from '@/components/ui/SureInput';

type SureNewsSignUpProps = HTMLAttributes<HTMLDivElement> & {};

const SureNewsSignUp: FC<SureNewsSignUpProps> = ({
    className,
    ...props
}): ReactElement => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
                setName('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <section
            id="sign-up"
            className={cn('mt-16 pt-16', className)}
            {...props}
        >
            <SureBasicCard className="flex flex-col items-center gap-8 p-16">
                <h2 className="text-5xl font-black italic sm:text-6xl md:text-7xl">
                    Sign up for the latest news!
                </h2>
                <p className="mt-2 text-base text-(--ink-muted) md:text-lg">
                    Be the first to know about our launch, updates, and
                    exclusive content. Join our community of adventurers today!
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex w-full max-w-[70%] flex-col items-center justify-center gap-4 lg:flex-row"
                >
                    <SureInput
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        disabled={status === 'loading'}
                    />
                    <SureInput
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        disabled={status === 'loading'}
                    />
                    <SureButton
                        type="submit"
                        disabled={status === 'loading'}
                        className="h-full min-w-16 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {status === 'loading' ? '...' : 'Sign Up NOW!'}
                    </SureButton>
                </form>

                {status !== 'idle' && status !== 'loading' && (
                    <p
                        className={cn(
                            'text-lg font-medium',
                            status === 'success'
                                ? 'text-(--accent-mint)'
                                : 'text-(--error)'
                        )}
                    >
                        {message}
                    </p>
                )}
            </SureBasicCard>
        </section>
    );
};

SureNewsSignUp.displayName = 'SureNewsSignUp';

export default SureNewsSignUp;
