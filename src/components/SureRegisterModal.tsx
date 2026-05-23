'use client';

import SureModal from '@/components/ui/SureModal';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';
import SureRegisterForm from '@/components/auth/SureRegisterForm';

type SureRegisterModalProps = HTMLAttributes<HTMLElement> & {
    isRegisterModalOpen: boolean;
    setIsRegisterModalOpen: (isOpen: boolean) => void;
};

const SureRegisterModal = ({
    isRegisterModalOpen,
    setIsRegisterModalOpen,
}: SureRegisterModalProps) => {
    const router = useRouter();

    const handleRegisterSuccess = () => {
        setIsRegisterModalOpen(false);
        router.push('/haze-map');
    };

    const handleRegisterModalClose = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <SureModal
            isOpen={isRegisterModalOpen}
            onClose={handleRegisterModalClose}
            showConfirmButton={false}
            showCloseButton={false}
            title="Register"
        >
            <SureRegisterForm onSuccess={handleRegisterSuccess} />
        </SureModal>
    );
};

SureRegisterModal.displayName = 'SureRegisterModal';

export default SureRegisterModal;
