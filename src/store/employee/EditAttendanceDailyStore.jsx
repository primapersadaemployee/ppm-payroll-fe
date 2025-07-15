import { format } from 'date-fns';
import { toast } from 'keep-react';
import { create } from 'zustand';

const initialFormData = {
  id: null,
  tanggal: '',
  shift: '',
  status: '',
  masuk: '',
  keluar: '',
  terlambat: '',
  durasiKeterlambatan: '',
};

export const useEditAttendanceDailyStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,
  kehadiran: null,

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

  setKehadiran: (id, attendances) => {
    const kehadiranData = attendances.find((kehadiran) => kehadiran.id === id);
    set({
      kehadiran: kehadiranData,
      formData: {
        ...initialFormData,
        id: kehadiranData?.id || null,
        tanggal: kehadiranData?.tanggal || '',
        shift: kehadiranData?.shift || '',
        status: kehadiranData?.status || '',
        masuk: kehadiranData?.masuk || '',
        keluar: kehadiranData?.keluar || '',
        terlambat: kehadiranData?.terlambat || '',
        durasiKeterlambatan: kehadiranData?.durasiKeterlambatan || '',
      },
    });
  },

  handleEditAttendanceDaily: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.tanggal.trim() ||
      !formData.shift.trim() ||
      !formData.status.trim() ||
      !formData.masuk.trim() ||
      !formData.keluar.trim() ||
      !formData.terlambat.trim() ||
      !formData.durasiKeterlambatan.trim()
    ) {
      toast.error('Semua field wajib diisi!');
      return false;
    }

    console.log('Data yang akan disimpan:', formData);

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
    });

    return true;
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
}));
