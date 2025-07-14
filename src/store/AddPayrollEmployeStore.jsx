import { toast } from 'keep-react';
import { create } from 'zustand';
import { format } from 'date-fns';

const initialFormData = {
  tanggalEfektif: '',
  gajiBulanan: false,
  thr: false,
  gajiPokok: 0,
  koperasi: 0,
  jaminanKeselamatanKerja: '',
  jaminanKematian: '',
  metodePerhitunganPph: '',
  pengaliIuranBpjs: '',
  jaminanHariTua: false,
  jaminanPensiunan: false,
  bpjsDitanggungPerusahaan: '',
  total: 0,
};

export const useAddPayrollEmployeStore = create((set, get) => ({
  // State
  formData: initialFormData,
  isFirstModalOpen: false,
  isSecondModalOpen: false,

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

  //   handleSubmit: async (e) => {
  //     e.preventDefault();
  //     const { formData } = get();

  //     const data = new FormData();

  //     // Add all fields from formData to FormData
  //     Object.keys(formData).forEach((key) => {
  //       if (key === "image" && formData[key]) {
  //         data.append("image", formData[key]);
  //       } else if (formData[key]) {
  //         data.append(key, formData[key]);
  //       }
  //     });

  //     // Log FormData contents for debugging
  //     console.log("FormData contents:");
  //     for (let [key, value] of data.entries()) {
  //       console.log(`${key}: ${value instanceof File ? value.name : value}`);
  //     }

  //     try {
  //       // API call would go here
  //       //   toast.success("Berhasil menambahkan payroll karyawan.");

  //       // Reset form
  //       set({
  //         formData: initialFormData,
  //       });

  //       //   router("/employee");
  //     } catch (err) {
  //       console.error("Error:", err.message);
  //       toast.error(err.message);
  //     }
  //   },

  handleAddPayrollEmployee: () => {
    const { formData } = get();

    const { gajiPokok, koperasi } = formData;
    let total = formData.total;
    total = gajiPokok - koperasi;

    formData.total = total;

    console.log(formData);

    if (
      !formData.tanggalEfektif.trim() ||
      !formData.gajiPokok.trim() ||
      !formData.jaminanKeselamatanKerja.trim() ||
      !formData.jaminanKematian.trim() ||
      !formData.metodePerhitunganPph.trim() ||
      !formData.pengaliIuranBpjs.trim() ||
      !formData.bpjsDitanggungPerusahaan.trim()
    ) {
      toast.error('Semua field payroll wajib diisi!');
      return;
    }

    set({
      formData: initialFormData,
      isFirstModalOpen: false,
      isSecondModalOpen: true,
    });
  },

  setIsFirstModalOpen: (open) => set({ isFirstModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),

  handleCloseSecondModal: () => {
    set({ isSecondModalOpen: false });
  },
}));
