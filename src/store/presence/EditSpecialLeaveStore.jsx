import { toast } from "keep-react";
import { create } from "zustand";
import { format } from "date-fns";

const initialFormData = {
  id: null,
  nama: "",
  jenisCuti: "",
  tanggalPengajuan: "",
  jumlahHari: "",
  tanggalCuti: "",
  status: "",
  keterangan: "",
};

export const useEditSpecialLeaveStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  specialLeave: null,

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

  setSpecialLeave: (id, specialLeave) => {
    const specialLeaveData = specialLeave.find((leave) => leave.id === id);
    set({
      specialLeave: specialLeaveData,
      formData: {
        ...initialFormData,
        id: specialLeaveData?.id || null,
        nama: specialLeaveData?.nama || "",
        jenisCuti: specialLeaveData?.jenisCuti || "",
        tanggalPengajuan: specialLeaveData?.tanggalPengajuan || "",
        jumlahHari: specialLeaveData?.jumlahHari || "",
        tanggalCuti: specialLeaveData?.tanggalCuti || "",
        status: specialLeaveData?.status || "",
        keterangan: specialLeaveData?.keterangan || "",
      },
    });
  },

  handleEditSpecialLeave: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.jenisCuti.trim() ||
      !formData.tanggalPengajuan.trim() ||
      !formData.jumlahHari ||
      !formData.tanggalCuti.trim() ||
      !formData.status.trim() ||
      !formData.keterangan.trim()
    ) {
      toast.error("Semua field wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      specialLeave: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, specialLeave: null }),
}));
