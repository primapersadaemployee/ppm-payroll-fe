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
import { useEditSpecialLeaveStore } from "../../../store/presence/EditSpecialLeaveStore";
import BaseModal from "./common/BaseModal";

export default function EditSpecialLeaveModal({ specialLeave }) {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleDateChange,
    handleEditSpecialLeave,
    resetForm,
  } = useEditSpecialLeaveStore();

  const handleModalSuccess = () => {
    const success = handleEditSpecialLeave();
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
      title="Ubah Pengajuan Cuti Khusus"
      onSave={handleModalSuccess}
    >
      <form
        id="edit-special-leave"
        name="edit-special-leave"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div>
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama Karyawan <span className="text-red-500">*</span>
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
          <label htmlFor="jenisCuti" className="block text-sm font-medium mb-2">
            Jenis Cuti <span className="text-red-500">*</span>
          </label>
          <Select
            name="jenisCuti"
            value={formData.jenisCuti}
            onValueChange={(value) => handleInputChange("jenisCuti", value)}
          >
            <SelectAction id="jenisCuti" name="jenisCuti">
              <SelectValue placeholder="Jenis Cuti" />
            </SelectAction>
            <SelectContent id="jenisCuti">
              <SelectItem value="Cuti Duka (Anggota Keluarga Lain dalam satu rumah)">
                Cuti Duka (Anggota Keluarga Lain dalam satu rumah)
              </SelectItem>
              <SelectItem value="Cuti Duka (Suami/Istri, Orang Tua/Mertua, Anak/Menantu)">
                Cuti Duka (Suami/Istri, Orang Tua/Mertua, Anak/Menantu)
              </SelectItem>
              <SelectItem value="Cuti Istri Keguguran Kandungan">
                Cuti Istri Keguguran Kandungan
              </SelectItem>
              <SelectItem value="Cuti Istri Melahirkan">
                Cuti Istri Melahirkan
              </SelectItem>
              <SelectItem value="Cuti Membaptiskan Anak">
                Cuti Membaptiskan Anak
              </SelectItem>
              <SelectItem value="Cuti Mengkhitankan Anak">
                Cuti Mengkhitankan Anak
              </SelectItem>
              <SelectItem value="Cuti Menikah">Cuti Menikah</SelectItem>
            </SelectContent>
          </Select>
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
            label="Tanggal Cuti"
            placeholder="Pilih tanggal"
            htmlFor="tanggalCuti"
            fieldName="tanggalCuti"
            hideAsterisk={false}
            value={formData.tanggalCuti}
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
