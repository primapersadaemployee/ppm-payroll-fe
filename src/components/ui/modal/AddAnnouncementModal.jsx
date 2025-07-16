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
import { useAddAnnouncementStore } from "../../../store/announcement/AddAnnouncementStore";

export default function AddAnnouncementModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleDateChange,
    handleAddAnnouncement,
    resetForm,
  } = useAddAnnouncementStore();

  const handleModalSuccess = () => {
    const success = handleAddAnnouncement();
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
              Tambah Pengumuman
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data pengumuman tahunan dibawah ini.
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
            id="add-announcement"
            name="add-announcement"
            className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
          >
            <div>
              <label
                htmlFor="isiPengumuman"
                className="block text-sm font-medium mb-2"
              >
                Isi Pengumuman <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="isiPengumuman"
                name="isiPengumuman"
                rows={8}
                placeholder="Isi Pengumuman"
                value={formData.isiPengumuman}
                onChange={(e) =>
                  handleInputChange("isiPengumuman", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="organisasi"
                className="block text-sm font-medium mb-2"
              >
                Organisasi <span className="text-red-500">*</span>
              </label>
              <Select
                name="organisasi"
                value={formData.organisasi}
                onValueChange={(value) =>
                  handleInputChange("organisasi", value)
                }
              >
                <SelectAction id="organisasi" name="organisasi">
                  <SelectValue placeholder="Pilih Organisasi" />
                </SelectAction>
                <SelectContent id="organisasi">
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Keuangan">Keuangan</SelectItem>
                  <SelectItem value="HRD">HRD</SelectItem>
                  <SelectItem value="Pemasaran">Pemasaran</SelectItem>
                  <SelectItem value="Penjualan">Penjualan</SelectItem>
                  <SelectItem value="Produksi">Produksi</SelectItem>
                  <SelectItem value="Tata Kelola">Tata Kelola</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="dikirimKeKaryawan"
                className="block text-sm font-medium mb-2"
              >
                Dikirim Ke Karyawan <span className="text-red-500">*</span>
              </label>
              <Select
                name="dikirimKeKaryawan"
                value={formData.dikirimKeKaryawan}
                onValueChange={(value) =>
                  handleInputChange("dikirimKeKaryawan", value)
                }
              >
                <SelectAction id="dikirimKeKaryawan" name="dikirimKeKaryawan">
                  <SelectValue placeholder="Pilih Organisasi" />
                </SelectAction>
                <SelectContent id="dikirimKeKaryawan">
                  <SelectItem value="Hadir Hari Kerja">
                    Hadir Hari Kerja
                  </SelectItem>
                  <SelectItem value="Izin">Izin</SelectItem>
                  <SelectItem value="Sakit">Sakit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <InputDate
                label="Tanggal Akhir Publikasi"
                placeholder="Pilih tanggal"
                htmlFor="tanggalAkhirPublikasi"
                fieldName="tanggalAkhirPublikasi"
                hideAsterisk={false}
                value={formData.tanggalAkhirPublikasi}
                onChange={handleDateChange}
              />
            </div>
          </form>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
