import { toast } from "keep-react";
import { create } from "zustand";
import { CompanyData } from "../../data/SettingData";

const initialFormData = {
  id: null,
  nama: "",
  images: "",
  email: "",
  noTelp: "",
  alamatPenagihan: "",
  alamatPengiriman: "",
  negara: "",
  npwpPerusahaan: "",
};

export const useEditCompanyStore = create((set, get) => ({
  // State
  formData: initialFormData,
  previewImage: "",
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  company: null,

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  handleImageChange: (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      set((state) => ({
        formData: {
          ...state.formData,
          images: file, // Simpan file asli
        },
        previewImage: URL.createObjectURL(file), // Buat URL preview
      }));
    }
  },

  setCompany: () => {
    const company = CompanyData;
    set({
      company: CompanyData,
      formData: {
        ...initialFormData,
        id: company?.id || null,
        nama: company?.nama || "",
        images: company?.images || "",
        email: company?.email || "",
        noTelp: company?.noTelp || "",
        alamatPenagihan: company?.alamatPenagihan || "",
        alamatPengiriman: company?.alamatPengiriman || "",
        negara: company?.negara || "",
        npwpPerusahaan: company?.npwpPerusahaan || "",
      },
      previewImage: company?.images || "", // Inisialisasi preview dengan URL awal
    });
  },

  handleEditCompany: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.email.trim() ||
      !formData.noTelp.trim() ||
      !formData.alamatPenagihan.trim() ||
      !formData.alamatPengiriman.trim() ||
      !formData.negara.trim() ||
      !formData.npwpPerusahaan.trim()
    ) {
      toast.error("Semua field wajib diisi!");
      return false;
    }

    const data = new FormData();

    // Add all fields from formData to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "images" && formData[key]) {
        data.append("images", formData[key]);
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    set({
      formData: initialFormData,
      previewImage: "", // Reset preview setelah submit
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      company: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () =>
    set({ formData: initialFormData, previewImage: "", company: null }),
}));
