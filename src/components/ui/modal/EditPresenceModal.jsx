import {
  Input,
  Select,
  SelectAction,
  SelectContent,
  SelectItem,
  SelectValue,
} from "keep-react";
import { useEditPresenceStore } from "../../../store/presence/EditPresenceStore";
import BaseModal from "./common/BaseModal";

export default function EditPresenceModal({ attendanceData }) {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleEditPresence,
    resetForm,
  } = useEditPresenceStore();

  const handleModalSuccess = () => {
    const success = handleEditPresence();
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
      title="Edit Daftar Kehadiran Presensi"
      onSave={handleModalSuccess}
    >
      <form
        id="edit-presence"
        name="edit-presence"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div>
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama
          </label>
          <Input
            id="nama"
            name="nama"
            placeholder="John Doe"
            value={formData.nama}
            onChange={(e) => handleInputChange("nama", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shift" className="block text-sm font-medium mb-2">
            Shift
          </label>
          <Select
            name="shift"
            value={formData.shift}
            onValueChange={(value) => handleInputChange("shift", value)}
          >
            <SelectAction id="shift" name="shift">
              <SelectValue placeholder="Shift" />
            </SelectAction>
            <SelectContent id="shift">
              <SelectItem value="Jam Kantor">Jam Kantor</SelectItem>
              <SelectItem value="Day Off">Day Off</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => handleInputChange("status", value)}
          >
            <SelectAction id="status" name="status">
              <SelectValue placeholder="Status" />
            </SelectAction>
            <SelectContent id="status">
              <SelectItem value="Hadir Hari Kerja">Hadir Hari Kerja</SelectItem>
              <SelectItem value="Sakit">Sakit</SelectItem>
              <SelectItem value="Izin">Izin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="masuk" className="block text-sm font-medium mb-2">
            Masuk
          </label>
          <Input
            id="masuk"
            name="masuk"
            placeholder="08:00"
            value={formData.masuk}
            onChange={(e) => handleInputChange("masuk", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keluar" className="block text-sm font-medium mb-2">
            Keluar
          </label>
          <Input
            id="keluar"
            name="keluar"
            placeholder="17:00"
            value={formData.keluar}
            onChange={(e) => handleInputChange("keluar", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="terlambat" className="block text-sm font-medium mb-2">
            Terlambat
          </label>
          <Select
            name="terlambat"
            value={formData.terlambat}
            onValueChange={(value) => handleInputChange("terlambat", value)}
          >
            <SelectAction id="terlambat" name="terlambat">
              <SelectValue placeholder="Ya" />
            </SelectAction>
            <SelectContent id="terlambat">
              <SelectItem value="ya">Ya</SelectItem>
              <SelectItem value="tidak">Tidak</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="durasiTerlambat"
            className="block text-sm font-medium mb-2"
          >
            Durasi Terlambat
          </label>
          <Input
            id="durasiTerlambat"
            name="durasiTerlambat"
            placeholder="00:00"
            value={formData.durasiTerlambat}
            onChange={(e) =>
              handleInputChange("durasiTerlambat", e.target.value)
            }
          />
        </div>
      </form>
    </BaseModal>
  );
}
