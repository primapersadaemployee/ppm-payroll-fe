import { Input } from "keep-react";
import { useEditProfileStore } from "../../../store/settings/EditProfileStore";
import BaseModal from "./common/BaseModal";

export default function EditPasswordModal() {
  const {
    formData,
    isEditPasswordModalOpen,
    setIsEditPasswordModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleEditPassword,
  } = useEditProfileStore();

  const handleModalSuccess = () => {
    const success = handleEditPassword();
    if (success) {
      setIsEditPasswordModalOpen(false);
      setIsSecondModalOpen(true);
    }
  };

  return (
    <BaseModal
      isOpen={isEditPasswordModalOpen}
      onClose={() => {
        setIsEditPasswordModalOpen(false);
      }}
      title="Ubah Password"
      onSave={handleModalSuccess}
    >
      <form
        id="edit-password"
        name="edit-password"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        <div>
          <label
            htmlFor="passwordLama"
            className="block text-sm font-medium mb-2"
          >
            Password Lama
          </label>
          <Input
            id="passwordLama"
            name="passwordLama"
            type="password"
            autoComplete="off"
            placeholder="********"
            value={formData.passwordLama}
            onChange={(e) => handleInputChange("passwordLama", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="passwordBaru"
            className="block text-sm font-medium mb-2"
          >
            Password Baru
          </label>
          <Input
            id="passwordBaru"
            name="passwordBaru"
            type="password"
            autoComplete="off"
            placeholder="********"
            value={formData.passwordBaru}
            onChange={(e) => handleInputChange("passwordBaru", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="konfPasswordBaru"
            className="block text-sm font-medium mb-2"
          >
            Ulangi Password Baru
          </label>
          <Input
            id="konfPasswordBaru"
            name="konfPasswordBaru"
            type="password"
            autoComplete="off"
            placeholder="********"
            value={formData.konfPasswordBaru}
            onChange={(e) =>
              handleInputChange("konfPasswordBaru", e.target.value)
            }
          />
        </div>
      </form>
    </BaseModal>
  );
}
