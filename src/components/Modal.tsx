import React, { useEffect } from 'react';

interface ModalProps {
    children?: React.ReactNode;
    onClose?: () => void;
    isOpen: boolean;
    closeOnOutsideClick?: boolean;
    closeOnEsc?: boolean;
}

export const Modal = ({
    children,
    onClose,
    isOpen,
    closeOnOutsideClick = true,
    closeOnEsc = true
}: ModalProps) => {
    useEffect(() => {
        if (!closeOnEsc || !onClose) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, closeOnEsc]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-40"
                aria-hidden="true"
                onClick={closeOnOutsideClick ? onClose : undefined}
            />
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-lg shadow-xl z-50 w-full max-w-md"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {children}
            </div>
        </>
    );
};