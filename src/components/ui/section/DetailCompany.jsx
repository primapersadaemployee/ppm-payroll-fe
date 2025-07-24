import { useEffect, useState } from "react";
import { CompanyData } from "../../../data/SettingData";
import { Button } from "keep-react";
import { useEditCompanyStore } from "../../../store/settings/EditCompanyStore";
import EditCompanyModal from "../modal/EditCompanyModal";
import ConfirmModal from "../modal/common/ConfirmModal";

export default function DetailCompany() {
  const [company, setCompany] = useState({});
  const {
    setCompany: setCompanyData,
    setIsFirstModalOpen,
    isSecondModalOpen,
    setIsSecondModalOpen,
    resetForm,
  } = useEditCompanyStore();

  useEffect(() => {
    setCompany(CompanyData);
  }, []);

  const handleEditCompany = () => {
    setCompanyData(CompanyData);
    setIsFirstModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex gap-5 items-center">
          <img
            src={company.images}
            alt={company.nama}
            className="w-14 h-14 lg:w-[100px] lg:h-[100px] object-contain object-center rounded-xl"
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm">Logo Perusahaan</span>
            <p className="text-black font-medium lg:text-lg 2xl:text-xl">
              {company.nama}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          color="secondary"
          onClick={() => handleEditCompany()}
        >
          Edit Info Perusahaan
        </Button>
      </div>
      <div className="p-5 bg-[#FAFAFA] rounded-xl">
        <div className="flex flex-col gap-4">
          <h4 className="text-black lg:text-lg font-medium">Data Perusahaan</h4>
          <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
            <span>Nama</span>
            <span className="text-black font-medium">{company?.nama}</span>
          </div>
          <div className="text-sm sm:text-base line-clamp-1 w-full flex justify-between flex-col lg:flex-row">
            <span>Alamat Email</span>
            <span className="text-black font-medium">{company?.email}</span>
          </div>
          <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
            <span>Nomor Telepon</span>
            <span className="text-black font-medium">{company?.noTelp}</span>
          </div>
          <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
            <span>Alamat Penagihan</span>
            <span className="text-black font-medium">
              {company?.alamatPenagihan}
            </span>
          </div>
          <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
            <span>Alamat Pengiriman</span>
            <span className="text-black font-medium">
              {company?.alamatPengiriman}
            </span>
          </div>
          <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
            <span>Negara</span>
            <span className="text-black font-medium">{company?.negara}</span>
          </div>
          <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
            <span>Nomor NPWP Perusahaan</span>
            <span className="text-black font-medium">
              {company?.npwpPerusahaan}
            </span>
          </div>
        </div>
      </div>
      <EditCompanyModal />
      <ConfirmModal
        open={isSecondModalOpen}
        onClose={() => {
          setIsSecondModalOpen(false);
          resetForm();
        }}
        title="Edit Perusahaan Berhasil"
        description="Perusahaan berhasil diubah."
        onClick={() => {
          setIsSecondModalOpen(false);
          resetForm();
        }}
      />
    </div>
  );
}
