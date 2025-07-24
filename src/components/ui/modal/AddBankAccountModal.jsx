import { Input } from "keep-react";
import { useAddEmployeeStore } from "../../../store/employee/AddEmployeStore";
import BaseModal from "./common/BaseModal";

export default function AddBankAccountModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    handleInputChange,
    handleAddAccount,
  } = useAddEmployeeStore();

  return (
    <BaseModal
      isOpen={isFirstModalOpen}
      onClose={() => setIsFirstModalOpen(false)}
      title="Tambah Nomor Rekening"
      onSave={handleAddAccount}
    >
      <form
        id="add-bank-account-employe"
        name="add-bank-account-employee"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div>
          <label htmlFor="namaBank" className="block text-sm font-medium mb-2">
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
            onChange={(e) => handleInputChange("cabangBank", e.target.value)}
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
            onChange={(e) => handleInputChange("nomorRekening", e.target.value)}
          />
        </div>
      </form>
    </BaseModal>
  );
}
