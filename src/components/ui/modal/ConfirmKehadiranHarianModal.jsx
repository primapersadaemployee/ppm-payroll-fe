import { Check } from "phosphor-react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalDescription,
  ModalTitle,
  ModalFooter,
} from "keep-react";

export default function ConfirmKehadiranHarianModal({
  isSecondModalOpen,
  setIsSecondModalOpen,
}) {
  return (
    <Modal
      open={isSecondModalOpen}
      onClose={() => setIsSecondModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalContent className="max-w-[20rem] lg:max-w-[26rem]">
        <ModalHeader className="mb-6 flex flex-col items-center justify-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
              <Check size={20} color="#FFFFFF" weight="bold" />
            </div>
          </div>
          <div className="space-y-1 text-center font-poppins">
            <ModalTitle className="text-xl font-medium">
              Edit Kehadiran Harian Berhasil
            </ModalTitle>
            <ModalDescription className="text-sm text-[#455468]">
              Kehadiran Harian berhasil diubah
            </ModalDescription>
          </div>
        </ModalHeader>
        <ModalFooter className="justify-center">
          <Button
            type="button"
            onClick={() => setIsSecondModalOpen(false)}
            className="flex w-full items-center gap-2 font-poppins whitespace-nowrap bg-primary hover:bg-primary text-white font-medium"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
