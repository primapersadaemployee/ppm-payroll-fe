import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  Select,
  SelectAction,
  SelectContent,
  SelectItem,
  SelectValue,
  Textarea,
} from "keep-react";
import { FloppyDisk } from "phosphor-react";
import InputDate from "../input/InputDate";
import { useEditSpecialLeaveStore } from "../../../store/EditSpecialLeaveStore";

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

  console.log(formData);

  const handleModalSuccess = () => {
    const success = handleEditSpecialLeave();
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
      <ModalContent className="max-w-md lg:max-w-[960px] overflow-y-auto h-full max-h-[800px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Ubah Pengajuan Cuti Khusus
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data cuti tahunan dibawah ini.
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
            id="edit-cuti-khusus"
            name="edit-cuti-khusus"
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
              <label
                htmlFor="jenisCuti"
                className="block text-sm font-medium mb-2"
              >
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
                onChange={(e) =>
                  handleInputChange("jumlahHari", e.target.value)
                }
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
              <label
                htmlFor="status"
                className="block text-sm font-medium mb-2"
              >
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
                onChange={(e) =>
                  handleInputChange("keterangan", e.target.value)
                }
              />
            </div>
          </form>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
