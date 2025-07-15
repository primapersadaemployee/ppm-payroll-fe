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

export const useEditPermissionLeaveStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  permissionLeave: null,

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

  setPermissionLeave: (id, permissionLeave) => {
    const permissionLeaveData = permissionLeave.find(
      (leave) => leave.id === id
    );
    set({
      permissionLeave: permissionLeaveData,
      formData: {
        ...initialFormData,
        id: permissionLeaveData?.id || null,
        nama: permissionLeaveData?.nama || "",
        tanggalPengajuan: permissionLeaveData?.tanggalPengajuan || "",
        jumlahHari: permissionLeaveData?.jumlahHari || "",
        tanggalIzin: permissionLeaveData?.tanggalIzin || "",
        status: permissionLeaveData?.status || "",
        keterangan: permissionLeaveData?.keterangan || "",
      },
    });
  },

  handleEditPermissionLeave: () => {
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
      permissionLeave: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, permissionLeave: null }),
}));
