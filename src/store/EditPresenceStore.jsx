import { toast } from "keep-react";
import { create } from "zustand";

const initialFormData = {
  id: null,
  idEmployee: null,
  nama: "",
  shift: "",
  status: "",
  masuk: "",
  keluar: "",
  terlambat: "",
  durasiTerlambat: "",
};

export const useEditPresenceStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  presence: null,

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  setPresence: (idEmployee, idPresence, attendanceData) => {
    const employee = attendanceData.find((emp) => emp.id === idEmployee);
    const presenceData = employee?.presensi.find(
      (presensi) => presensi.id === idPresence
    );
    set({
      presence: presenceData,
      formData: {
        ...initialFormData,
        id: presenceData?.id || null,
        idEmployee: employee?.id || null,
        nama: employee?.nama || "",
        shift: presenceData?.shift || "",
        status: presenceData?.status || "",
        masuk: presenceData?.masuk || "",
        keluar: presenceData?.keluar || "",
        terlambat: presenceData?.terlambat || "",
        durasiTerlambat: presenceData?.durasiTerlambat || "",
      },
    });
  },

  handleEditPresence: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.shift.trim() ||
      !formData.status.trim() ||
      !formData.masuk.trim() ||
      !formData.keluar.trim() ||
      !formData.terlambat.trim() ||
      !formData.durasiTerlambat.trim()
    ) {
      toast.error("Semua field wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      presence: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, presence: null }),
}));
