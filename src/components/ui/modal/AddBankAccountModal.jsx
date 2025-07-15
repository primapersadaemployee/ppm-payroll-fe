import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalHeader,
  ModalDescription,
  ModalTitle,
} from "keep-react";
import { useAddEmployeeStore } from "../../../store/employee/AddEmployeStore";

export default function AddBankAccountModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    handleInputChange,
    handleAddAccount,
  } = useAddEmployeeStore();

  return (
    <Modal
      open={isFirstModalOpen}
      onClose={() => setIsFirstModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Tambah Nomor Rekening
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data rekening dibawah ini.
            </ModalDescription>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={() => setIsFirstModalOpen(false)}
              >
                Kembali
              </Button>
              <Button
                type="button"
                className="flex items-center gap-2 font-poppins whitespace-nowrap bg-primary hover:bg-primary text-white font-medium"
                onClick={handleAddAccount}
              >
                Tambahkan
              </Button>
            </div>
          </div>
          <div className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins">
            <div>
              <label
                htmlFor="namaBank"
                className="block text-sm font-medium mb-2"
              >
                Nama Bank <span className="text-red-500">*</span>
              </label>
              <Input
                id="namaBank"
                name="namaBank"
                placeholder="Nama Bank"
                value={formData.namaBank}
                onChange={(e) => handleInputChange("namaBank", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="cabangBank"
                className="block text-sm font-medium mb-2"
              >
                Cabang Bank <span className="text-red-500">*</span>
              </label>
              <Input
                id="cabangBank"
                name="cabangBank"
                placeholder="Cabang Bank"
                value={formData.cabangBank}
                onChange={(e) =>
                  handleInputChange("cabangBank", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="namaPemilikRekening"
                className="block text-sm font-medium mb-2"
              >
                Nama Pemilik Rekening <span className="text-red-500">*</span>
              </label>
              <Input
                id="namaPemilikRekening"
                name="namaPemilikRekening"
                placeholder="Nama Pemilik Rekening"
                value={formData.namaPemilikRekening}
                onChange={(e) =>
                  handleInputChange("namaPemilikRekening", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="nomorRekening"
                className="block text-sm font-medium mb-2"
              >
                Nomor Rekening Bank <span className="text-red-500">*</span>
              </label>
              <Input
                id="nomorRekening"
                name="nomorRekening"
                type="number"
                placeholder="Nomor Rekening Bank"
                value={formData.nomorRekening}
                onChange={(e) =>
                  handleInputChange("nomorRekening", e.target.value)
                }
              />
            </div>
          </div>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
