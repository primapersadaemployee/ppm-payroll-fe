import { Upload } from "phosphor-react";
import {
  Input,
  Select,
  SelectAction,
  SelectContent,
  SelectValue,
  SelectItem,
  Checkbox,
  Textarea,
} from "keep-react";
import InputDate from "../input/InputDate";
import { useAddKaryawanStore } from "../../../store/AddKaryawanStore";

export default function PersonalStep() {
  const { formData, handleImageChange, handleInputChange, handleDateChange } =
    useAddKaryawanStore();

  return (
    <div className="flex flex-col gap-8">
      {/* Personal Information Section */}
      <div>
        <h2 className="text-xl font-medium mb-6">Informasi Pribadi</h2>
        <hr className="-mx-6 mb-4" />
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full ${
                formData.image ? "bg-transparent" : "bg-pink-100"
              } flex items-center justify-center`}
            >
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Upload size={24} className="text-pink-500" />
              )}
            </div>
            <div>
              <h3 className="font-medium">Upload Photo Profile</h3>
              <p className="text-sm text-gray-500">Min 600x600, PNG or JPEG</p>
              <Input
                name="image"
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="idKaryawan"
              className="block text-sm font-medium mb-2"
            >
              ID Karyawan <span className="text-red-500">*</span>
            </label>
            <Input
              id="idKaryawan"
              name="idKaryawan"
              required
              placeholder="ID Karyawan"
              value={formData.idKaryawan}
              onChange={(e) => handleInputChange("idKaryawan", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="namaLengkap"
              className="block text-sm font-medium mb-2"
            >
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <Input
              id="namaLengkap"
              name="namaLengkap"
              required
              placeholder="Nama Lengkap"
              value={formData.namaLengkap}
              onChange={(e) => handleInputChange("namaLengkap", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="tempatLahir"
              className="block text-sm font-medium mb-2"
            >
              Tempat Lahir <span className="text-red-500">*</span>
            </label>
            <Input
              id="tempatLahir"
              name="tempatLahir"
              placeholder="Tempat Lahir"
              value={formData.tempatLahir}
              onChange={(e) => handleInputChange("tempatLahir", e.target.value)}
            />
          </div>
          <InputDate
            label="Tanggal Lahir"
            htmlFor="tanggalLahir"
            fieldName="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleDateChange}
          />
          <div>
            <label
              htmlFor="jenisKelamin"
              className="block text-sm font-medium mb-2"
            >
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  id="jenisKelamin"
                  name="jenisKelamin"
                  checked={formData.jenisKelamin === "Laki-laki"}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "jenisKelamin",
                      checked ? "Laki-laki" : "",
                    )
                  }
                  className={`${
                    formData.jenisKelamin === "Laki-laki" ? "bg-primary" : ""
                  }`}
                />
                <span className="text-sm">Laki - Laki</span>
              </label>
              <label htmlFor="jenisKelamin" className="flex items-center gap-2">
                <Checkbox
                  id="jenisKelamin"
                  name="jenisKelamin"
                  checked={formData.jenisKelamin === "Perempuan"}
                  onCheckedChange={(checked) =>
                    handleInputChange(
                      "jenisKelamin",
                      checked ? "Perempuan" : "",
                    )
                  }
                  className={`${
                    formData.jenisKelamin === "Perempuan" ? "bg-primary" : ""
                  }`}
                />
                <span className="text-sm">Perempuan</span>
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="statusPerkawinan"
              className="block text-sm font-medium mb-2"
            >
              Status Perkawinan <span className="text-red-500">*</span>
            </label>
            <Select
              name="statusPerkawinan"
              value={formData.statusPerkawinan}
              onValueChange={(value) =>
                handleInputChange("statusPerkawinan", value)
              }
            >
              <SelectAction id="statusPerkawinan" name="statusPerkawinan">
                <SelectValue placeholder="Status Perkawinan..." />
              </SelectAction>
              <SelectContent id="statusPerkawinan">
                <SelectItem value="Belum Kawin">Belum Kawin</SelectItem>
                <SelectItem value="Kawin">Kawin</SelectItem>
                <SelectItem value="Cerai">Cerai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="golonganDarah"
              className="block text-sm font-medium mb-2"
            >
              Golongan Darah <span className="text-red-500">*</span>
            </label>
            <Input
              id="golonganDarah"
              name="golonganDarah"
              placeholder="Golongan Darah"
              value={formData.golonganDarah}
              onChange={(e) =>
                handleInputChange("golonganDarah", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="agama" className="block text-sm font-medium mb-2">
              Agama <span className="text-red-500">*</span>
            </label>
            <Input
              id="agama"
              name="agama"
              placeholder="Agama"
              value={formData.agama}
              onChange={(e) => handleInputChange("agama", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="kewarganegaraan"
              className="block text-sm font-medium mb-2"
            >
              Kewarganegaraan <span className="text-red-500">*</span>
            </label>
            <Select
              name="kewarganegaraan"
              value={formData.kewarganegaraan}
              onValueChange={(value) =>
                handleInputChange("kewarganegaraan", value)
              }
            >
              <SelectAction id="kewarganegaraan" name="kewarganegaraan">
                <SelectValue placeholder="Kewarganegaraan..." />
              </SelectAction>
              <SelectContent id="kewarganegaraan">
                <SelectItem value="WNI">WNI</SelectItem>
                <SelectItem value="WNA">WNA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div>
        <h2 className="text-xl font-medium mb-6">Informasi Kontak</h2>
        <hr className="-mx-6 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="tipeIdentitas"
              className="block text-sm font-medium mb-2"
            >
              Tipe Kartu Identitas <span className="text-red-500">*</span>
            </label>
            <Select
              name="tipeIdentitas"
              value={formData.tipeIdentitas}
              onValueChange={(value) =>
                handleInputChange("tipeIdentitas", value)
              }
            >
              <SelectAction id="tipeIdentitas" name="tipeIdentitas">
                <SelectValue placeholder="Tipe Kartu Identitas..." />
              </SelectAction>
              <SelectContent id="tipeIdentitas">
                <SelectItem value="KTP">KTP</SelectItem>
                <SelectItem value="SIM">SIM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="idKartuIdentitas"
              className="block text-sm font-medium mb-2"
            >
              ID Kartu Identitas <span className="text-red-500">*</span>
            </label>
            <Input
              id="idKartuIdentitas"
              name="idKartuIdentitas"
              placeholder="ID Kartu Identitas"
              value={formData.idKartuIdentitas}
              onChange={(e) =>
                handleInputChange("idKartuIdentitas", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              autoComplete="off"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="noHp" className="block text-sm font-medium mb-2">
              No. HP <span className="text-red-500">*</span>
            </label>
            <Input
              id="noHp"
              name="noHp"
              type="number"
              placeholder="No. HP"
              value={formData.noHp}
              onChange={(e) => handleInputChange("noHp", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="noTelp" className="block text-sm font-medium mb-2">
              No. Telepon <span className="text-red-500">*</span>
            </label>
            <Input
              id="noTelp"
              name="noTelp"
              type="number"
              placeholder="No. Telepon"
              value={formData.noTelp}
              onChange={(e) => handleInputChange("noTelp", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1">
          <div>
            <label
              htmlFor="alamatKartuIdentitas"
              className="block text-sm font-medium mb-2"
            >
              Alamat Kartu Identitas <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="alamatKartuIdentitas"
              name="alamatKartuIdentitas"
              rows={8}
              placeholder="Alamat Kartu Identitas"
              value={formData.alamatKartuIdentitas}
              onChange={(e) =>
                handleInputChange("alamatKartuIdentitas", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1">
          <div>
            <label htmlFor="negara" className="block text-sm font-medium mb-2">
              Negara <span className="text-red-500">*</span>
            </label>
            <Input
              id="negara"
              name="negara"
              placeholder="Negara"
              value={formData.negara}
              onChange={(e) => handleInputChange("negara", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="provinsi"
              className="block text-sm font-medium mb-2"
            >
              Provinsi <span className="text-red-500">*</span>
            </label>
            <Input
              id="provinsi"
              name="provinsi"
              placeholder="Provinsi"
              value={formData.provinsi}
              onChange={(e) => handleInputChange("provinsi", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="kota" className="block text-sm font-medium mb-2">
              Kota <span className="text-red-500">*</span>
            </label>
            <Input
              id="kota"
              name="kota"
              placeholder="Kota"
              value={formData.kota}
              onChange={(e) => handleInputChange("kota", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1">
          <div>
            <label
              htmlFor="alamatDomisili"
              className="block text-sm font-medium mb-2"
            >
              Alamat Domisili <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="alamatDomisili"
              name="alamatDomisili"
              rows={8}
              placeholder="Alamat Domisili"
              value={formData.alamatDomisili}
              onChange={(e) =>
                handleInputChange("alamatDomisili", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1">
          <div>
            <label
              htmlFor="negaraDomisili"
              className="block text-sm font-medium mb-2"
            >
              Negara Domisili <span className="text-red-500">*</span>
            </label>
            <Input
              id="negaraDomisili"
              name="negaraDomisili"
              placeholder="Negara Domisili"
              value={formData.negaraDomisili}
              onChange={(e) =>
                handleInputChange("negaraDomisili", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="provinsiDomisili"
              className="block text-sm font-medium mb-2"
            >
              Provinsi Domisili <span className="text-red-500">*</span>
            </label>
            <Input
              id="provinsiDomisili"
              name="provinsiDomisili"
              placeholder="Provinsi Domisili"
              value={formData.provinsiDomisili}
              onChange={(e) =>
                handleInputChange("provinsiDomisili", e.target.value)
              }
            />
          </div>
          <div>
            <label
              htmlFor="kotaDomisili"
              className="block text-sm font-medium mb-2"
            >
              Kota Domisili <span className="text-red-500">*</span>
            </label>
            <Input
              id="kotaDomisili"
              name="kotaDomisili"
              placeholder="Kota Domisili"
              value={formData.kotaDomisili}
              onChange={(e) =>
                handleInputChange("kotaDomisili", e.target.value)
              }
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="namaKontakDarurat"
              className="block text-sm font-medium mb-2"
            >
              Nama Kontak Darurat <span className="text-red-500">*</span>
            </label>
            <Input
              id="namaKontakDarurat"
              name="namaKontakDarurat"
              placeholder="Nama Kontak Darurat"
              value={formData.namaKontakDarurat}
              onChange={(e) =>
                handleInputChange("namaKontakDarurat", e.target.value)
              }
            />
          </div>
          <div>
            <label
              htmlFor="noTelpKontakDarurat"
              className="block text-sm font-medium mb-2"
            >
              No. Kontak Darurat <span className="text-red-500">*</span>
            </label>
            <Input
              id="noTelpKontakDarurat"
              name="noTelpKontakDarurat"
              type="number"
              placeholder="No. Kontak Darurat"
              value={formData.noTelpKontakDarurat}
              onChange={(e) =>
                handleInputChange("noTelpKontakDarurat", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-xl font-medium mb-6">Pendidikan Terakhir</h2>
        <hr className="-mx-6 mb-4" />
        <div className="mt-4 grid grid-cols-1">
          <div>
            <label
              htmlFor="pendidikanTerakhir"
              className="block text-sm font-medium mb-2"
            >
              Jenjang Pendidikan Terakhir{" "}
              <span className="text-red-500">*</span>
            </label>
            <Select
              name="pendidikanTerakhir"
              value={formData.pendidikanTerakhir}
              onValueChange={(value) =>
                handleInputChange("pendidikanTerakhir", value)
              }
            >
              <SelectAction id="pendidikanTerakhir" name="pendidikanTerakhir">
                <SelectValue placeholder="Jenjang Pendidikan" />
              </SelectAction>
              <SelectContent id="pendidikanTerakhir">
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA/SMK">SMA / SMK</SelectItem>
                <SelectItem value="D1-D3">D1 - D3</SelectItem>
                <SelectItem value="D4-S1">D4 - S1</SelectItem>
                <SelectItem value="S2">S2</SelectItem>
                <SelectItem value="S3">S3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="namaInstitusiPendidikan"
              className="block text-sm font-medium mb-2"
            >
              Nama Institusi Pendidikan <span className="text-red-500">*</span>
            </label>
            <Input
              id="namaInstitusiPendidikan"
              name="namaInstitusiPendidikan"
              placeholder="Nama Institusi Pendidikan"
              value={formData.namaInstitusiPendidikan}
              onChange={(e) =>
                handleInputChange("namaInstitusiPendidikan", e.target.value)
              }
            />
          </div>
          <div>
            <label
              htmlFor="programStudi"
              className="block text-sm font-medium mb-2"
            >
              Program Studi <span className="text-red-500">*</span>
            </label>
            <Input
              id="programStudi"
              name="programStudi"
              placeholder="Program Studi"
              value={formData.programStudi}
              onChange={(e) =>
                handleInputChange("programStudi", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
