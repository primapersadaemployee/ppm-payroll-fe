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
import { useAddSickLeaveStore } from "../../../store/presence/AddSickLeaveStore";

export default function AddSickLeaveModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleDateChange,
    handleAddSickLeave,
    resetForm,
  } = useAddSickLeaveStore();

  const handleModalSuccess = () => {
    const success = handleAddSickLeave();
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
              Tambah Pengajuan Sakit
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data sakit dibawah ini.
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
            id="add-sick-leave"
            name="add-sick-leave"
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
                onChange={(e) =>
                  handleInputChange("jumlahHari", e.target.value)
                }
              />
            </div>
            <div>
              <InputDate
                label="Tanggal Izin Sakit"
                placeholder="Pilih tanggal"
                htmlFor="tanggalIzinSakit"
                fieldName="tanggalIzinSakit"
                hideAsterisk={false}
                value={formData.tanggalIzinSakit}
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
