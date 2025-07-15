import { toast } from "keep-react";
import { create } from "zustand";
import { format } from "date-fns";

const initialFormData = {
  id: null,
  nama: "",
  tanggalPengajuan: "",
  jumlahHari: "",
  tanggalIzin: "",
  status: "",
  keterangan: "",
};

export const useEditUnpaidLeaveStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  unpaidLeave: null,

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

  setUnpaidLeave: (id, unpaidLeave) => {
    const unpaidLeaveData = unpaidLeave.find((leave) => leave.id === id);
    set({
      unpaidLeave: unpaidLeaveData,
      formData: {
        ...initialFormData,
        id: unpaidLeaveData?.id || null,
        nama: unpaidLeaveData?.nama || "",
        tanggalPengajuan: unpaidLeaveData?.tanggalPengajuan || "",
        jumlahHari: unpaidLeaveData?.jumlahHari || "",
        tanggalIzin: unpaidLeaveData?.tanggalIzin || "",
        status: unpaidLeaveData?.status || "",
        keterangan: unpaidLeaveData?.keterangan || "",
      },
    });
  },

  handleEditUnpaidLeave: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.tanggalPengajuan.trim() ||
      !formData.jumlahHari ||
      !formData.tanggalIzin.trim() ||
      !formData.status.trim() ||
      !formData.keterangan.trim()
    ) {
      toast.error("Semua field izin wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      unpaidLeave: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, unpaidLeave: null }),
}));
