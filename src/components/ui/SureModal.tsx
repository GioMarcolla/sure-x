'use client';

import React, {
    FC,
    HTMLAttributes,
    memo,
    ReactElement,
    ReactNode,
} from 'react';
import SureBasicButton from './SureBasicButton';
import { cn } from '@/lib/tailwind.utils';

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
    }): ReactElement => {
        // Handle escape key
        React.useEffect(() => {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };

            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
                if (preventScroll) {
                    document.body.style.overflow = 'hidden';
                }
            }

            return () => {
                document.removeEventListener('keydown', handleEscape);
                if (preventScroll) {
                    document.body.style.overflow = 'unset';
                }
            };
        }, [isOpen, onClose, preventScroll]);

        if (!isOpen) return <></>;

        const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (closeOnOverlayClick && e.target === e.currentTarget) {
                onClose();
            }
        };

        return (
            <div
                className={cn(
                    'animate-in fade-in fixed inset-0 z-999 flex h-full w-full items-center justify-center bg-black/50 p-4 backdrop-blur duration-200 dark:bg-gray-950/70',
                    className
                )}
                onClick={handleOverlayClick}
                role="dialog"
                aria-modal="true"
                {...props}
            >
                <div
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
                                    onClick={onClose}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-(--ink) transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    {cancelText}
                                </SureBasicButton>
                            )}
                            {showConfirmButton && onConfirm && (
                                <SureBasicButton
                                    onClick={onConfirm}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    {confirmText}
                                </SureBasicButton>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

SureModal.displayName = 'SureModal';

export default SureModal;
