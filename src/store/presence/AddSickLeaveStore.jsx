import { toast } from "keep-react";
import { create } from "zustand";
import { format } from "date-fns";

const initialFormData = {
  nama: "",
  tanggalPengajuan: "",
  jumlahHari: "",
  tanggalIzinSakit: "",
  status: "",
  keterangan: "",
};

export const useAddSickLeaveStore = create((set, get) => ({
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

  handleAddSickLeave: () => {
    const { formData } = get();

    console.log(formData);

    if (
      !formData.nama.trim() ||
      !formData.tanggalPengajuan.trim() ||
      !formData.jumlahHari.trim() ||
      !formData.tanggalIzinSakit.trim() ||
      !formData.status.trim() ||
      !formData.keterangan.trim()
    ) {
      toast.error("Semua field sakit wajib diisi!");
      return;
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
