import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "keep-react";
import { FloppyDisk, Upload } from "phosphor-react";
import { useEditProfileStore } from "../../../store/settings/EditProfileStore";

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
    <Modal
      open={isEditProfileModalOpen}
      onClose={() => setIsEditProfileModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Edit Profil
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data profil dibawah ini.
            </ModalDescription>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={() => setIsEditProfileModalOpen(false)}
              >
                Kembali
              </Button>
              <Button
                type="button"
                className="flex items-center gap-2 font-poppins whitespace-nowrap bg-primary hover:bg-primary text-white font-medium"
                onClick={handleModalSuccess}
              >
                <FloppyDisk size={19} color="#FFFFFF" weight="bold" />
                Simpan
              </Button>
            </div>
          </div>
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
                <p className="text-sm text-gray-500">
                  Min 600x600, PNG or JPEG
                </p>
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
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
