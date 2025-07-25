import { Input, Upload } from "keep-react";
import { useEditProfileStore } from "../../../store/settings/EditProfileStore";
import BaseModal from "./common/BaseModal";

export default function EditProfileModal() {
  const {
    formData,
    previewImage,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleImageChange,
    handleEditProfile,
  } = useEditProfileStore();

  const handleModalSuccess = () => {
    const success = handleEditProfile();
    if (success) {
      setIsEditProfileModalOpen(false);
      setIsSecondModalOpen(true);
    }
  };

  return (
    <BaseModal
      isOpen={isEditProfileModalOpen}
      onClose={() => {
        setIsEditProfileModalOpen(false);
      }}
      title="Edit Profil"
      onSave={handleModalSuccess}
    >
      <form
        id="edit-profile"
        name="edit-profile"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full ${
              previewImage ? "bg-transparent" : "bg-pink-100"
            } flex items-center justify-center`}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Upload size={24} className="text-pink-500" />
            )}
          </div>
          <div>
            <h3 className="font-medium">Gambar Profil</h3>
            <p className="text-sm text-gray-500">Min 600x600, PNG or JPEG</p>
            <Input
              name="image"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Alamat Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="jakirhoosen@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama Lengkap
          </label>
          <Input
            id="nama"
            name="nama"
            placeholder="Jakir Hoosen"
            value={formData.nama}
            onChange={(e) => handleInputChange("nama", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="noHp" className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <Input
            id="noHp"
            name="noHp"
            placeholder="089577123812"
            value={formData.noHp}
            onChange={(e) => handleInputChange("noHp", e.target.value)}
          />
        </div>
      </form>
    </BaseModal>
  );
}
