'use client';

import { useState } from 'react';
import SureButton from '../SureButton';
import SureModal from '../ui/SureModal';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user.store';
import SureLoginForm from '../auth/SureLoginForm';
import SureRegisterForm from '../auth/SureRegisterForm';

const SureHeroButtons = () => {
    const router = useRouter();
    const user = useUserStore((store) => store.user);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] =
        useState<boolean>(false);

    const handleLoginModalClose = () => {
        setIsLoginModalOpen(false);
    };

    const handleRegisterModalClose = () => {
        setIsRegisterModalOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        router.push('/haze-map');
    };

    const handleRegisterSuccess = () => {
        setIsRegisterModalOpen(false);
        router.push('/onboarding');
    };

    const handlePrimaryClick = () => {
        if (user?.email) {
            router.push('/haze-map');
            // router.refresh()
        } else {
            setIsRegisterModalOpen(true);
        }
    };

    const handleSecondary = () => {
        if (user?.email) {
            router.push('/haze-map');
            // router.refresh()
        } else {
            setIsLoginModalOpen(true);
        }
    };

    return (
        <>
            <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
                {!user?.email && (
                    <SureButton onClick={handlePrimaryClick} className="h-full">
                        Start a new quest
                    </SureButton>
                )}
                <SureButton
                    variant="secondary"
                    onClick={handleSecondary}
                    className="h-full"
                >
                    {!user?.username ? 'Login to c' : 'C'}ontinue your adventure{' '}
                    {user?.username ? `(${user.username})` : ''}
                </SureButton>
            </div>
            <SureModal
                isOpen={isLoginModalOpen}
                onClose={handleLoginModalClose}
                showConfirmButton={false}
                showCloseButton={false}
                title="Login"
            >
                <SureLoginForm onSuccess={handleLoginSuccess} />
            </SureModal>
            <SureModal
                title="Register"
                isOpen={isRegisterModalOpen}
                onClose={handleRegisterModalClose}
                showConfirmButton={false}
                showCloseButton={false}
            >
                <SureRegisterForm onSuccess={handleRegisterSuccess} />
            </SureModal>
        </>
    );
};

SureHeroButtons.displayName = 'SureHeroButtons';

export default SureHeroButtons;
