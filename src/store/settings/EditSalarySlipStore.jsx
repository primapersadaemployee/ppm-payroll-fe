import { toast } from "keep-react";
import { create } from "zustand";
import { SallarySlipData } from "../../data/SettingData";

const initialFormData = {
  id: null,
  nama: "",
  periode: "",
  lamaPeriode: "",
  absensiTerakhir: "",
  komponenPendapatan: [],
  komponenPemotongan: [],
};

export const useEditSalarySlipStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  salarySlip: null,

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  handleToggleComponent: (type, komponen) => {
    set((state) => {
      const current = state.formData[type];
      const exists = current.find((item) => item.id === komponen.id);
      const updated = exists
        ? current.filter((item) => item.id !== komponen.id)
        : [...current, komponen];

      return {
        formData: {
          ...state.formData,
          [type]: updated,
        },
      };
    });
  },

  setSalarySlip: (id, dataList) => {
    const salarySlip = dataList.find((item) => item.id === id);
    set({
      salarySlip: SallarySlipData,
      formData: {
        ...initialFormData,
        id: salarySlip?.id || null,
        nama: salarySlip?.nama || "",
        periode: salarySlip?.periode || "",
        lamaPeriode: salarySlip?.lamaPeriode || "",
        absensiTerakhir: salarySlip?.absensiTerakhir || 0,
        komponenPendapatan: salarySlip?.komponenPendapatan || [],
        komponenPemotongan: salarySlip?.komponenPemotongan || [],
      },
    });
  },

  handleEditSalarySlip: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.periode.trim() ||
      !formData.lamaPeriode.trim()
    ) {
      toast.error("Semua field slip gaji wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      salarySlip: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, salarySlip: null }),
}));
