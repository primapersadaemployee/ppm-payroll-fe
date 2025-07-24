import { Input } from "keep-react";
import { useEditCompanyAccountStore } from "../../../store/settings/EditCompanyAccountStore";
import BaseModal from "./common/BaseModal";

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
    <BaseModal
      isOpen={isFirstModalOpen}
      onClose={() => {
        setIsFirstModalOpen(false);
        resetForm();
      }}
      title="Edit Rekening Perusahaan"
      onSave={handleModalSuccess}
    >
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
            onChange={(e) => handleInputChange("kantorCabang", e.target.value)}
          />
        </div>
      </form>
    </BaseModal>
  );
}
