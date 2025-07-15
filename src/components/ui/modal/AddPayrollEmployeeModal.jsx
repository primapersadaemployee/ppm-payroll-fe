import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalHeader,
  ModalDescription,
  ModalTitle,
  Switch,
  Checkbox,
  Select,
  SelectAction,
  SelectValue,
  SelectContent,
  SelectItem,
} from "keep-react";
import { useAddPayrollEmployeStore } from "../../../store/employee/AddPayrollEmployeStore";
import { FloppyDisk } from "phosphor-react";
import InputDate from "../input/InputDate";

export default function AddPayrollEmployeeModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    handleInputChange,
    handleDateChange,
    handleAddPayrollEmployee,
  } = useAddPayrollEmployeStore();

  return (
    <Modal
      open={isFirstModalOpen}
      onClose={() => setIsFirstModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px] overflow-y-auto h-full max-h-[800px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Tambah Payroll
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data rekening dibawah ini.
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
                onClick={handleAddPayrollEmployee}
              >
                <FloppyDisk size={20} color="#FFFFFF" weight="bold" />
                Simpan
              </Button>
            </div>
          </div>
          <div className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins">
            <div>
              <InputDate
                label="Tanggal Efektif"
                placeHolder="04/06/2025"
                htmlFor="tanggalEfektif"
                fieldName="tanggalEfektif"
                value={formData.tanggalEfektif}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <div className="block text-sm font-medium mb-2">
                Pilih Slip Gaji
              </div>
              <div className="flex gap-4">
                <label
                  htmlFor="gajiBulanan"
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id="gajiBulanan"
                    name="gajiBulanan"
                    checked={formData.gajiBulanan === true}
                    onCheckedChange={(checked) =>
                      handleInputChange("gajiBulanan", checked ? true : false)
                    }
                    className={`${
                      formData.gajiBulanan === true ? "bg-primary" : ""
                    }`}
                  />
                  <span className="text-sm">Gaji Bulanan</span>
                </label>
                <label htmlFor="thr" className="flex items-center gap-2">
                  <Checkbox
                    id="thr"
                    name="thr"
                    checked={formData.thr === true}
                    onCheckedChange={(checked) =>
                      handleInputChange("thr", checked ? true : false)
                    }
                    className={`${formData.thr === true ? "bg-primary" : ""}`}
                  />
                  <span className="text-sm">THR</span>
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="gajiPokok"
                className="block text-sm font-medium mb-2"
              >
                Gaji Pokok <span className="text-red-500">*</span>
              </label>
              <Input
                id="gajiPokok"
                name="gajiPokok"
                type="number"
                placeholder="0"
                value={formData.gajiPokok}
                onChange={(e) => handleInputChange("gajiPokok", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="koperasi"
                className="block text-sm font-medium mb-2"
              >
                Potongan Koperasi
              </label>
              <Input
                id="koperasi"
                name="koperasi"
                type="number"
                placeholder="0"
                value={formData.koperasi}
                onChange={(e) => handleInputChange("koperasi", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="jaminanKeselamatanKerja"
                className="block text-sm font-medium mb-2"
              >
                Kelompok Tingkat Risiko Jaminan Keselamatan Kerja (JKK)
              </label>
              <Select
                name="jaminanKeselamatanKerja"
                value={formData.jaminanKeselamatanKerja}
                onValueChange={(value) =>
                  handleInputChange("jaminanKeselamatanKerja", value)
                }
              >
                <SelectAction
                  id="jaminanKeselamatanKerja"
                  name="jaminanKeselamatanKerja"
                >
                  <SelectValue placeholder="Kelompok Tingkat Risiko Jaminan Keselamatan Kerja (JKK)" />
                </SelectAction>
                <SelectContent id="jaminanKeselamatanKerja">
                  <SelectItem value="Sangat Rendah">Sangat Rendah</SelectItem>
                  <SelectItem value="Rendah">Rendah</SelectItem>
                  <SelectItem value="Sedang">Sedang</SelectItem>
                  <SelectItem value="Tinggi">Tinggi</SelectItem>
                  <SelectItem value="Sangat Tinggi">Sangat Tinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="jaminanKematian"
                className="block text-sm font-medium mb-2"
              >
                Kelompok Iuran Jaminan Kematian (JKM)
              </label>
              <Select
                name="jaminanKematian"
                value={formData.jaminanKematian}
                onValueChange={(value) =>
                  handleInputChange("jaminanKematian", value)
                }
              >
                <SelectAction id="jaminanKematian" name="jaminanKematian">
                  <SelectValue placeholder="Kelompok Iuran Jaminan Kematian (JKM)" />
                </SelectAction>
                <SelectContent id="jaminanKematian">
                  <SelectItem value="pekerja penerima upah">
                    Pekerja Penerima Upah (PU)
                  </SelectItem>
                  <SelectItem value="pekerja bukan penerima upah">
                    Pekerja Bukan Penerima Upah (BPU)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="metodePerhitunganPph"
                className="block text-sm font-medium mb-2"
              >
                Metode Perhitungan PPH 21/26
              </label>
              <Select
                name="metodePerhitunganPph"
                value={formData.metodePerhitunganPph}
                onValueChange={(value) =>
                  handleInputChange("metodePerhitunganPph", value)
                }
              >
                <SelectAction
                  id="metodePerhitunganPph"
                  name="metodePerhitunganPph"
                >
                  <SelectValue placeholder="Metode Perhitungan PPH 21/26" />
                </SelectAction>
                <SelectContent id="metodePerhitunganPph">
                  <SelectItem value="gross">Gross</SelectItem>
                  <SelectItem value="gross-up">Gross-Up</SelectItem>
                  <SelectItem value="net">Net</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="pengaliIuranBpjs"
                className="block text-sm font-medium mb-2"
              >
                Pengali Iuran BPJS Kesehatan
              </label>
              <Select
                name="pengaliIuranBpjs"
                value={formData.pengaliIuranBpjs}
                onValueChange={(value) =>
                  handleInputChange("pengaliIuranBpjs", value)
                }
              >
                <SelectAction id="pengaliIuranBpjs" name="pengaliIuranBpjs">
                  <SelectValue placeholder="Pengali Iuran BPJS Kesehatan" />
                </SelectAction>
                <SelectContent id="pengaliIuranBpjs">
                  <SelectItem value="Ya">Ya</SelectItem>
                  <SelectItem value="Tidak">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="jaminanHariTua"
                className="flex items-center gap-2"
              >
                <Switch
                  id="jaminanHariTua"
                  name="jaminanHariTua"
                  checked={formData.jaminanHariTua === "Ya"}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "jaminanHariTua",
                      checked ? "Ya" : "Tidak"
                    )
                  }
                  className={`${
                    formData.jaminanHariTua === "Ya" ? "bg-primary" : ""
                  }`}
                />
                <span className="text-sm">
                  Karyawan memakai jaminan hari tua (JHT)
                </span>
              </label>
            </div>
            <div>
              <label
                htmlFor="jaminanPensiunan"
                className="flex items-center gap-2"
              >
                <Switch
                  id="jaminanPensiunan"
                  name="jaminanPensiunan"
                  checked={formData.jaminanPensiunan === "Ya"}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "jaminanPensiunan",
                      checked ? "Ya" : "Tidak"
                    )
                  }
                  className={`${
                    formData.jaminanPensiunan === "Ya" ? "bg-primary" : ""
                  }`}
                />
                <span className="text-sm">
                  Karyawan memakai jaminan pensiunan
                </span>
              </label>
            </div>
            <div>
              <label
                htmlFor="bpjsDitanggungPerusahaan"
                className="block text-sm font-medium mb-2"
              >
                BPJS Kesehatan ditanggung perusahaan
              </label>
              <Select
                name="bpjsDitanggungPerusahaan"
                value={formData.bpjsDitanggungPerusahaan}
                onValueChange={(value) =>
                  handleInputChange("bpjsDitanggungPerusahaan", value)
                }
              >
                <SelectAction
                  id="bpjsDitanggungPerusahaan"
                  name="bpjsDitanggungPerusahaan"
                >
                  <SelectValue placeholder="BPJS Kesehatan ditanggung perusahaan" />
                </SelectAction>
                <SelectContent id="bpjsDitanggungPerusahaan">
                  <SelectItem value="Ya">Ya</SelectItem>
                  <SelectItem value="Tidak">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
