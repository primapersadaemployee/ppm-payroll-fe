import { Eye, EyeSlash, LockSimple, CheckCircle, Info } from "phosphor-react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Input, Label, toast } from "keep-react";
import { useState } from "react";
import ButtonAuth from "../../components/ui/ButtonAuth";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const isMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const getStrengthColor = (index) => {
    const checks = [isMinLength, hasUppercase, hasNumber];
    return checks[index] ? "#11A75C" : "#8897AE";
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Kata sandi tidak cocok.");
      return;
    }
    if (!isMinLength || !hasUppercase || !hasNumber) {
      toast.error("Kata sandi tidak memenuhi persyaratan.");
      return;
    }
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Kata sandi berhasil diatur ulang.");
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
              Tetapkan kata sandi baru
            </span>
            <span className="text-[#455468] text-sm max-w-sm">
              Amankan akun Anda dengan kata sandi baru.
            </span>
          </div>

          <form
            id="resetPassword"
            name="resetPassword"
            onSubmit={handleResetPassword}
            className="flex flex-col gap-3 w-full max-w-[340px]"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="newPassword">Kata sandi baru</Label>
              <fieldset className="relative">
                <Input
                  name="newPassword"
                  placeholder="********"
                  type={typePassword}
                  required
                  className="ps-11 pr-11"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <LockSimple size={20} color="#2D3643" />
                </div>
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setTypePassword(
                      typePassword === "password" ? "text" : "password"
                    )
                  }
                >
                  {typePassword === "password" ? (
                    <Eye size={20} color="#2D3643" />
                  ) : (
                    <EyeSlash size={20} color="#2D3643" />
                  )}
                </div>
              </fieldset>

              <div className="grid grid-cols-3 gap-1 mt-1">
                <div
                  className="w-full h-1 rounded-full"
                  style={{ backgroundColor: getStrengthColor(0) }}
                ></div>
                <div
                  className="w-full h-1 rounded-full"
                  style={{ backgroundColor: getStrengthColor(1) }}
                ></div>
                <div
                  className="w-full h-1 rounded-full"
                  style={{ backgroundColor: getStrengthColor(2) }}
                ></div>
              </div>

              <div className="mt-2 text-sm text-[#2D3643] space-y-1">
                <div className="flex items-center gap-2">
                  {isMinLength ? (
                    <CheckCircle size={16} color="#11A75C" />
                  ) : (
                    <Info size={16} color="#8897AE" />
                  )}
                  <span>Minimal 8 karakter</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasUppercase ? (
                    <CheckCircle size={16} color="#11A75C" />
                  ) : (
                    <Info size={16} color="#8897AE" />
                  )}
                  <span>Setidaknya 1 huruf besar</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasNumber ? (
                    <CheckCircle size={16} color="#11A75C" />
                  ) : (
                    <Info size={16} color="#8897AE" />
                  )}
                  <span>Setidaknya 1 angka</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">
                Konfirmasi kata sandi baru
              </Label>
              <fieldset className="relative">
                <Input
                  name="confirmPassword"
                  placeholder="********"
                  type={typeConfirmPassword}
                  required
                  className="ps-11 pr-11"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <LockSimple size={20} color="#2D3643" />
                </div>
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setTypeConfirmPassword(
                      typeConfirmPassword === "password" ? "text" : "password"
                    )
                  }
                >
                  {typeConfirmPassword === "password" ? (
                    <Eye size={20} color="#2D3643" />
                  ) : (
                    <EyeSlash size={20} color="#2D3643" />
                  )}
                </div>
              </fieldset>
            </div>

            <div className="flex justify-between mt-4 gap-2">
              <button
                type="button"
                className="border border-[#D0D5DD] rounded-lg text-sm px-4 py-2 font-medium text-[#2D3643] w-full"
              >
                Kembali
              </button>
              <ButtonAuth
                type="submit"
                text="Ubah kata sandi"
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
