import { toast } from "keep-react";
import { create } from "zustand";
import { CompanyAccountData } from "../../data/SettingData";

const initialFormData = {
  id: null,
  nama: "",
  norek: "",
  pemegangRekening: "",
  kantorCabang: "",
};

export const useEditCompanyAccountStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  companyAccount: null,

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  setCompanyAccount: (id, dataList) => {
    const companyAccount = dataList.find((item) => item.id === id);
    set({
      companyAccount: CompanyAccountData,
      formData: {
        ...initialFormData,
        id: companyAccount?.id || null,
        nama: companyAccount?.nama || "",
        norek: companyAccount?.norek || "",
        pemegangRekening: companyAccount?.pemegangRekening || "",
        kantorCabang: companyAccount?.kantorCabang || "",
      },
    });
  },

  handleEditCompanyAccount: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.norek.trim() ||
      !formData.pemegangRekening.trim() ||
      !formData.kantorCabang.trim()
    ) {
      toast.error("Semua field rekening perusahaan wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      companyAccount: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, companyAccount: null }),
}));
