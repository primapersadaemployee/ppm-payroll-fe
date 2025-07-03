import { Checkbox, Input, InputIcon, Label, Spinner, toast } from "keep-react";
import BGLogin from "/bg-login.png";
import Logo from "/logo-with-text.png";
import { Envelope, LockSimple } from "phosphor-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifCode, setVerifCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Login Berhasil");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2 items-center h-screen p-4 font-poppins">
      <div className="w-[55%] h-full bg-[#DDE5FF] rounded-[20px]">
        <div className="flex flex-col gap-5 justify-center items-center h-full">
          <img
            src={Logo}
            alt="PPM Logo"
            className="w-full max-w-[214px] h-auto"
          />
          <div className="flex flex-col gap-2 text-center w-full max-w-lg">
            <h2 className="font-semibold text-2xl">PPM HR</h2>
            <h3 className="text-[#0A0C11] text-sm">
              Selamat datang di Portal PPM HR, Satu platform untuk kelola gaji,
              absensi, dan karyawan
            </h3>
          </div>
          <img
            src={BGLogin}
            alt="PPM Logo"
            className="w-full max-w-2xl h-auto"
          />
        </div>
      </div>
      <div className="w-[45%]">
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <div className="flex flex-col gap-1 text-center">
            <span className="font-semibold text-2xl">
              Masuk untuk Melanjutkan
            </span>
            <span className="text-[#455468] text-sm">
              Welcome back! Please enter your details.
            </span>
          </div>
          <form
            id="login"
            name="login"
            onSubmit={handleLogin}
            className="flex flex-col gap-3 w-full max-w-[340px]"
          >
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <fieldset className="relative">
                <Input
                  placeholder="example@email.com"
                  type="email"
                  required
                  className="ps-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputIcon>
                  <Envelope size={20} color="#2D3643" />
                </InputIcon>
              </fieldset>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <fieldset className="relative">
                <Input
                  placeholder="********"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ps-11"
                />
                <InputIcon>
                  <LockSimple size={20} color="#2D3643" />
                </InputIcon>
              </fieldset>
            </div>
            <div className="flex flex-col gap-5 mt-2">
              <div className="flex justify-between">
                <fieldset className="flex items-center gap-2">
                  <Checkbox defaultChecked={false} id="remember" />
                  <Label htmlFor="remember" color="#0A0C11">
                    Ingat Saya
                  </Label>
                </fieldset>
                <Link
                  to="#"
                  className="text-[#455468] text-sm underline font-medium"
                >
                  Lupa Password
                </Link>
              </div>
              <button
                type="submit"
                className="w-full p-2.5 bg-[#3629B7] rounded-lg text-white text-sm"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner className="fill-white size-6" />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <span className="text-sm">
            Belum punya akun?{" "}
            <Link to="#" className="font-medium text-[#3629B7]">
              Hubungi Kami
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
