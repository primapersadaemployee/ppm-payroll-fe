import { toast } from "keep-react";
import { create } from "zustand";

const initialFormData = {
  nama: "",
  tipe: "",
  hariPerhitungan: "",
  waktu: "",
  upah: "",
};

export const useAddOvertimeStore = create((set, get) => ({
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

  handleAddOvertime: () => {
    const { formData } = get();

    if (
      !formData.nama.trim() ||
      !formData.tipe.trim() ||
      !formData.hariPerhitungan.trim() ||
      !formData.waktu.trim() ||
      !formData.upah.trim()
    ) {
      toast.error("Semua field lembur wajib diisi!");
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
