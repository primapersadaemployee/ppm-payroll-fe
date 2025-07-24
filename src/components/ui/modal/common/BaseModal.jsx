import {
  Button,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "keep-react";
import { FloppyDisk } from "phosphor-react";

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  onSave,
}) {
  return (
    <Modal open={isOpen} onClose={onClose} showCloseIcon={false}>
      <ModalAction asChild></ModalAction>
      <ModalContent
        className={`max-w-md lg:max-w-[960px] overflow-auto max-h-[90vh]`}
      >
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              {title}
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data dibawah ini.
            </ModalDescription>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={onClose}
              >
                Kembali
              </Button>
              <Button
                type="button"
                className="flex items-center gap-2 font-poppins whitespace-nowrap bg-primary hover:bg-primary text-white font-medium"
                onClick={onSave}
              >
                <FloppyDisk size={19} color="#FFFFFF" weight="bold" />
                Simpan
              </Button>
            </div>
          </div>
          {children}
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
