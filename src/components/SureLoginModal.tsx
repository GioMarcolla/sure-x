'use client';

import SureLoginForm from '@/components/auth/SureLoginForm';
import SureModal from '@/components/ui/SureModal';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

type SureLoginModalProps = HTMLAttributes<HTMLElement> & {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (isOpen: boolean) => void;
};

const SureLoginModal = ({
    isLoginModalOpen,
    setIsLoginModalOpen,
}: SureLoginModalProps) => {
    const router = useRouter();

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        router.push('/haze-map');
    };

    const handleLoginModalClose = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <SureModal
            isOpen={isLoginModalOpen}
            onClose={handleLoginModalClose}
            showConfirmButton={false}
            showCloseButton={false}
            title="Login"
        >
            <SureLoginForm onSuccess={handleLoginSuccess} />
        </SureModal>
    );
};

SureLoginModal.displayName = 'SureLoginModal';

export default SureLoginModal;