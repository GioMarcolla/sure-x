'use client';

import { UserType, useUserStore } from '@/store/user.store';
import { FC, HTMLAttributes, ReactElement, useState } from 'react';
import SureButton from '@/components/ui/SureButton';
import SureUserAvatarWithMenu from '@/components/SureUserAvatarWithMenu';
import SureLoginModal from '@/components/SureLoginModal';
import SureRegisterModal from '@/components/SureRegisterModal';
import { cn } from '@/lib/tailwind.utils';
import SureThemeButton from '@/components/home/SureThemeButton';
import Link from 'next/link';

type SureUserNavProps = HTMLAttributes<HTMLDivElement> & {};

const SureUserNav: FC<SureUserNavProps> = ({
    className,
    ...props
}): ReactElement => {
    const user: UserType | null = useUserStore((store) => store.user);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] =
        useState<boolean>(false);

    return (
        <>
            {user ? (
                <div
                    className={cn(
                        'flex flex-row gap-8',
                        'md:justify-between md:gap-0',
                        className
                    )}
                    {...props}
                >
                    <SureUserAvatarWithMenu user={user} />
                    <SureThemeButton className="border border-(--card-border) bg-(--glass-bg) shadow-sm backdrop-blur-sm" />
                </div>
            ) : (
                <div
                    className={cn(
                        'relative flex flex-col-reverse items-center gap-0',
                        'md:flex-row md:gap-8',
                        className
                    )}
                    {...props}
                >
                    <Link href="#sign-up" className="link hover:brightness-110 hover:text-shadow-[0_0_20px_color-mix(in_srgb,var(--accent-warm)_50%,transparent_50%)]">
                        <span className="font-fraunces text-base md:text-xl font-bold text-(--accent-warm) italic">
                            Sing up for the latest news!
                        </span>
                    </Link>
                    {/* <SureButton
                        className="hidden p-0! text-base text-(--accent-contrast) transition-transform hover:scale-[1.02] sm:inline"
                        onClick={() => setIsRegisterModalOpen(true)}
                        variant="ghost"
                    >
                        Get started
                    </SureButton>

                    <SureButton
                        className="p-0! text-base text-(--ink-muted) transition-colors hover:text-(--ink)"
                        onClick={() => setIsLoginModalOpen(true)}
                        variant="ghost"
                    >
                        Sign in
                    </SureButton> */}
                    <SureThemeButton
                        className={cn(
                            'absolute top-0 left-0 border border-(--card-border) bg-(--glass-bg) shadow-sm backdrop-blur-sm',
                            'md:relative'
                        )}
                    />
                </div>
            )}

            <SureLoginModal
                isLoginModalOpen={isLoginModalOpen}
                setIsLoginModalOpen={setIsLoginModalOpen}
            />

            <SureRegisterModal
                isRegisterModalOpen={isRegisterModalOpen}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
            />
        </>
    );
};

SureUserNav.displayName = 'SureUserNav';

export default SureUserNav;
