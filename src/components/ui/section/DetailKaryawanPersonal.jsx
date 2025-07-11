import { Button } from "keep-react";
import { useState } from "react";

export default function DetailKaryawanPersonal() {
  const [option, setOption] = useState(1);

  return (
    <div className="flex flex-col gap-9">
      {/* Option Button */}
      <div className="relative w-full lg:w-3/4 xl:w-1/2 h-6 sm:h-8 lg:h-10 bg-[#F5F5F5] rounded-lg p-1 flex items-center font-medium text-[#455468]">
        <div
          className={`absolute top-1 left-1 h-4 sm:h-6 lg:h-8 w-[calc(50%-4px)] bg-white rounded-lg shadow transition-all duration-300 ease-in-out ${
            option === 2 ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>

        <button
          onClick={() => setOption(1)}
          className={`z-10 w-1/2 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base 
        `}
        >
          Personal
        </button>

        <button
          onClick={() => setOption(2)}
          className={`z-10 w-1/2 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base 
        `}
        >
          Kepegawaian
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">
          <div className="flex gap-5">
            <img
              src="/profil5.png"
              alt="profil"
              className="w-14 h-14 lg:w-[100px] lg:h-[100px] object-cover object-center rounded-xl"
            />
            <div className="flex flex-col justify-between">
              <span className="font-medium text-black">Jakir Hossen</span>
              <div className="flex flex-col text-sm">
                <span>Tetap Permanen</span>
                <span>Product Designer</span>
              </div>
            </div>
          </div>
          <Button variant="outline" color="secondary">
            Edit Profile
          </Button>
        </div>

        {option === 1 && (
          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            {/* Informasi Pribadi */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black">Informasi Pribadi</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex flex-col lg:flex-row justify-between">
                    <span>ID Karyawan</span>
                    <span className="text-black">002</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Jenis Kelamin</span>
                    <span className="text-black">Laki-laki</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Kewarganegaraan</span>
                    <span className="text-black">WNI</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Identitas</span>
                    <span className="text-black">KTP 3273251103030009</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Alamat</span>
                    <span className="text-black">Jl. Cibodas Utara No.18</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Tempat, Tanggal Lahir</span>
                    <span className="text-black">Bandung, 11 Maret 2000</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Status Perkawinan</span>
                    <span className="text-black">Belum Menikah</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Agama</span>
                    <span className="text-black">Islam</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Golongan Darah</span>
                    <span className="text-black">A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informasi Kontak */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black">Informasi Kontak</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>No. HP</span>
                    <span className="text-black">0897213712371</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Email</span>
                    <span className="text-black">jakirhosen@gmail.com</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Alamat Kartu Identitas</span>
                    <span className="text-black">Jl. Cibodas Utara No.18</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Alamat Domisili</span>
                    <span className="text-black">Jl. Cibodas Utara No.18</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Kontak Darurat</span>
                    <span>
                      Iqbal <span className="text-black">0857712377887</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pendidikan Terakhir */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black">Pendidikan Terakhir</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Jenjang Pendidikan Terakhir</span>
                    <span className="text-black">SMK</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Nama Institusi Pendidikan</span>
                    <span className="text-black">SMK Negeri 1 Bandung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {option === 2 && (
          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            {/* Masa Kerja */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black">Masa Kerja</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Mulai Kerja</span>
                    <span className="text-black">04/06/2025</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Masa Kerja</span>
                    <span className="text-black">5 Hari</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Akhir Kerja</span>
                    <span className="text-black">04/06/2026</span>
                  </div>
                </div>
              </div>
            </div>
            {/* NPWP */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black">NPWP</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Nomor NPWP</span>
                    <span className="text-black">88129391239</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>NPWP Pemotong</span>
                    <span className="text-black">PT PPM</span>
                  </div>
                </div>
              </div>
            </div>
            {/* BPJS */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black">BPJS</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between">
                    <span>No BPJS Ketenagakerjaan</span>
                    <span className="text-black">19239128312</span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span>No BPJS Kesehatan</span>
                    <span className="text-black">812938908129</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Rekening Bank */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black">Rekening Bank</h4>
                <div className="w-full flex justify-between flex-col lg:flex-row">
                  <span>BCA</span>
                  <span className="text-black">
                    2832192381 a/n Jakir Hossen
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
