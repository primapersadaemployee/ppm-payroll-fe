import { toast } from "keep-react";
import { create } from "zustand";
import { AttendanceLocationData } from "../../data/SettingData";

const initialFormData = {
  id: null,
  nama: "",
  alamat: "",
  latitude: "",
  longitude: "",
  radius: "",
  ip: "",
};

export const useEditAttendanceLocationStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  attendanceLocation: null,

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  setAttendanceLocation: (id, dataList) => {
    const attendanceLocation = dataList.find((item) => item.id === id);
    set({
      attendanceLocation: AttendanceLocationData,
      formData: {
        ...initialFormData,
        id: attendanceLocation?.id || null,
        nama: attendanceLocation?.nama || "",
        alamat: attendanceLocation?.alamat || "",
        latitude: attendanceLocation?.latitude || "",
        longitude: attendanceLocation?.longitude || "",
        radius: attendanceLocation?.radius || "",
        ip: attendanceLocation?.ip || "",
      },
    });
  },

  handleEditAttendanceLocation: () => {
    const { formData } = get();

    // Validasi
    if (!formData.nama.trim() || !formData.alamat.trim()) {
      toast.error("Semua field lokasi wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      attendanceLocation: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, attendanceLocation: null }),
}));
