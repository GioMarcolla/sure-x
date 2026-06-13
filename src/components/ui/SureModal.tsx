'use client';

import React, {
    FC,
    HTMLAttributes,
    memo,
    ReactElement,
    ReactNode,
    useEffect,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import SureBasicButton from '@/components/ui/SureBasicButton';
import { cn } from '@/lib/tailwind.utils';
import SureBasicCard from '@/components/ui/SureBasicCard';

type SureModalProps = HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    children: ReactNode;
    title?: string;
    showCloseButton?: boolean;
    showConfirmButton?: boolean;
    confirmText?: string;
    cancelText?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    preventScroll?: boolean;
};

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
};

const SureModal: FC<SureModalProps> = memo(
    ({
        isOpen,
        onClose,
        onConfirm,
        children,
        title,
        showCloseButton = true,
        showConfirmButton = false,
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        size = 'md',
        closeOnOverlayClick = true,
        preventScroll = true,
        className,
        ...props
    }): ReactElement | null => {
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);
            return () => setMounted(false);
        }, []);

        // Handle escape key
        useEffect(() => {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };

            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
            }

            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }, [isOpen, onClose]);

        // Handle scroll lock
        useEffect(() => {
            if (!isOpen || !preventScroll) return;

            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = original;
            };
        }, [isOpen, preventScroll]);

        if (!isOpen || !mounted) return null;

        const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (closeOnOverlayClick && e.target === e.currentTarget) {
                onClose();
            }
        };

        const modal = (
            <div
                className={cn(
                    'fixed inset-0 z-999 flex items-center justify-center',
                    'bg-black/50 p-4 backdrop-blur dark:bg-gray-950/70',
                    className
                )}
                onClick={handleOverlayClick}
                role="dialog"
                aria-modal="true"
                {...props}
            >
                <SureBasicCard
                    className={`animate-in w-full ${sizeClasses[size]} zoom-in-95 relative flex transform flex-col gap-8 rounded-2xl bg-(--bg) p-8 shadow-lg duration-200`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative flex items-center justify-center">
                        {title && (
                            <h2 className="text-4xl font-semibold text-(--ink)">
                                {title}
                            </h2>
                        )}
                        <SureBasicButton
                            type="button"
                            onClick={onClose}
                            className="transition-color absolute top-0 right-0 ml-auto rounded-full text-(--ink) hover:brightness-110"
                            aria-label="Close modal"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </SureBasicButton>
                    </div>

                    {/* Content */}
                    {children}

                    {/* Footer */}
                    {(showCloseButton || showConfirmButton) && (
                        <div className="flex justify-end gap-3 p-6 pt-0">
                            {showCloseButton && (
                                <SureBasicButton
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-(--ink) transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    {cancelText}
                                </SureBasicButton>
                            )}
                            {showConfirmButton && onConfirm && (
                                <SureBasicButton
                                    type="button"
                                    onClick={onConfirm}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    {confirmText}
                                </SureBasicButton>
                            )}
                        </div>
                    )}
                </SureBasicCard>
            </div>
        );

        return createPortal(modal, document.body); // portal to body to avoid z-index and stacking context issues
    }
);

SureModal.displayName = 'SureModal';

export default SureModal;
