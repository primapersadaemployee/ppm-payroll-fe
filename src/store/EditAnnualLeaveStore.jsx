import { toast } from 'keep-react';
import { create } from 'zustand';
import { format } from 'date-fns';

const initialFormData = {
  id: null,
  nama: '',
  tanggalPengajuan: '',
  jumlahHari: '',
  tanggalCuti: '',
  status: '',
};

export const useEditAnnualLeaveStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  annualLeave: null,

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
        [fieldName]: date ? format(date, 'yyyy-MM-dd') : '',
      },
    }));
  },

  setAnnualLeave: (id, annualLeaves) => {
    const annualLeaveData = annualLeaves.find((leave) => leave.id === id);
    set({
      annualLeave: annualLeaveData,
      formData: {
        ...initialFormData,
        id: annualLeaveData?.id || null,
        nama: annualLeaveData?.nama || '',
        tanggalPengajuan: annualLeaveData?.tanggalPengajuan || '',
        jumlahHari: annualLeaveData?.jumlahHari || '',
        tanggalCuti: annualLeaveData?.tanggalCuti || '',
        status: annualLeaveData?.status || '',
      },
    });
  },

  handleEditAnnualLeave: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.nama.trim() ||
      !formData.tanggalPengajuan.trim() ||
      !formData.jumlahHari ||
      !formData.tanggalCuti.trim() ||
      !formData.status.trim()
    ) {
      toast.error('Semua field wajib diisi!');
      return false;
    }

    console.log('Data yang akan disimpan:', formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
      annualLeave: null,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () => set({ formData: initialFormData, annualLeave: null }),
}));
