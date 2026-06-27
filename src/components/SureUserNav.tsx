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
import { FileText, LogIn } from 'lucide-react';

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
                        'flex min-h-12 w-full grow-0 flex-row items-center gap-4',
                        'lg:w-fit lg:gap-8',
                        className
                    )}
                    {...props}
                >
                    <SureButton
                        className="p-0! text-base text-(--accent-contrast) transition-transform hover:scale-[1.02]"
                        onClick={() => setIsRegisterModalOpen(true)}
                        variant="ghost"
                    >
                        <div className="flex w-max items-center gap-2">
                            <FileText size={16} />
                            Get started
                        </div>
                    </SureButton>

                    <SureButton
                        className="flex p-0! text-base text-(--ink-muted) transition-colors hover:text-(--ink)"
                        onClick={() => setIsLoginModalOpen(true)}
                        variant="ghost"
                    >
                        <div className="flex w-max items-center gap-2">
                            <LogIn size={16} />
                            Sign in
                        </div>
                    </SureButton>
                    <SureThemeButton
                        className={cn(
                            'ml-auto border border-(--card-border) bg-(--glass-bg) shadow-sm backdrop-blur-sm',
                            'lg:m-0'
                        )}
                    />
                </div>
            )}
        </>
    );
};

SureUserNav.displayName = 'SureUserNav';

export default SureUserNav;
