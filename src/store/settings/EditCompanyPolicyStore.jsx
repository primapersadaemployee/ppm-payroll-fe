import { toast } from "keep-react";
import { create } from "zustand";

const initialFormData = {
  id: null,
  judul: "",
  isi: "",
  lampiran: null,
};

export const useEditCompanyPolicyStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  companyPolicy: null,

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  handleFileChange: (e) => {
    if (e.target.files && e.target.files[0]) {
      set((state) => ({
        formData: {
          ...state.formData,
          lampiran: e.target.files[0],
        },
      }));
    }
  },

  setCompanyPolicy: (id, companyPolicy) => {
    const companyPolicyData = companyPolicy.find((policy) => policy.id === id);
    set({
      companyPolicy: companyPolicyData,
      formData: {
        ...initialFormData,
        id: companyPolicyData?.id || null,
        judul: companyPolicyData?.judul || "",
        isi: companyPolicyData?.isi || "",
      },
    });
  },

  handleEditCompanyPolicy: () => {
    const { formData } = get();

    // Validasi
    if (!formData.judul.trim() || !formData.isi.trim()) {
      toast.error("Semua field wajib diisi!");
      return false;
    }

    const data = new FormData();

    // Add all fields from formData to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "lampiran" && formData[key]) {
        data.append("lampiran", formData[key]);
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
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      companyPolicy: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, companyPolicy: null }),
}));
