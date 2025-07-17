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
import { FloppyDisk } from "phosphor-react";
import { useEditSalarySlipStore } from "../../../store/settings/EditSalarySlipStore";

export default function EditSalarySlipModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleEditSalarySlip,
    handleToggleComponent,
    resetForm,
  } = useEditSalarySlipStore();

  const handleModalSuccess = () => {
    const success = handleEditSalarySlip();
    if (success) {
      setIsFirstModalOpen(false);
      setIsSecondModalOpen(true);
    }
  };

  const komponenPendapatan = [
    { id: 1, nama: "THR" },
    { id: 2, nama: "Uang Lembur" },
    { id: 3, nama: "Tunjangan Pulsa" },
  ];

  const komponenPemotongan = [
    { id: 1, nama: "Koperasi" },
    { id: 2, nama: "BPJS" },
  ];

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
              Ubah Slip Gaji
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data slip gaji dibawah ini.
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
            id="edit-salary-slip"
            name="edit-salary-slip"
            className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
          >
            <div>
              <label htmlFor="nama" className="block text-sm font-medium mb-2">
                Nama
              </label>
              <Input
                id="nama"
                name="nama"
                placeholder="Nama Slip Gaji"
                value={formData.nama}
                onChange={(e) => handleInputChange("nama", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="periode"
                className="block text-sm font-medium mb-2"
              >
                Periode
              </label>
              <Select
                name="periode"
                value={formData.periode}
                onValueChange={(value) => handleInputChange("periode", value)}
              >
                <SelectAction id="periode" name="periode">
                  <SelectValue placeholder="Periode" />
                </SelectAction>
                <SelectContent id="periode">
                  <SelectItem value="Tetap">Tetap</SelectItem>
                  <SelectItem value="Tidak Tetap">Tidak Tetap</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="lamaPeriode"
                className="block text-sm font-medium mb-2"
              >
                Lama Periode
              </label>
              <Select
                name="lamaPeriode"
                value={formData.lamaPeriode}
                onValueChange={(value) =>
                  handleInputChange("lamaPeriode", value)
                }
              >
                <SelectAction id="lamaPeriode" name="lamaPeriode">
                  <SelectValue placeholder="Lama Periode" />
                </SelectAction>
                <SelectContent id="lamaPeriode">
                  <SelectItem value="1 Bulanan">1 Bulanan</SelectItem>
                  <SelectItem value="3 Bulanan">3 Bulanan</SelectItem>
                  <SelectItem value="1 Tahunan">1 Tahunan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="absensiTerakhir"
                className="block text-sm font-medium mb-2"
              >
                Untuk komponen pendapatan tergantung kehadiran, berapa hari
                absensi terakhir yang masuk hitungan
              </label>
              <Input
                id="absensiTerakhir"
                type="number"
                name="absensiTerakhir"
                placeholder="Masukkan Jumlah Hari"
                value={formData.absensiTerakhir}
                onChange={(e) =>
                  handleInputChange("absensiTerakhir", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="komponenPendapatan"
                className="block text-sm font-medium mb-2"
              >
                Pilih komponen pendapatan untuk slip gaji ini
              </label>
              <div className="flex flex-wrap gap-2">
                {komponenPendapatan.map((komponen) => (
                  <button
                    type="button"
                    key={komponen.id}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      formData.komponenPendapatan.find(
                        (item) => item.id === komponen.id
                      )
                        ? "bg-primary text-white"
                        : "bg-white text-[#455468] border-gray-300"
                    }`}
                    onClick={() =>
                      handleToggleComponent("komponenPendapatan", komponen)
                    }
                  >
                    {komponen.nama}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="komponenPemotongan"
                className="block text-sm font-medium mb-2"
              >
                Pilih komponen potongan untuk slip gaji ini
              </label>
              <div className="flex flex-wrap gap-2">
                {komponenPemotongan.map((komponen) => (
                  <button
                    type="button"
                    key={komponen.id}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      formData.komponenPemotongan.find(
                        (item) => item.id === komponen.id
                      )
                        ? "bg-primary text-white"
                        : "bg-white text-[#455468] border-gray-300"
                    }`}
                    onClick={() =>
                      handleToggleComponent("komponenPemotongan", komponen)
                    }
                  >
                    {komponen.nama}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
