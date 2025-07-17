import { toast } from "keep-react";
import { create } from "zustand";
import { format } from "date-fns";
import { WorkScheduleData } from "../../data/SettingData";

const initialFormData = {
  id: null,
  nama: "",
  hariKerja: "",
  hariLibur: "",
  tanggalEfektif: "",
};

export const useEditWorkScheduleStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  workSchedule: null,

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

  setWorkSchedule: (id, dataList) => {
    const workSchedule = dataList.find((item) => item.id === id);
    set({
      workSchedule: WorkScheduleData,
      formData: {
        ...initialFormData,
        id: workSchedule?.id || null,
        nama: workSchedule?.nama || "",
        hariKerja: workSchedule?.hariKerja || "",
        hariLibur: workSchedule?.hariLibur || "",
        tanggalEfektif: workSchedule?.tanggalEfektif || "",
      },
    });
  },

  handleEditWorkSchedule: () => {
    const { formData } = get();

    // Validasi
    if (!formData.nama.trim() || !formData.tanggalEfektif.trim()) {
      toast.error("Semua field rekening perusahaan wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      workSchedule: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, workSchedule: null }),
}));
