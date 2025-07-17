import { toast } from "keep-react";
import { create } from "zustand";
import { OvertimeData } from "../../data/SettingData";

const initialFormData = {
  id: null,
  nama: "",
  tipe: "",
  hariPerhitungan: "",
  waktu: "",
  upah: "",
};

export const useEditOvertimeStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  overtime: null,

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  setOvertime: (id, dataList) => {
    const overtime = dataList.find((item) => item.id === id);
    set({
      overtime: OvertimeData,
      formData: {
        ...initialFormData,
        id: overtime?.id || null,
        nama: overtime?.nama || "",
        tipe: overtime?.tipe || "",
        hariPerhitungan: overtime?.hariPerhitungan || "",
        waktu: overtime?.waktu || "",
        upah: overtime?.upah || "",
      },
    });
  },

  handleEditOvertime: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.tipe.trim() ||
      !formData.hariPerhitungan.trim() ||
      !formData.waktu.trim() ||
      !formData.upah.trim()
    ) {
      toast.error("Semua field lembur wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      overtime: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, overtime: null }),
}));
