import { toast } from "keep-react";
import { create } from "zustand";

const initialFormData = {
  nama: "",
  norek: "",
  pemegangRekening: "",
  kantorCabang: "",
};

export const useAddCompanyAccountStore = create((set, get) => ({
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

  handleAddCompanyAccount: () => {
    const { formData } = get();

    if (
      !formData.nama.trim() ||
      !formData.norek.trim() ||
      !formData.pemegangRekening.trim() ||
      !formData.kantorCabang.trim()
    ) {
      toast.error("Semua field rekening perusahaan wajib diisi!");
      return;
    }

    console.log("Data yang akan disimpan:", formData);

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
