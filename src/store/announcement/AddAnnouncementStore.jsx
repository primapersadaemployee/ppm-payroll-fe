import { toast } from "keep-react";
import { create } from "zustand";
import { format } from "date-fns";

const initialFormData = {
  isiPengumuman: "",
  organisasi: "",
  dikirimKeKaryawan: "",
  tanggalAkhirPublikasi: "",
};

export const useAddAnnouncementStore = create((set, get) => ({
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

  handleAddAnnouncement: () => {
    const { formData } = get();

    console.log(formData);

    if (
      !formData.isiPengumuman.trim() ||
      !formData.organisasi.trim() ||
      !formData.dikirimKeKaryawan.trim() ||
      !formData.tanggalAkhirPublikasi.trim()
    ) {
      toast.error("Semua field pengumuman wajib diisi!");
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
