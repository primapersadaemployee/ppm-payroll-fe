import { Envelope } from "phosphor-react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Input, InputIcon, Label, toast } from "keep-react";
import { useEffect, useState } from "react";
import ButtonAuth from "../../components/ui/button/ButtonAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(600);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Link pengaturan ulang kata sandi telah dikirim.");
        setIsSent(true);
        setResendCountdown(600);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      toast.success("Link pengaturan ulang kata sandi telah dikirim ulang.");
      setResendCountdown(600);
    } catch (error) {
      console.log(error);
    }
  };

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    let interval;
    if (isSent && resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSent, resendCountdown]);

  return (
    <AuthLayout>
      <div className="lg:w-[45%]">
        {isSent ? (
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="flex flex-col gap-1 text-center">
              <div className="flex flex-col gap-8">
                <span className="font-semibold text-2xl">Reset link sent!</span>
                <span className="text-[#455468] text-sm max-w-sm">
                  Periksa kotak masuk{" "}
                  <span className="text-black">{email}</span> Anda untuk
                  mendapatkan petunjuk dari kami tentang cara mengatur ulang
                  kata sandi Anda.
                </span>
                <p className="text-sm">
                  Tidak menerima kode?{" "}
                  <button
                    onClick={handleResend}
                    disabled={resendCountdown > 0}
                    className={`font-medium ${
                      resendCountdown > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primary hover:underline"
                    }`}
                  >
                    {resendCountdown > 0
                      ? `Kirim ulang (${formatCountdown(resendCountdown)})`
                      : "Kirim ulang"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="flex flex-col gap-1 text-center">
              <span className="font-semibold text-2xl">
                Setel ulang kata sandi
              </span>
              <span className="text-[#455468] text-sm max-w-sm">
                Masukkan email Anda untuk menerima tautan pengaturan ulang kata
                sandi.
              </span>
            </div>
            <form
              id="forgotPassword"
              name="forgotPassword"
              onSubmit={handleForgotPassword}
              className="flex flex-col gap-3 w-full max-w-[340px]"
            >
              <div className="flex flex-col gap-2">
                <Label>Masukkan email Anda</Label>
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
              <div className="flex flex-col gap-5 mt-2">
                <ButtonAuth
                  type="submit"
                  text="Get a Reset Link"
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
