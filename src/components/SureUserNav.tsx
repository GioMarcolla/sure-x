'use client';

import { UserType, useUserStore } from '@/store/user.store';
import { FC, HTMLAttributes, ReactElement, useState } from 'react';
import SureButton from '@/components/ui/SureButton';
import SureUserAvatarWithMenu from '@/components/SureUserAvatarWithMenu';
import SureLoginModal from '@/components/SureLoginModal';
import SureRegisterModal from '@/components/SureRegisterModal';
import { cn } from '@/lib/tailwind.utils';
import SureThemeButton from '@/components/home/SureThemeButton';
import useIsMobile from '@/hooks/useIsMobile';

type SureUserNavProps = HTMLAttributes<HTMLDivElement> & {};

const SureUserNav: FC<SureUserNavProps> = ({
    className,
    ...props
}): ReactElement => {
    const user: UserType | null = useUserStore((store) => store.user);
    const isMobile: boolean = useIsMobile();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] =
        useState<boolean>(false);

    return (
        <>
            <SureLoginModal
                isLoginModalOpen={isLoginModalOpen}
                setIsLoginModalOpen={setIsLoginModalOpen}
            />

            <SureRegisterModal
                isRegisterModalOpen={isRegisterModalOpen}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
            />
            {user ? (
                <div
                    className={cn(
                        'flex gap-4',
                        isMobile
                            ? 'flex-row-reverse justify-between! gap-0!'
                            : 'flex-row',
                        'md:justify-between md:gap-4',
                        className
                    )}
                    {...props}
                >
                    <SureUserAvatarWithMenu user={user || ({} as UserType)} />
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
                    <SureButton
                        className="p-0! text-base text-(--accent-contrast) transition-transform hover:scale-[1.02]"
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
                    </SureButton>
                    <SureThemeButton
                        className={cn(
                            'absolute top-0 left-0 border border-(--card-border) bg-(--glass-bg) shadow-sm backdrop-blur-sm',
                            'md:relative'
                        )}
                    />
                </div>
            )}
        </>
    );
};

SureUserNav.displayName = 'SureUserNav';

export default SureUserNav;
