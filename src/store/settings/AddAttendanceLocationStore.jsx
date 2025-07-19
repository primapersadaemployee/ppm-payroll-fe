import { toast } from "keep-react";
import { create } from "zustand";

const initialFormData = {
  nama: "",
  alamat: "",
  latitude: "",
  longitude: "",
  radius: "",
  ip: "",
};

export const useAddAttendanceLocationStore = create((set, get) => ({
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

  handleAddAttendanceLocation: () => {
    const { formData } = get();

    if (
      !formData.nama.trim() ||
      !formData.alamat.trim() ||
      !formData.latitude.trim() ||
      !formData.longitude.trim()
    ) {
      toast.error("Semua field lokasi perusahaan wajib diisi!");
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
