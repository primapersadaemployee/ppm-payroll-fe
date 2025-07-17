import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "keep-react";
import { FloppyDisk } from "phosphor-react";
import { useEditCompanyAccountStore } from "../../../store/settings/EditCompanyAccountStore";

export default function EditCompanyAccountModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleEditCompanyAccount,
    resetForm,
  } = useEditCompanyAccountStore();

  const handleModalSuccess = () => {
    const success = handleEditCompanyAccount();
    if (success) {
      setIsFirstModalOpen(false);
      setIsSecondModalOpen(true);
    }
  };

  return (
    <Modal
      open={isFirstModalOpen}
      onClose={() => {
        setIsFirstModalOpen(false);
        resetForm();
      }}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Edit Rekening Perusahaan
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data rekening perusahaan dibawah ini.
            </ModalDescription>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={() => {
                  setIsFirstModalOpen(false);
                  resetForm();
                }}
              >
                Kembali
              </Button>
              <Button
                type="button"
                className="flex items-center gap-2 font-poppins whitespace-nowrap bg-primary hover:bg-primary text-white font-medium"
                onClick={handleModalSuccess}
              >
                <FloppyDisk size={19} color="#FFFFFF" weight="bold" />
                Simpan
              </Button>
            </div>
          </div>
          <form
            id="edit-company-account"
            name="edit-company-account"
            className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
          >
            <div>
              <label htmlFor="nama" className="block text-sm font-medium mb-2">
                Nama Bank
              </label>
              <Input
                id="nama"
                name="nama"
                placeholder="Nama Bank"
                value={formData.nama}
                onChange={(e) => handleInputChange("nama", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="norek" className="block text-sm font-medium mb-2">
                Nomor Rekening Bank
              </label>
              <Input
                id="norek"
                name="norek"
                type="number"
                placeholder="Nomor Rekening Bank"
                value={formData.norek}
                onChange={(e) => handleInputChange("norek", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="pemegangRekening"
                className="block text-sm font-medium mb-2"
              >
                Nama Pemegang Rekening
              </label>
              <Input
                id="pemegangRekening"
                name="pemegangRekening"
                placeholder="Nama Pemegang Rekening"
                value={formData.pemegangRekening}
                onChange={(e) =>
                  handleInputChange("pemegangRekening", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="kantorCabang"
                className="block text-sm font-medium mb-2"
              >
                Kantor Cabang Bank
              </label>
              <Input
                id="kantorCabang"
                name="kantorCabang"
                placeholder="Kantor Cabang Bank"
                value={formData.kantorCabang}
                onChange={(e) =>
                  handleInputChange("kantorCabang", e.target.value)
                }
              />
            </div>
          </form>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
