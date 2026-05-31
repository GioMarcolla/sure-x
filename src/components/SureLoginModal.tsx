'use client';

import SureLoginForm from '@/components/auth/SureLoginForm';
import SureModal from '@/components/ui/SureModal';
import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

type SureLoginModalProps = HTMLAttributes<HTMLDivElement> & {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (isOpen: boolean) => void;
};

const SureLoginModal: FC<SureLoginModalProps> = ({
    isLoginModalOpen,
    setIsLoginModalOpen,
    className,
}) => {
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
            className={className}
        >
            <SureLoginForm onSuccess={handleLoginSuccess} />
        </SureModal>
    );
};

SureLoginModal.displayName = 'SureLoginModal';

export default SureLoginModal;
