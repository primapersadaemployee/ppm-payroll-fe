import { create } from "zustand";
import { format } from "date-fns";
import { toast } from "keep-react";

const initialFormData = {
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
};

export const useAddEmployeeStore = create((set, get) => ({
  // State
  currentStep: 1,
  formData: initialFormData,
  rekenings: [],
  isFirstModalOpen: false,
  isSecondModalOpen: false,

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),

  handleImageChange: (e) => {
    if (e.target.files && e.target.files[0]) {
      set((state) => ({
        formData: {
          ...state.formData,
          image: e.target.files[0],
        },
      }));
    }
  },

  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  handleDateChange: (fieldName, date) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [fieldName]: date ? format(date, "yyyy-MM-dd") : "",
      },
    }));
  },

  validateStep: (step) => {
    const { formData } = get();
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
  },

  handleNext: () => {
    const { currentStep, validateStep } = get();

    if (currentStep === 1 || currentStep === 2) {
      const validationError = validateStep(currentStep);
      if (validationError) {
        toast.error(validationError);
        return;
      }
    }

    if (currentStep < 3) {
      set({ currentStep: currentStep + 1 });
    }
  },

  handleBack: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  handleSubmit: async (e, router) => {
    e.preventDefault();
    const { formData, rekenings, validateStep } = get();

    const validationError = validateStep(3);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const data = new FormData();

    // Add all fields from formData to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData[key]) {
        data.append("image", formData[key]);
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    // Add rekenings array
    data.append("rekenings", JSON.stringify(rekenings));

    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      // API call would go here
      toast.success("Berhasil menambahkan data karyawan.");

      // Reset form
      set({
        formData: initialFormData,
        rekenings: [],
        currentStep: 1,
      });

      router("/employee");
    } catch (err) {
      console.error("Error:", err.message);
      toast.error(err.message);
    }
  },

  handleAddAccount: () => {
    const { formData } = get();

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

    set((state) => ({
      rekenings: [...state.rekenings, newRekening],
      isFirstModalOpen: false,
      isSecondModalOpen: true,
    }));
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  setRekenings: (rekenings) => set({ rekenings }),

  handleCloseSecondModal: () => {
    set({ isSecondModalOpen: false });
  },

  // Steps configuration
  getSteps: () => {
    const { currentStep } = get();
    return [
      {
        id: 1,
        title: "Personal",
        isComplete: currentStep > 1,
        image: "/bg-personal.png",
      },
      {
        id: 2,
        title: "Kepegawaian",
        isComplete: currentStep > 2,
        image: "/bg-kepegawaian.png",
      },
      {
        id: 3,
        title: "Payroll",
        isComplete: currentStep > 3,
        image: "/bg-payroll.png",
      },
    ];
  },
}));
