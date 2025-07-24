import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import { Gear } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import { useState, useEffect } from "react";
import { ProfileData } from "../../data/SettingData";
import { Badge, Button } from "keep-react";
import EditProfileModal from "../../components/ui/modal/EditProfileModal";
import ConfirmModal from "../../components/ui/modal/common/ConfirmModal";
import { useEditProfileStore } from "../../store/settings/EditProfileStore";
import EditPasswordModal from "../../components/ui/modal/EditPasswordModal";

export default function Profile() {
  const [profile, setProfile] = useState([]);

  const {
    setProfile: setProfileData,
    setIsEditProfileModalOpen,
    setIsEditPasswordModalOpen,
    isSecondModalOpen,
    setIsSecondModalOpen,
    resetForm,
    modalTitle,
    modalDesc,
  } = useEditProfileStore();

  useEffect(() => {
    setProfile(ProfileData);
  }, []);

  const handleEditProfile = () => {
    setProfileData(ProfileData);
    setIsEditProfileModalOpen(true);
  };

  const handleEditPassword = () => {
    setProfileData(ProfileData);
    setIsEditPasswordModalOpen(true);
  };

  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen text-[#455468]">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Breadcrumb Navigation */}
          <nav className="text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Gear size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Setting</span>
              <span>/</span>
              <span className="font-medium">Akun & Pengguna</span>
              <span>/</span>
              <span>Profilku</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">
              Akun & Pengguna
            </h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full bg-white flex flex-col gap-8">
            <div className="flex gap-5 items-center">
              <img
                src={profile.images}
                alt={profile.nama}
                className="w-14 h-14 lg:w-[100px] lg:h-[100px] object-contain object-center rounded-xl"
              />
              <div className="flex flex-col gap-2">
                <p className="text-black font-medium lg:text-lg 2xl:text-xl">
                  {profile.nama}
                </p>
                <div className="flex flex-col text-sm">
                  <span>{profile.status}</span>
                  <span>{profile.divisi}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-5 bg-[#FAFAFA] rounded-xl">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <h4 className="text-black lg:text-lg font-medium">
                      Profil
                    </h4>
                    <Button
                      variant="outline"
                      color="secondary"
                      onClick={() => handleEditProfile()}
                    >
                      Edit Profile
                    </Button>
                  </div>
                  <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
                    <span>Email</span>
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                      <span className="text-black font-medium">
                        {profile?.email}
                      </span>
                      <Badge
                        variant="base"
                        className="text-primary bg-secondary/30 font-medium w-fit"
                      >
                        Reset & Kirim Password
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm sm:text-base line-clamp-1 w-full flex justify-between flex-col lg:flex-row">
                    <span>Nama Lengkap</span>
                    <span className="text-black font-medium">
                      {profile?.nama}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
                    <span>No. HP</span>
                    <span className="text-black font-medium">
                      {profile?.noHp}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#FAFAFA] rounded-xl">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <h4 className="text-black lg:text-lg font-medium">
                      Ganti Password
                    </h4>
                    <Button
                      variant="outline"
                      color="secondary"
                      onClick={() => handleEditPassword()}
                    >
                      Ubah Password
                    </Button>
                  </div>
                  <div className="text-sm sm:text-base line-clamp-1 w-full flex justify-between flex-col lg:flex-row">
                    <span>Password Lama</span>
                    <span className="text-black font-medium">********</span>
                  </div>
                  <div className="text-sm sm:text-base w-full flex justify-between flex-col lg:flex-row">
                    <span>Password Baru</span>
                    <span className="text-black font-medium">********</span>
                  </div>
                </div>
              </div>
            </div>
            <EditProfileModal />
            <EditPasswordModal />
            <ConfirmModal
              open={isSecondModalOpen}
              onClose={() => {
                setIsSecondModalOpen(false);
                resetForm();
              }}
              title={modalTitle}
              description={modalDesc}
              onClick={() => {
                setIsSecondModalOpen(false);
                resetForm();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
