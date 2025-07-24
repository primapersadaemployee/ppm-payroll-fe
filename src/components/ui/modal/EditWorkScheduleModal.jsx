import { Input } from "keep-react";
import InputDate from "../input/InputDate";
import { useEditWorkScheduleStore } from "../../../store/settings/EditWorkScheduleStore";
import BaseModal from "./common/BaseModal";

export default function EditWorkScheduleModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleDateChange,
    handleEditWorkSchedule,
    resetForm,
  } = useEditWorkScheduleStore();

  const handleModalSuccess = () => {
    const success = handleEditWorkSchedule();
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
      title="Ubah Jadwal Kerja"
      onSave={handleModalSuccess}
    >
      <form
        id="edit-work-schedule"
        name="edit-work-schedule"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div>
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama
          </label>
          <Input
            id="nama"
            name="nama"
            placeholder="Nama Jadwal Kerja"
            value={formData.nama}
            onChange={(e) => handleInputChange("nama", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hariKerja" className="block text-sm font-medium mb-2">
            Hari Kerja
          </label>
          <Input
            id="hariKerja"
            name="hariKerja"
            type="number"
            placeholder="Hari Kerja"
            value={formData.hariKerja}
            onChange={(e) => handleInputChange("hariKerja", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hariLibur" className="block text-sm font-medium mb-2">
            Hari Libur
          </label>
          <Input
            id="hariLibur"
            name="hariLibur"
            placeholder="Hari Libur"
            value={formData.hariLibur}
            onChange={(e) => handleInputChange("hariLibur", e.target.value)}
          />
        </div>
        <div>
          <InputDate
            label="Tanggal Efektif"
            placeholder="Pilih tanggal"
            htmlFor="tanggalEfektif"
            fieldName="tanggalEfektif"
            hideAsterisk={false}
            value={formData.tanggalEfektif}
            onChange={handleDateChange}
          />
        </div>
      </form>
    </BaseModal>
  );
}
