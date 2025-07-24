import {
  Input,
  Select,
  SelectAction,
  SelectContent,
  SelectItem,
  SelectValue,
  Textarea,
} from "keep-react";
import InputDate from "../input/InputDate";
import { useAddUnpaidLeaveStore } from "../../../store/presence/AddUnpaidLeaveStore";
import BaseModal from "./common/BaseModal";

export default function AddUnpaidLeaveModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleDateChange,
    handleAddUnpaidLeave,
    resetForm,
  } = useAddUnpaidLeaveStore();

  const handleModalSuccess = () => {
    const success = handleAddUnpaidLeave();
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
      title="Tambah Pengajuan Unpaid Leave"
      onSave={handleModalSuccess}
    >
      <form
        id="add-unpaid-leave"
        name="add-unpaid-leave"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div>
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama Karyawan <span className="text-red-500">*</span>
          </label>
          <Input
            id="nama"
            name="nama"
            placeholder="Pilih Nama Karyawan"
            value={formData.nama}
            onChange={(e) => handleInputChange("nama", e.target.value)}
          />
        </div>
        <div>
          <InputDate
            label="Tanggal Pengajuan"
            placeholder="Pilih tanggal"
            htmlFor="tanggalPengajuan"
            fieldName="tanggalPengajuan"
            hideAsterisk={false}
            value={formData.tanggalPengajuan}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label
            htmlFor="jumlahHari"
            className="block text-sm font-medium mb-2"
          >
            Jumlah Hari <span className="text-red-500">*</span>
          </label>
          <Input
            id="jumlahHari"
            name="jumlahHari"
            type="number"
            placeholder="1"
            value={formData.jumlahHari}
            onChange={(e) => handleInputChange("jumlahHari", e.target.value)}
          />
        </div>
        <div>
          <InputDate
            label="Tanggal Izin"
            placeholder="Pilih tanggal"
            htmlFor="tanggalIzin"
            fieldName="tanggalIzin"
            hideAsterisk={false}
            value={formData.tanggalIzin}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status <span className="text-red-500">*</span>
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
              <SelectItem value="Disetujui">Disetujui</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
              <SelectItem value="Arsip">Arsip</SelectItem>
              <SelectItem value="Menunggu Persetujuan">
                Menunggu Persetujuan
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="keterangan"
            className="block text-sm font-medium mb-2"
          >
            Keterangan <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="keterangan"
            name="keterangan"
            rows={8}
            placeholder="Keterangan"
            value={formData.keterangan}
            onChange={(e) => handleInputChange("keterangan", e.target.value)}
          />
        </div>
      </form>
    </BaseModal>
  );
}
