import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "keep-react";
import { FloppyDisk } from "phosphor-react";
import InputDate from "../input/InputDate";
import { useAddWorkScheduleStore } from "../../../store/settings/AddWorkScheduleStore";

export default function AddWorkScheduleModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleDateChange,
    handleAddWorkSchedule,
    resetForm,
  } = useAddWorkScheduleStore();

  const handleModalSuccess = () => {
    const success = handleAddWorkSchedule();
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
      <ModalContent className="max-w-md lg:max-w-[960px] overflow-y-auto max-h-[800px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Tambah Jadwal Kerja
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data jadwal kerja dibawah ini.
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
            id="add-work-schedule"
            name="add-work-schedule"
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
              <label
                htmlFor="hariKerja"
                className="block text-sm font-medium mb-2"
              >
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
              <label
                htmlFor="hariLibur"
                className="block text-sm font-medium mb-2"
              >
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
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
