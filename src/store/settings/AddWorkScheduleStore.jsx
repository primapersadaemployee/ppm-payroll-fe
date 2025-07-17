import { toast } from "keep-react";
import { create } from "zustand";
import { format } from "date-fns";

const initialFormData = {
  nama: "",
  hariKerja: "",
  hariLibur: "",
  tanggalEfektif: "",
};

export const useAddWorkScheduleStore = create((set, get) => ({
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

  handleDateChange: (fieldName, date) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [fieldName]: date ? format(date, "yyyy-MM-dd") : "",
      },
    }));
  },

  handleAddWorkSchedule: () => {
    const { formData } = get();

    if (
      !formData.nama.trim() ||
      !formData.hariKerja.trim() ||
      !formData.hariLibur.trim() ||
      !formData.tanggalEfektif.trim()
    ) {
      toast.error("Semua field jadwal kerja wajib diisi!");
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
