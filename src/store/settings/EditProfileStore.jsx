import { toast } from "keep-react";
import { create } from "zustand";
import { ProfileData } from "../../data/SettingData";

const initialFormData = {
  id: null,
  nama: "",
  status: "",
  divisi: "",
  email: "",
  noHp: "",
  images: "",
  passwordLama: "",
  passwordBaru: "",
  konfPasswordBaru: "",
};

export const useEditProfileStore = create((set, get) => ({
  // State
  formData: initialFormData,
  previewImage: "",
  isEditProfileModalOpen: false,
  isEditPasswordModalOpen: false,
  isSecondModalOpen: false,
  profile: null,
  modalTitle: "",
  modalDesc: "",

  // Actions
  handleInputChange: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  handleImageChange: (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      set((state) => ({
        formData: {
          ...state.formData,
          images: file, // Simpan file asli
        },
        previewImage: URL.createObjectURL(file), // Buat URL preview
      }));
    }
  },

  setProfile: () => {
    const profile = ProfileData;
    set({
      profile: ProfileData,
      formData: {
        ...initialFormData,
        id: profile?.id || null,
        nama: profile?.nama || "",
        status: profile?.status || "",
        divisi: profile?.divisi || "",
        email: profile?.email || "",
        noHp: profile?.noHp || "",
        images: profile?.images || "",
        passwordLama: profile?.passwordLama || "",
        passwordBaru: profile?.passwordBaru || "",
        konfPasswordBaru: profile?.konfPasswordBaru || "",
      },
      previewImage: profile?.images || "", // Inisialisasi preview dengan URL awal
    });
  },

  handleEditProfile: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.email.trim() ||
      !formData.nama.trim() ||
      !formData.noHp.trim()
    ) {
      toast.error("Semua field profile wajib diisi!");
      return false;
    }

    const data = new FormData();

    // Add all fields from formData to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "images" && formData[key]) {
        data.append("images", formData[key]);
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    set({
      formData: initialFormData,
      previewImage: "", // Reset preview setelah submit
      isEditProfileModalOpen: false,
      isSecondModalOpen: true,
      profile: null,
      modalTitle: "Edit Profile Berhasil",
      modalDesc: "Profile berhasil diubah.",
    });

    return true;
  },

  handleEditPassword: () => {
    const { formData } = get();

    // Validasi
    if (
      !formData.passwordLama.trim() ||
      !formData.passwordBaru.trim() ||
      !formData.konfPasswordBaru.trim()
    ) {
      toast.error("Semua field password wajib diisi!");
      return false;
    }

    console.log("Data yang akan disimpan:", formData);

    set({
      formData: initialFormData,
      previewImage: "", // Reset preview setelah submit
      isEditPasswordModalOpen: false,
      isSecondModalOpen: true,
      profile: null,
      modalTitle: "Edit Password Berhasil",
      modalDesc: "Password berhasil diubah.",
    });

    return true;
  },

  setIsEditProfileModalOpen: (open) => set({ isEditProfileModalOpen: open }),
  setIsEditPasswordModalOpen: (open) => set({ isEditPasswordModalOpen: open }),
  setIsSecondModalOpen: (open) => set({ isSecondModalOpen: open }),
  resetForm: () =>
    set({
      formData: initialFormData,
      previewImage: "",
      profile: null,
      modalTitle: "",
      modalDesc: "",
    }),
}));
