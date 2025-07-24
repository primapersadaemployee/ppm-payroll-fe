import { Input, Textarea } from "keep-react";
import { useEditCompanyStore } from "../../../store/settings/EditCompanyStore";
import BaseModal from "./common/BaseModal";

export default function EditCompanyModal() {
  const {
    formData,
    previewImage,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleImageChange,
    handleEditCompany,
  } = useEditCompanyStore();

  const handleModalSuccess = () => {
    const success = handleEditCompany();
    if (success) {
      setIsFirstModalOpen(false);
      setIsSecondModalOpen(true);
    }
  };

  return (
    <BaseModal
      isOpen={isFirstModalOpen}
      onClose={() => {
        setIsFirstModalOpen(false);
      }}
      title="Edit Info Perusahaan"
      onSave={handleModalSuccess}
    >
      <form
        id="edit-company"
        name="edit-company"
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
            <h3 className="font-medium">Logo Perusahaan</h3>
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
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama Perusahaan
          </label>
          <Input
            id="nama"
            name="nama"
            placeholder="PT. Nama Perusahaan"
            value={formData.nama}
            onChange={(e) => handleInputChange("nama", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Alamat Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="johhdoe@gmail.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="noTelp" className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <Input
            id="noTelp"
            name="noTelp"
            placeholder="089577123812"
            value={formData.noTelp}
            onChange={(e) => handleInputChange("noTelp", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="negara" className="block text-sm font-medium mb-2">
            Negara
          </label>
          <Input
            id="negara"
            name="negara"
            placeholder="Indonesia"
            value={formData.negara}
            onChange={(e) => handleInputChange("negara", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="npwpPerusahaan"
            className="block text-sm font-medium mb-2"
          >
            Nomor NPWP Perusahaan
          </label>
          <Input
            id="npwpPerusahaan"
            name="npwpPerusahaan"
            placeholder="1230918923"
            value={formData.npwpPerusahaan}
            onChange={(e) =>
              handleInputChange("npwpPerusahaan", e.target.value)
            }
          />
        </div>
        <div>
          <label
            htmlFor="alamatPenagihan"
            className="block text-sm font-medium mb-2"
          >
            Alamat Penagihan
          </label>
          <Textarea
            id="alamatPenagihan"
            name="alamatPenagihan"
            rows={8}
            placeholder="Alamat Penagihan"
            value={formData.alamatPenagihan}
            onChange={(e) =>
              handleInputChange("alamatPenagihan", e.target.value)
            }
          />
        </div>
        <div>
          <label
            htmlFor="alamatPengiriman"
            className="block text-sm font-medium mb-2"
          >
            Alamat Pengiriman
          </label>
          <Textarea
            id="alamatPengiriman"
            name="alamatPengiriman"
            rows={8}
            placeholder="Alamat Pengiriman"
            value={formData.alamatPengiriman}
            onChange={(e) =>
              handleInputChange("alamatPengiriman", e.target.value)
            }
          />
        </div>
      </form>
    </BaseModal>
  );
}
