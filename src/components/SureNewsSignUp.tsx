'use client';

import { cn } from '@/lib/tailwind.utils';
import { FC, HTMLAttributes, ReactElement, useState, FormEvent } from 'react';

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

    async function handleSubmit(e: FormEvent) {
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
    }

    return (
        <section
            id="sign-up"
            className={cn('mt-16 pt-16', className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-8 rounded-4xl border-2 border-(--border-color) p-16 backdrop-blur-lg">
                <h2 className="5xl sm:6xl font-black italic md:text-7xl">
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
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        disabled={status === 'loading'}
                        className="h-full max-w-lg grow rounded-lg border-2 border-(--border-color) bg-(--bg-strong) p-3 text-base text-(--ink) focus:ring-2 focus:ring-(--accent) focus:outline-none disabled:opacity-50"
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        disabled={status === 'loading'}
                        className="h-full max-w-lg grow rounded-lg border-2 border-(--border-color) bg-(--bg-strong) p-3 text-base text-(--ink) focus:ring-2 focus:ring-(--accent) focus:outline-none disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="h-full min-w-16 rounded-lg bg-(--accent) px-4 py-2 text-lg font-semibold text-(--ink-inverted) transition-colors hover:bg-(--accent-contrast) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {status === 'loading' ? '...' : 'Sign Up NOW!'}
                    </button>
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
            </div>
        </section>
    );
};

SureNewsSignUp.displayName = 'SureNewsSignUp';

export default SureNewsSignUp;
