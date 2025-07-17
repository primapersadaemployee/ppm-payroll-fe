import { toast } from "keep-react";
import { create } from "zustand";

const initialFormData = {
  nama: "",
  periode: "",
  lamaPeriode: "",
  absensiTerakhir: 0,
  komponenPendapatan: [],
  komponenPemotongan: [],
};

export const useAddSalarySlipStore = create((set, get) => ({
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

  handleToggleComponent: (type, komponen) => {
    set((state) => {
      const current = state.formData[type];
      const exists = current.find((item) => item.id === komponen.id);
      const updated = exists
        ? current.filter((item) => item.id !== komponen.id)
        : [...current, komponen];

      return {
        formData: {
          ...state.formData,
          [type]: updated,
        },
      };
    });
  },

  handleAddSalarySlip: () => {
    const { formData } = get();

    if (
      !formData.nama.trim() ||
      !formData.periode.trim() ||
      !formData.lamaPeriode.trim()
    ) {
      toast.error("Semua field slip gaji wajib diisi!");
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
