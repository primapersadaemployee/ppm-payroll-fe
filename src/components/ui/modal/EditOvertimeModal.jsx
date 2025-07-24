import {
  Input,
  Select,
  SelectAction,
  SelectContent,
  SelectItem,
  SelectValue,
} from "keep-react";
import { useEditOvertimeStore } from "../../../store/settings/EditOvertimeStore";
import BaseModal from "./common/BaseModal";

export default function EditOvertimeModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleEditOvertime,
    resetForm,
  } = useEditOvertimeStore();

  const handleModalSuccess = () => {
    const success = handleEditOvertime();
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
      title="Edit Lembur"
      onSave={handleModalSuccess}
    >
      <form
        id="edit-overtime"
        name="edit-overtime"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div>
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama
          </label>
          <Input
            id="nama"
            name="nama"
            placeholder="Nama Lembur"
            value={formData.nama}
            onChange={(e) => handleInputChange("nama", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tipe" className="block text-sm font-medium mb-2">
            Tipe
          </label>
          <Select
            name="tipe"
            value={formData.tipe}
            onValueChange={(value) => handleInputChange("tipe", value)}
          >
            <SelectAction id="tipe" name="tipe">
              <SelectValue placeholder="TIpe" />
            </SelectAction>
            <SelectContent id="tipe">
              <SelectItem value="Flat">Flat</SelectItem>
              <SelectItem value="Pemerintah">Pemerintah</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="hariPerhitungan"
            className="block text-sm font-medium mb-2"
          >
            Hari Perhitungan
          </label>
          <Input
            id="hariPerhitungan"
            name="hariPerhitungan"
            placeholder="Hari Perhitungan"
            value={formData.hariPerhitungan}
            onChange={(e) =>
              handleInputChange("hariPerhitungan", e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="waktu" className="block text-sm font-medium mb-2">
            Waktu
          </label>
          <Input
            id="waktu"
            name="waktu"
            placeholder="Waktu"
            value={formData.waktu}
            onChange={(e) => handleInputChange("waktu", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="upah" className="block text-sm font-medium mb-2">
            Upah
          </label>
          <Input
            id="upah"
            name="upah"
            placeholder="Upah"
            value={formData.upah}
            onChange={(e) => handleInputChange("upah", e.target.value)}
          />
        </div>
      </form>
    </BaseModal>
  );
}
