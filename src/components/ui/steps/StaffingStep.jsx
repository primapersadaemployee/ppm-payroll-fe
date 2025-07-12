import {
  Select,
  SelectAction,
  SelectContent,
  SelectValue,
  SelectItem,
} from "keep-react";
import InputDate from "../input/InputDate";
import { useAddEmployeeStore } from "../../../store/AddEmployeStore";

export default function StaffingStep() {
  const { formData, handleInputChange, handleDateChange } =
    useAddEmployeeStore();

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Kepegawaian</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="statusKaryawan"
            className="block text-sm font-medium mb-2"
          >
            Status Karyawan <span className="text-red-500">*</span>
          </label>
          <Select
            name="statusKaryawan"
            value={formData.statusKaryawan}
            onValueChange={(value) =>
              handleInputChange("statusKaryawan", value)
            }
          >
            <SelectAction id="statusKaryawan" name="statusKaryawan">
              <SelectValue placeholder="Status Karyawan..." />
            </SelectAction>
            <SelectContent id="statusKaryawan">
              <SelectItem value="Tetap">Tetap</SelectItem>
              <SelectItem value="Kontrak">PKWT</SelectItem>
              <SelectItem value="Magang">Percobaan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <InputDate
          label="Tanggal Bergabung"
          htmlFor="tanggalBergabung"
          placeHolder="Tanggal Bergabung"
          fieldName="tanggalBergabung"
          value={formData.tanggalBergabung}
          onChange={handleDateChange}
        />
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
            onValueChange={(value) => handleInputChange("organisasi", value)}
          >
            <SelectAction id="organisasi" name="organisasi">
              <SelectValue placeholder="Pilih Organisasi..." />
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
          <label htmlFor="jabatan" className="block text-sm font-medium mb-2">
            Jabatan <span className="text-red-500">*</span>
          </label>
          <Select
            name="jabatan"
            value={formData.jabatan}
            onValueChange={(value) => handleInputChange("jabatan", value)}
          >
            <SelectAction id="jabatan" name="jabatan">
              <SelectValue placeholder="Pilih Jabatan..." />
            </SelectAction>
            <SelectContent id="jabatan">
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="pangkat" className="block text-sm font-medium mb-2">
            Pangkat <span className="text-red-500">*</span>
          </label>
          <Select
            name="pangkat"
            value={formData.pangkat}
            onValueChange={(value) => handleInputChange("pangkat", value)}
          >
            <SelectAction id="pangkat" name="pangkat">
              <SelectValue placeholder="Pilih Pangkat..." />
            </SelectAction>
            <SelectContent id="pangkat">
              <SelectItem value="I">I</SelectItem>
              <SelectItem value="II">II</SelectItem>
              <SelectItem value="III">III</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="jadwal" className="block text-sm font-medium mb-2">
            Jadwal <span className="text-red-500">*</span>
          </label>
          <Select
            name="jadwal"
            value={formData.jadwal}
            onValueChange={(value) => handleInputChange("jadwal", value)}
          >
            <SelectAction id="jadwal" name="jadwal">
              <SelectValue placeholder="Pilih Jadwal..." />
            </SelectAction>
            <SelectContent id="jadwal">
              <SelectItem value="Shift 1">Shift 1 (07:00 - 15:00)</SelectItem>
              <SelectItem value="Shift 2">Shift 2 (15:00 - 23:00)</SelectItem>
              <SelectItem value="Shift 3">Shift 3 (23:00 - 07:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <InputDate
          label="Tanggal Masa Akhir Kerja"
          htmlFor="tanggalMasaAkhirKerja"
          placeHolder="Tanggal Masa Akhir Kerja"
          fieldName="tanggalMasaAkhirKerja"
          value={formData.tanggalMasaAkhirKerja}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}
