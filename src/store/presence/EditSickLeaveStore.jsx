import { toast } from "keep-react";
import { create } from "zustand";
import { format } from "date-fns";

const initialFormData = {
  id: null,
  nama: "",
  tanggalPengajuan: "",
  jumlahHari: "",
  tanggalIzinSakit: "",
  status: "",
  keterangan: "",
};

export const useEditSickLeaveStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  sickLeave: null,

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

  setSickLeave: (id, sickLeave) => {
    const sickLeaveData = sickLeave.find((leave) => leave.id === id);
    set({
      sickLeave: sickLeaveData,
      formData: {
        ...initialFormData,
        id: sickLeaveData?.id || null,
        nama: sickLeaveData?.nama || "",
        tanggalPengajuan: sickLeaveData?.tanggalPengajuan || "",
        jumlahHari: sickLeaveData?.jumlahHari || "",
        tanggalIzinSakit: sickLeaveData?.tanggalIzinSakit || "",
        status: sickLeaveData?.status || "",
        keterangan: sickLeaveData?.keterangan || "",
      },
    });
  },

  handleEditSickLeave: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.tanggalPengajuan.trim() ||
      !formData.jumlahHari ||
      !formData.tanggalIzinSakit.trim() ||
      !formData.status.trim() ||
      !formData.keterangan.trim()
    ) {
      toast.error("Semua field sakit wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      sickLeave: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, sickLeave: null }),
}));
