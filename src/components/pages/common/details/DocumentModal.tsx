import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { LuCheckCheck } from "react-icons/lu";

interface DocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewChanges: () => void;
    onFinalClose: () => void;
}

export const DocumentModal = ({
    isOpen,
    onClose,
    onViewChanges,
    onFinalClose
}: DocumentModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOutsideClick
            closeOnEsc
        >
            <div className="py-28 px-6">
                <div className="flex flex-col justify-center items-center gap-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                        <LuCheckCheck size={48} />
                    </div>
                    <h3 className="text-lg font-medium">
                        Document Updated Successfully!
                    </h3>
                    <p className="text-sm text-foreground/70">
                        The changes to your document have been saved.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        onClick={onViewChanges}
                    >
                        View Changes
                    </Button>
                    <Button
                        onClick={onFinalClose}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};