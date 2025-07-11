import BGLogin from "/bg-login.png";
import Logo from "/logo-with-text.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-2 items-center h-screen p-4 font-poppins">
      <div className="w-full lg:w-[55%] lg:h-full h-auto bg-secondary rounded-[20px] p-4 lg:p-0">
        <div className="flex flex-col gap-5 justify-center items-center h-full">
          <img
            src={Logo}
            alt="PPM Logo"
            className="w-full max-w-[214px] h-auto"
          />
          <div className="flex flex-col gap-2 text-center w-full max-w-lg">
            <h2 className="font-semibold text-2xl">PPM HR</h2>
            <h3 className="text-[#0A0C11] text-sm max-w-sm mx-auto lg:max-w-none">
              Selamat datang di Portal PPM HR, Satu platform untuk kelola gaji,
              absensi, dan karyawan
            </h3>
          </div>
          <img
            src={BGLogin}
            alt="BG Login"
            className="w-1/2 max-w-[280px] lg:w-full lg:max-w-2xl h-auto"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
