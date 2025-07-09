import { Checkbox, Input, InputIcon, Label, toast } from "keep-react";
import { Envelope, LockSimple } from "phosphor-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import ButtonAuth from "../../components/ui/button/ButtonAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [verifCode, setVerifCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [index, setIndex] = useState(0);

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
    <AuthLayout>
      <div className="lg:w-[45%]">
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
                  to="/forgot-password"
                  className="text-[#455468] text-sm underline font-medium"
                >
                  Lupa Password
                </Link>
              </div>
              <ButtonAuth type="submit" text="Masuk" isLoading={isLoading} />
            </div>
          </form>
          <span className="text-sm">
            Belum punya akun?{" "}
            <Link
              to="http://wa.me/6287821104000"
              target="_blank"
              className="font-medium text-[#3629B7] hover:underline"
            >
              Hubungi Kami
            </Link>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
