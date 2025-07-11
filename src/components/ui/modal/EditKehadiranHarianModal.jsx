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
} from "keep-react";
import InputDate from "../input/InputDate";
import { FloppyDisk } from "phosphor-react";

export default function EditKehadiranHarianModal({
  isFirstModalOpen,
  setIsFirstModalOpen,
  setIsSecondModalOpen,
}) {
  const handleModalSuccess = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  return (
    <Modal
      open={isFirstModalOpen}
      onClose={() => setIsFirstModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Daftar Kehadiran Harian
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data keharian dibawah ini.
            </ModalDescription>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={() => setIsFirstModalOpen(false)}
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
            id="edit-kehadiran-harian"
            name="edit-kehadiran-harian"
            className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
          >
            <div>
              <InputDate
                label="Tanggal"
                htmlFor="tanggal"
                fieldName="tanggal"
                hideAsterisk={true}
                // value={formData.tanggal}
                // onChange={(e) => handleDateChange("tanggal", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="shift" className="block text-sm font-medium mb-2">
                Shift
              </label>
              <Select
                name="shift"
                // value={formData.statusPerkawinan}
                // onValueChange={(value) =>
                //   handleInputChange("statusPerkawinan", value)
                // }
              >
                <SelectAction id="shift" name="shift">
                  <SelectValue placeholder="Shift" />
                </SelectAction>
                <SelectContent id="shift">
                  <SelectItem value="Shift 1">Shift 1</SelectItem>
                  <SelectItem value="Shift 2">Shift 2</SelectItem>
                  <SelectItem value="Shift 3">Shift 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium mb-2"
              >
                Status
              </label>
              <Select
                name="status"
                // value={formData.statusPerkawinan}
                // onValueChange={(value) =>
                //   handleInputChange("statusPerkawinan", value)
                // }
              >
                <SelectAction id="status" name="status">
                  <SelectValue placeholder="Status" />
                </SelectAction>
                <SelectContent id="status">
                  <SelectItem value="Hadir">Hadir</SelectItem>
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
                // value={formData.namaPemilikRekening}
                // onChange={(e) =>
                //   handleInputChange("namaPemilikRekening", e.target.value)
                // }
              />
            </div>
            <div>
              <label
                htmlFor="keluar"
                className="block text-sm font-medium mb-2"
              >
                Keluar
              </label>
              <Input
                id="keluar"
                name="keluar"
                placeholder="17:00"
                // value={formData.namaPemilikRekening}
                // onChange={(e) =>
                //   handleInputChange("namaPemilikRekening", e.target.value)
                // }
              />
            </div>
            <div>
              <label
                htmlFor="terlambat"
                className="block text-sm font-medium mb-2"
              >
                Terlambat
              </label>
              <Select
                name="terlambat"
                // value={formData.statusPerkawinan}
                // onValueChange={(value) =>
                //   handleInputChange("statusPerkawinan", value)
                // }
              >
                <SelectAction id="terlambat" name="terlambat">
                  <SelectValue placeholder="Ya" />
                </SelectAction>
                <SelectContent id="terlambat">
                  <SelectItem value="Ya">Ya</SelectItem>
                  <SelectItem value="Tidak">Tidak</SelectItem>
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
                placeholder="17:00"
                // value={formData.namaPemilikRekening}
                // onChange={(e) =>
                //   handleInputChange("namaPemilikRekening", e.target.value)
                // }
              />
            </div>
          </form>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
