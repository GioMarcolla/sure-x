'use client';

import { UserType, useUserStore } from '@/store/user.store';
import { FC, HTMLAttributes, ReactElement, useState } from 'react';
import SureButton from '@/components/SureButton';
import SureUserAvatarWithMenu from '@/components/SureUserAvatarWithMenu';
import SureLoginModal from '@/components/SureLoginModal';
import SureRegisterModal from '@/components/SureRegisterModal';
import SureThemeButton from '@/components/SureThemeButton';

type SureUserNavProps = HTMLAttributes<HTMLElement> & {};

const SureUserNav: FC<SureUserNavProps> = (): ReactElement => {
    const user: UserType | null = useUserStore((store) => store.user);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] =
        useState<boolean>(false);

    return (
        <div className="ml-auto flex shrink-0 items-center justify-end gap-3 md:gap-6">
            {user ? (
                <SureUserAvatarWithMenu user={user} />
            ) : (
                <div className="flex items-center gap-3 md:gap-6">
                    <SureButton
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
                    </SureButton>
                </div>
            )}
            <SureThemeButton className="border border-(--card-border) bg-(--glass-bg) shadow-sm backdrop-blur-sm" />

            <SureLoginModal
                isLoginModalOpen={isLoginModalOpen}
                setIsLoginModalOpen={setIsLoginModalOpen}
            />

            <SureRegisterModal
                isRegisterModalOpen={isRegisterModalOpen}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
            />
        </div>
    );
};

SureUserNav.displayName = 'SureUserNav';

export default SureUserNav;
