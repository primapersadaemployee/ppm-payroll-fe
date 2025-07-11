import {
  Users,
  Upload,
  HourglassMedium,
  CheckCircle,
  Plus,
  CaretRight,
  Check,
} from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import NotificationHome from "../../components/ui/notification/NotificationHome";
import BGPersonal from "/bg-personal.png";
import BGKepegawaian from "/bg-kepegawaian.png";
import BGPayroll from "/bg-payroll.png";
import {
  Button,
  Input,
  Select,
  SelectAction,
  SelectContent,
  SelectValue,
  SelectItem,
  Checkbox,
  Textarea,
  Modal,
  ModalAction,
  ModalContent,
  ModalHeader,
  ModalDescription,
  ModalTitle,
  ModalFooter,
  toast,
} from "keep-react";
import { useState } from "react";
import InputDate from "../../components/ui/input/InputDate";
import TableRekening from "../../components/ui/table/TableRekening";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const rekeningData = [];

export default function AddKaryawan() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null, // Simpan file gambar, bukan base64
    idKaryawan: "",
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    golonganDarah: "",
    agama: "",
    kewarganegaraan: "",
    tipeIdentitas: "",
    idKartuIdentitas: "",
    email: "",
    noHp: "",
    noTelp: "",
    alamatKartuIdentitas: "",
    negara: "",
    provinsi: "",
    kota: "",
    alamatDomisili: "",
    negaraDomisili: "",
    provinsiDomisili: "",
    kotaDomisili: "",
    namaKontakDarurat: "",
    noTelpKontakDarurat: "",
    pendidikanTerakhir: "",
    namaInstitusiPendidikan: "",
    programStudi: "",
    statusKaryawan: "",
    tanggalBergabung: "",
    organisasi: "",
    jabatan: "",
    pangkat: "",
    jadwal: "",
    tanggalMasaAkhirKerja: "",
    npwp: "",
    npwpPemotong: "",
    noBpjsKetenagakerjaan: "",
    tanggalEfektifBpjsKetenagakerjaan: "",
    noBpjsKesehatan: "",
    tanggalEfektifBpjsKesehatan: "",
    jumlahAngsuranKeluarga: "",
    namaBank: "",
    cabangBank: "",
    namaPemilikRekening: "",
    nomorRekening: "",
  });
  const [rekenings, setRekenings] = useState(rekeningData);
  const router = useNavigate();
  const steps = [
    {
      id: 1,
      title: "Personal",
      isComplete: currentStep > 1,
      image: BGPersonal,
    },
    {
      id: 2,
      title: "Kepegawaian",
      isComplete: currentStep > 2,
      image: BGKepegawaian,
    },
    {
      id: 3,
      title: "Payroll",
      isComplete: currentStep > 3,
      image: BGPayroll,
    },
  ];

  // Handle perubahan file gambar
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0], // Simpan file asli, bukan base64
      }));
    }
  };

  // Handle perubahan input teks
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle perubahan tanggal
  const handleDateChange = (fieldName, date) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: date ? format(date, "yyyy-MM-dd") : "",
    }));
  };

  // Validasi field wajib untuk setiap step
  const validateStep = (step) => {
    const requiredFields = {
      1: [
        "idKaryawan",
        "namaLengkap",
        "tempatLahir",
        "tanggalLahir",
        "jenisKelamin",
        "statusPerkawinan",
        "golonganDarah",
        "agama",
        "kewarganegaraan",
        "tipeIdentitas",
        "idKartuIdentitas",
        "email",
        "noHp",
        "noTelp",
        "alamatKartuIdentitas",
        "negara",
        "provinsi",
        "kota",
        "alamatDomisili",
        "negaraDomisili",
        "provinsiDomisili",
        "kotaDomisili",
        "namaKontakDarurat",
        "noTelpKontakDarurat",
        "pendidikanTerakhir",
        "namaInstitusiPendidikan",
        "programStudi",
      ],
      2: [
        "statusKaryawan",
        "tanggalBergabung",
        "organisasi",
        "jabatan",
        "pangkat",
        "jadwal",
        "tanggalMasaAkhirKerja",
      ],
      3: [
        "npwp",
        "npwpPemotong",
        "namaBank",
        "cabangBank",
        "namaPemilikRekening",
        "nomorRekening",
      ],
    };

    const missingFields = requiredFields[step]?.filter(
      (field) => !formData[field]
    );

    return missingFields?.length > 0
      ? `Silahkan isi semua field wajib yang diberi tanda *`
      : null;
  };

  // Handle navigasi ke step berikutnya
  const handleNext = () => {
    if (currentStep === 1 || currentStep === 2) {
      const validationError = validateStep(currentStep);
      if (validationError) {
        toast.error(validationError);
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle navigasi ke step sebelumnya
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle pengiriman form ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateStep(3);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const data = new FormData();

    // Tambahkan semua field dari formData ke FormData
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData[key]) {
        data.append("image", formData[key]); // File gambar
      } else if (formData[key]) {
        data.append(key, formData[key]); // Field lainnya
      }
    });

    // Tambahkan array rekenings
    data.append("rekenings", JSON.stringify(rekenings));

    // Cetak isi FormData untuk debugging
    console.log("Isi FormData:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      // const response = await fetch('http://localhost:4000/api/v1/karyawan', {
      //   method: 'POST',
      //   body: data,
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Gagal mengirim data ke server');
      // }

      // const result = await response.json();
      // console.log('Data berhasil dikirim:', result);
      toast.success("Berhasil menambahkan data karyawan.");
      setFormData({
        image: null,
        idKaryawan: "",
        namaLengkap: "",
        tempatLahir: "",
        tanggalLahir: "",
        jenisKelamin: "",
        statusPerkawinan: "",
        golonganDarah: "",
        agama: "",
        kewarganegaraan: "",
        tipeIdentitas: "",
        idKartuIdentitas: "",
        email: "",
        noHp: "",
        noTelp: "",
        alamatKartuIdentitas: "",
        negara: "",
        provinsi: "",
        kota: "",
        alamatDomisili: "",
        negaraDomisili: "",
        provinsiDomisili: "",
        kotaDomisili: "",
        namaKontakDarurat: "",
        noTelpKontakDarurat: "",
        pendidikanTerakhir: "",
        namaInstitusiPendidikan: "",
        programStudi: "",
        statusKaryawan: "",
        tanggalBergabung: "",
        organisasi: "",
        jabatan: "",
        pangkat: "",
        jadwal: "",
        tanggalMasaAkhirKerja: "",
        npwp: "",
        npwpPemotong: "",
        noBpjsKetenagakerjaan: "",
        tanggalEfektifBpjsKetenagakerjaan: "",
        noBpjsKesehatan: "",
        tanggalEfektifBpjsKesehatan: "",
        jumlahAngsuranKeluarga: "",
        namaBank: "",
        cabangBank: "",
        namaPemilikRekening: "",
        nomorRekening: "",
      });
      setRekenings([]);
      router("/karyawan");
    } catch (err) {
      console.error("Error:", err.message);
      toast.error(err.message);
    }
  };

  // Handle penambahan rekening
  const handleAddAccount = () => {
    if (
      !formData.namaBank.trim() ||
      !formData.cabangBank.trim() ||
      !formData.namaPemilikRekening.trim() ||
      !formData.nomorRekening.trim()
    ) {
      toast.error("Semua field rekening wajib diisi!");
      return;
    }

    const newRekening = {
      id: Date.now(),
      bank: formData.namaBank,
      cabang: formData.cabangBank,
      namaPemilik: formData.namaPemilikRekening,
      nomorRekening: formData.nomorRekening,
      status: "Belum Terverifikasi",
    };
    setRekenings((prev) => [...prev, newRekening]);
    // setFormData((prev) => ({
    //   ...prev,
    //   namaBank: '',
    //   cabangBank: '',
    //   namaPemilikRekening: '',
    //   nomorRekening: '',
    // }));
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleCloseSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen text-[#455468]">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-6">
          <nav className="text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Karyawan</span>
              <span>/</span>
              <span className="font-medium">Tambah Karyawan</span>
              <span>/</span>
              <span className="text-gray-400">
                {currentStep === 1
                  ? "Personal"
                  : currentStep === 2
                  ? "Kepegawaian"
                  : "Payroll"}
              </span>
            </div>
          </nav>

          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Karyawan</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationHome />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
            <div className="2xl:flex justify-between items-center mb-8 hidden">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col gap-6 w-1/3">
                  <div className="flex items-center w-full">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-lg ${
                          currentStep === step.id
                            ? "bg-primary text-white"
                            : "bg-[#F0F3F9]"
                        }`}
                      >
                        {step.id}
                      </div>
                    </div>
                    {index < steps.length - 0 && (
                      <div
                        className={`w-full mx-1 h-0.5 ${
                          currentStep === step.id
                            ? "bg-primary"
                            : "bg-[#F0F3F9]"
                        }`}
                      />
                    )}
                  </div>
                  <div
                    className={`border rounded-3xl w-[90%] p-6 shadow-sm h-[250px] ${
                      currentStep === step.id
                        ? "border-primary bg-[#DDE5FF]"
                        : "border-gray-100 bg-transparent"
                    }`}
                  >
                    <div className="flex gap-1 h-full">
                      <div className="flex flex-col justify-between">
                        <p className="text-black font-medium">{step.title}</p>
                        {currentStep === step.id && (
                          <Button className="bg-primary hover:bg-primary/90">
                            Mulai Pengisian
                          </Button>
                        )}
                        {step.isComplete && (
                          <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 rounded-full bg-[#C9EDDB]">
                              <div className="flex items-center justify-center h-full">
                                <CheckCircle
                                  size={20}
                                  weight="bold"
                                  className="text-[#11A75C]"
                                />
                              </div>
                            </div>
                            <p className="text-[#8897AE] text-sm">Completed</p>
                          </div>
                        )}
                        {currentStep < step.id && !step.isComplete && (
                          <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 rounded-full bg-[#FDEFD8]">
                              <div className="flex items-center justify-center h-full">
                                <HourglassMedium
                                  size={20}
                                  weight="bold"
                                  className="text-[#D97706]"
                                />
                              </div>
                            </div>
                            <p className="text-[#8897AE] text-sm">
                              In Progress
                            </p>
                          </div>
                        )}
                      </div>
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-1/2 mx-auto h-auto object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              name="add-karyawan"
              id="add-karyawan"
              className="mt-8"
            >
              <div>
                {/* Step 1 */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="text-xl font-medium mb-6">
                        Informasi Pribadi
                      </h2>
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
                            <h3 className="font-medium">
                              Upload Photo Profile
                            </h3>
                            <p className="text-sm text-gray-500">
                              Min 600x600, PNG or JPEG
                            </p>
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
                            onChange={(e) =>
                              handleInputChange("idKaryawan", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("namaLengkap", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("tempatLahir", e.target.value)
                            }
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
                            Jenis Kelamin{" "}
                            <span className="text-red-500">*</span>
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
                                    checked ? "Laki-laki" : ""
                                  )
                                }
                                className={`${
                                  formData.jenisKelamin === "Laki-laki"
                                    ? "bg-primary"
                                    : ""
                                }`}
                              />
                              <span className="text-sm">Laki - Laki</span>
                            </label>
                            <label
                              htmlFor="jenisKelamin"
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id="jenisKelamin"
                                name="jenisKelamin"
                                checked={formData.jenisKelamin === "Perempuan"}
                                onCheckedChange={(checked) =>
                                  handleInputChange(
                                    "jenisKelamin",
                                    checked ? "Perempuan" : ""
                                  )
                                }
                                className={`${
                                  formData.jenisKelamin === "Perempuan"
                                    ? "bg-primary"
                                    : ""
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
                            Status Perkawinan{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Select
                            name="statusPerkawinan"
                            value={formData.statusPerkawinan}
                            onValueChange={(value) =>
                              handleInputChange("statusPerkawinan", value)
                            }
                          >
                            <SelectAction
                              id="statusPerkawinan"
                              name="statusPerkawinan"
                            >
                              <SelectValue placeholder="Status Perkawinan..." />
                            </SelectAction>
                            <SelectContent id="statusPerkawinan">
                              <SelectItem value="Belum Kawin">
                                Belum Kawin
                              </SelectItem>
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
                            Golongan Darah{" "}
                            <span className="text-red-500">*</span>
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
                          <label
                            htmlFor="agama"
                            className="block text-sm font-medium mb-2"
                          >
                            Agama <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="agama"
                            name="agama"
                            placeholder="Agama"
                            value={formData.agama}
                            onChange={(e) =>
                              handleInputChange("agama", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="kewarganegaraan"
                            className="block text-sm font-medium mb-2"
                          >
                            Kewarganegaraan{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Select
                            name="kewarganegaraan"
                            value={formData.kewarganegaraan}
                            onValueChange={(value) =>
                              handleInputChange("kewarganegaraan", value)
                            }
                          >
                            <SelectAction
                              id="kewarganegaraan"
                              name="kewarganegaraan"
                            >
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

                    <div>
                      <h2 className="text-xl font-medium mb-6">
                        Informasi Kontak
                      </h2>
                      <hr className="-mx-6 mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="tipeIdentitas"
                            className="block text-sm font-medium mb-2"
                          >
                            Tipe Kartu Identitas{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Select
                            name="tipeIdentitas"
                            value={formData.tipeIdentitas}
                            onValueChange={(value) =>
                              handleInputChange("tipeIdentitas", value)
                            }
                          >
                            <SelectAction
                              id="tipeIdentitas"
                              name="tipeIdentitas"
                            >
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
                            ID Kartu Identitas{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="idKartuIdentitas"
                            name="idKartuIdentitas"
                            placeholder="ID Kartu Identitas"
                            value={formData.idKartuIdentitas}
                            onChange={(e) =>
                              handleInputChange(
                                "idKartuIdentitas",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <Input
                            autoComplete="off"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="noHp"
                            className="block text-sm font-medium mb-2"
                          >
                            No. HP <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="noHp"
                            name="noHp"
                            type="number"
                            placeholder="No. HP"
                            value={formData.noHp}
                            onChange={(e) =>
                              handleInputChange("noHp", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="noTelp"
                            className="block text-sm font-medium mb-2"
                          >
                            No. Telepon <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="noTelp"
                            name="noTelp"
                            type="number"
                            placeholder="No. Telepon"
                            value={formData.noTelp}
                            onChange={(e) =>
                              handleInputChange("noTelp", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1">
                        <div>
                          <label
                            htmlFor="alamatKartuIdentitas"
                            className="block text-sm font-medium mb-2"
                          >
                            Alamat Kartu Identitas{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Textarea
                            id="alamatKartuIdentitas"
                            name="alamatKartuIdentitas"
                            rows={8}
                            placeholder="Alamat Kartu Identitas"
                            value={formData.alamatKartuIdentitas}
                            onChange={(e) =>
                              handleInputChange(
                                "alamatKartuIdentitas",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1">
                        <div>
                          <label
                            htmlFor="negara"
                            className="block text-sm font-medium mb-2"
                          >
                            Negara <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="negara"
                            name="negara"
                            placeholder="Negara"
                            value={formData.negara}
                            onChange={(e) =>
                              handleInputChange("negara", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleInputChange("provinsi", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="kota"
                            className="block text-sm font-medium mb-2"
                          >
                            Kota <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="kota"
                            name="kota"
                            placeholder="Kota"
                            value={formData.kota}
                            onChange={(e) =>
                              handleInputChange("kota", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1">
                        <div>
                          <label
                            htmlFor="alamatDomisili"
                            className="block text-sm font-medium mb-2"
                          >
                            Alamat Domisili{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Textarea
                            id="alamatDomisili"
                            name="alamatDomisili"
                            rows={8}
                            placeholder="Alamat Domisili"
                            value={formData.alamatDomisili}
                            onChange={(e) =>
                              handleInputChange(
                                "alamatDomisili",
                                e.target.value
                              )
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
                            Negara Domisili{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="negaraDomisili"
                            name="negaraDomisili"
                            placeholder="Negara Domisili"
                            value={formData.negaraDomisili}
                            onChange={(e) =>
                              handleInputChange(
                                "negaraDomisili",
                                e.target.value
                              )
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
                            Provinsi Domisili{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="provinsiDomisili"
                            name="provinsiDomisili"
                            placeholder="Provinsi Domisili"
                            value={formData.provinsiDomisili}
                            onChange={(e) =>
                              handleInputChange(
                                "provinsiDomisili",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="kotaDomisili"
                            className="block text-sm font-medium mb-2"
                          >
                            Kota Domisili{" "}
                            <span className="text-red-500">*</span>
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
                            Nama Kontak Darurat{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="namaKontakDarurat"
                            name="namaKontakDarurat"
                            placeholder="Nama Kontak Darurat"
                            value={formData.namaKontakDarurat}
                            onChange={(e) =>
                              handleInputChange(
                                "namaKontakDarurat",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="noTelpKontakDarurat"
                            className="block text-sm font-medium mb-2"
                          >
                            No. Kontak Darurat{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="noTelpKontakDarurat"
                            name="noTelpKontakDarurat"
                            type="number"
                            placeholder="No. Kontak Darurat"
                            value={formData.noTelpKontakDarurat}
                            onChange={(e) =>
                              handleInputChange(
                                "noTelpKontakDarurat",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-medium mb-6">
                        Pendidikan Terakhir
                      </h2>
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
                            <SelectAction
                              id="pendidikanTerakhir"
                              name="pendidikanTerakhir"
                            >
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
                            Nama Institusi Pendidikan{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="namaInstitusiPendidikan"
                            name="namaInstitusiPendidikan"
                            placeholder="Nama Institusi Pendidikan"
                            value={formData.namaInstitusiPendidikan}
                            onChange={(e) =>
                              handleInputChange(
                                "namaInstitusiPendidikan",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="programStudi"
                            className="block text-sm font-medium mb-2"
                          >
                            Program Studi{" "}
                            <span className="text-red-500">*</span>
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
                )}
                {/* Step 2 */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-medium mb-6">Kepegawaian</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="statusKaryawan"
                          className="block text-sm font-medium mb-2"
                        >
                          Status Karyawan{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          name="statusKaryawan"
                          value={formData.statusKaryawan}
                          onValueChange={(value) =>
                            handleInputChange("statusKaryawan", value)
                          }
                        >
                          <SelectAction
                            id="statusKaryawan"
                            name="statusKaryawan"
                          >
                            <SelectValue placeholder="Status Karyawan..." />
                          </SelectAction>
                          <SelectContent id="statusKaryawan">
                            <SelectItem value="Tetap">Tetap</SelectItem>
                            <SelectItem value="Kontrak">Kontrak</SelectItem>
                            <SelectItem value="Magang">Magang</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <InputDate
                        label="Tanggal Bergabung"
                        htmlFor="tanggalBergabung"
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
                          onValueChange={(value) =>
                            handleInputChange("organisasi", value)
                          }
                        >
                          <SelectAction id="organisasi" name="organisasi">
                            <SelectValue placeholder="Pilih Organisasi..." />
                          </SelectAction>
                          <SelectContent id="organisasi">
                            <SelectItem value="IT">IT Department</SelectItem>
                            <SelectItem value="HR">HR Department</SelectItem>
                            <SelectItem value="Finance">
                              Finance Department
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor="jabatan"
                          className="block text-sm font-medium mb-2"
                        >
                          Jabatan <span className="text-red-500">*</span>
                        </label>
                        <Select
                          name="jabatan"
                          value={formData.jabatan}
                          onValueChange={(value) =>
                            handleInputChange("jabatan", value)
                          }
                        >
                          <SelectAction id="jabatan" name="jabatan">
                            <SelectValue placeholder="Pilih Jabatan..." />
                          </SelectAction>
                          <SelectContent id="jabatan">
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Staff">Staff</SelectItem>
                            <SelectItem value="Supervisor">
                              Supervisor
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor="pangkat"
                          className="block text-sm font-medium mb-2"
                        >
                          Pangkat <span className="text-red-500">*</span>
                        </label>
                        <Select
                          name="pangkat"
                          value={formData.pangkat}
                          onValueChange={(value) =>
                            handleInputChange("pangkat", value)
                          }
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
                        <label
                          htmlFor="jadwal"
                          className="block text-sm font-medium mb-2"
                        >
                          Jadwal <span className="text-red-500">*</span>
                        </label>
                        <Select
                          name="jadwal"
                          value={formData.jadwal}
                          onValueChange={(value) =>
                            handleInputChange("jadwal", value)
                          }
                        >
                          <SelectAction id="jadwal" name="jadwal">
                            <SelectValue placeholder="Pilih Jadwal..." />
                          </SelectAction>
                          <SelectContent id="jadwal">
                            <SelectItem value="Shift 1">
                              Shift 1 (07:00 - 15:00)
                            </SelectItem>
                            <SelectItem value="Shift 2">
                              Shift 2 (15:00 - 23:00)
                            </SelectItem>
                            <SelectItem value="Shift 3">
                              Shift 3 (23:00 - 07:00)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <InputDate
                        label="Tanggal Masa Akhir Kerja"
                        htmlFor="tanggalMasaAkhirKerja"
                        fieldName="tanggalMasaAkhirKerja"
                        value={formData.tanggalMasaAkhirKerja}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                )}
                {/* Step 3 */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-medium mb-6">NPWP</h2>
                    <div className="space-y-6">
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="npwp"
                              className="block text-sm font-medium mb-2"
                            >
                              NPWP <span className="text-red-500">*</span>
                            </label>
                            <Input
                              id="npwp"
                              name="npwp"
                              placeholder="No NPWP"
                              value={formData.npwp}
                              onChange={(e) =>
                                handleInputChange("npwp", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="npwpPemotong"
                              className="block text-sm font-medium mb-2"
                            >
                              NPWP Pemotong{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Input
                              id="npwpPemotong"
                              name="npwpPemotong"
                              placeholder="No NPWP"
                              value={formData.npwpPemotong}
                              onChange={(e) =>
                                handleInputChange(
                                  "npwpPemotong",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-4">BPJS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="noBpjsKetenagakerjaan"
                              className="block text-sm font-medium mb-2"
                            >
                              No BPJS Ketenagakerjaan
                            </label>
                            <Input
                              id="noBpjsKetenagakerjaan"
                              name="noBpjsKetenagakerjaan"
                              placeholder="Masukan No/Nomor bpjs"
                              value={formData.noBpjsKetenagakerjaan}
                              onChange={(e) =>
                                handleInputChange(
                                  "noBpjsKetenagakerjaan",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <InputDate
                            label="Tanggal Efektif BPJS Ketenagakerjaan (Opsional)"
                            htmlFor="tanggalEfektifBpjsKetenagakerjaan"
                            fieldName="tanggalEfektifBpjsKetenagakerjaan"
                            value={formData.tanggalEfektifBpjsKetenagakerjaan}
                            onChange={handleDateChange}
                            hideAsterisk={true}
                          />
                          <div>
                            <label
                              htmlFor="noBpjsKesehatan"
                              className="block text-sm font-medium mb-2"
                            >
                              No BPJS Kesehatan
                            </label>
                            <Input
                              id="noBpjsKesehatan"
                              name="noBpjsKesehatan"
                              placeholder="No BPJS Kesehatan"
                              value={formData.noBpjsKesehatan}
                              onChange={(e) =>
                                handleInputChange(
                                  "noBpjsKesehatan",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <InputDate
                            label="Tanggal Efektif BPJS Kesehatan (Opsional)"
                            htmlFor="tanggalEfektifBpjsKesehatan"
                            fieldName="tanggalEfektifBpjsKesehatan"
                            value={formData.tanggalEfektifBpjsKesehatan}
                            onChange={handleDateChange}
                            hideAsterisk={true}
                          />
                          <div>
                            <label
                              htmlFor="jumlahAngsuranKeluarga"
                              className="block text-sm font-medium mb-2"
                            >
                              Jumlah Anggota Keluarga BPJS Ketenagakerjaan
                            </label>
                            <Input
                              id="jumlahAngsuranKeluarga"
                              name="jumlahAngsuranKeluarga"
                              placeholder="Anggota Keluarga"
                              value={formData.jumlahAngsuranKeluarga}
                              onChange={(e) =>
                                handleInputChange(
                                  "jumlahAngsuranKeluarga",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className="text-xl font-medium mb-6">
                        Nomor Rekening
                      </h2>
                      <hr className="-mx-6 mb-4" />
                      <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
                        <div className="flex flex-col xl:flex-row px-4 lg:px-6 xl:items-center lg:justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <h2 className="text-lg font-medium">
                              Daftar Nomor Rekening
                            </h2>
                          </div>
                          <Button
                            type="button"
                            className="flex items-center gap-2 whitespace-nowrap bg-transparent hover:bg-transparent text-primary border border-primary"
                            onClick={() => setIsFirstModalOpen(true)}
                          >
                            Tambah Nomor Rekening
                            <Plus size={16} />
                          </Button>
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
                                    Tambah Nomor Rekening
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
                                      onClick={handleAddAccount}
                                    >
                                      Tambahkan
                                    </Button>
                                  </div>
                                </div>
                                <div className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins">
                                  <div>
                                    <label
                                      htmlFor="namaBank"
                                      className="block text-sm font-medium mb-2"
                                    >
                                      Nama Bank{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                      id="namaBank"
                                      name="namaBank"
                                      placeholder="Nama Bank"
                                      value={formData.namaBank}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "namaBank",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="cabangBank"
                                      className="block text-sm font-medium mb-2"
                                    >
                                      Cabang Bank{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                      id="cabangBank"
                                      name="cabangBank"
                                      placeholder="Cabang Bank"
                                      value={formData.cabangBank}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "cabangBank",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="namaPemilikRekening"
                                      className="block text-sm font-medium mb-2"
                                    >
                                      Nama Pemilik Rekening{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                      id="namaPemilikRekening"
                                      name="namaPemilikRekening"
                                      placeholder="Nama Pemilik Rekening"
                                      value={formData.namaPemilikRekening}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "namaPemilikRekening",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="nomorRekening"
                                      className="block text-sm font-medium mb-2"
                                    >
                                      Nomor Rekening Bank{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                      id="nomorRekening"
                                      name="nomorRekening"
                                      type="number"
                                      placeholder="Nomor Rekening Bank"
                                      value={formData.nomorRekening}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "nomorRekening",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </ModalHeader>
                            </ModalContent>
                          </Modal>
                          <Modal
                            open={isSecondModalOpen}
                            onClose={handleCloseSecondModal}
                            showCloseIcon={false}
                          >
                            <ModalContent className="max-w-[20rem] lg:max-w-[26rem]">
                              <ModalHeader className="mb-6 flex flex-col items-center justify-center space-y-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
                                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                                    <Check
                                      size={20}
                                      color="#FFFFFF"
                                      weight="bold"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1 text-center font-poppins">
                                  <ModalTitle className="text-xl font-medium">
                                    Tambah Rekening Berhasil
                                  </ModalTitle>
                                  <ModalDescription className="text-sm text-[#455468]">
                                    Rekening Karyawan berhasil ditambahkan
                                  </ModalDescription>
                                </div>
                              </ModalHeader>
                              <ModalFooter className="justify-center">
                                <Button
                                  type="button"
                                  onClick={handleCloseSecondModal}
                                  className="flex w-full items-center gap-2 font-poppins whitespace-nowrap bg-primary hover:bg-primary text-white font-medium"
                                >
                                  Confirm
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </div>
                        <div className="overflow-x-auto">
                          <TableRekening
                            rekeningData={rekenings}
                            setRekeningData={setRekenings}
                            setFormData={setFormData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Navigation */}
              <div className="flex justify-end items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    color="secondary"
                    onClick={handleBack}
                  >
                    Kembali
                  </Button>
                ) : (
                  <Link to="/karyawan">
                    <Button variant="outline" color="secondary">
                      Batalkan
                    </Button>
                  </Link>
                )}
                <div className="flex gap-2">
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-primary hover:bg-primary/90 px-6"
                    >
                      Selanjutnya
                      <CaretRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-primary/90 px-6"
                    >
                      Selanjutnya
                      <CaretRight size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
