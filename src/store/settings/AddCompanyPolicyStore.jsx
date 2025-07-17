import { toast } from "keep-react";
import { create } from "zustand";

const initialFormData = {
  judul: "",
  isi: "",
  lampiran: null,
};

export const useAddCompanyPolicyStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,

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

  handleAddCompanyPolicy: () => {
    const { formData } = get();

    if (!formData.judul.trim() || !formData.isi.trim()) {
      toast.error("Semua field peraturan wajib diisi!");
      return;
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
    });
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData }),

  handleCloseSecondModal: () => {
    set({ isSecondModalOpen: false });
  },
}));
