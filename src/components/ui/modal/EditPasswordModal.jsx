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
import { FloppyDisk } from "phosphor-react";
import { useEditProfileStore } from "../../../store/settings/EditProfileStore";

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
    <Modal
      open={isEditPasswordModalOpen}
      onClose={() => setIsEditPasswordModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Mengubah Password
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data password dibawah ini.
            </ModalDescription>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={() => setIsEditPasswordModalOpen(false)}
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
                onChange={(e) =>
                  handleInputChange("passwordLama", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("passwordBaru", e.target.value)
                }
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
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
