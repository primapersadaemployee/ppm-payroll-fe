import { Button } from "keep-react";
import { useState } from "react";
import { format } from "date-fns";

export default function DetailEmployeePersonal({ karyawan }) {
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
              src={karyawan?.image ?? "/profil5.png"}
              alt="profil"
              className="w-14 h-14 lg:w-[100px] lg:h-[100px] object-cover object-center rounded-xl"
            />
            <div className="flex flex-col justify-between">
              <span className="font-medium text-black">{karyawan?.nama}</span>
              <div className="flex flex-col text-sm">
                <span>{karyawan?.statusKaryawan}</span>
                <span>{karyawan?.divisi}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" color="secondary">
            Edit Profile
          </Button>
        </div>

        {option === 1 && (
          <div className="flex flex-col gap-2 text-xs sm:text-sm lg:text-base">
            {/* Informasi Pribadi */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black lg:text-lg">Informasi Pribadi</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex flex-col lg:flex-row justify-between">
                    <span>ID Karyawan</span>
                    <span className="text-black">{karyawan?.id}</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Jenis Kelamin</span>
                    <span className="text-black">{karyawan?.jenisKelamin}</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Kewarganegaraan</span>
                    <span className="text-black">
                      {karyawan?.kewarganegaraan}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Identitas</span>
                    <span className="text-black">
                      {karyawan?.identitas} {karyawan?.idKartuIdentitas}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Alamat</span>
                    <span className="text-black">
                      {karyawan?.alamatDomisili}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Tempat, Tanggal Lahir</span>
                    <span className="text-black">
                      {karyawan?.tempatLahir},{" "}
                      {format(new Date(karyawan?.tanggalLahir), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Status Perkawinan</span>
                    <span className="text-black">
                      {karyawan?.statusPerkawinan}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Agama</span>
                    <span className="text-black">{karyawan?.agama}</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Golongan Darah</span>
                    <span className="text-black">
                      {karyawan?.golonganDarah}
                    </span>
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
                    <span className="text-black">{karyawan?.noHp}</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Email</span>
                    <span className="text-black">{karyawan?.email}</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Alamat Kartu Identitas</span>
                    <span className="text-black">
                      {karyawan?.alamatKartuIdentitas}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Kontak Darurat</span>
                    <span>
                      {karyawan?.namaKontakDarurat}{" "}
                      <span className="text-black">
                        {karyawan?.noHpKontakDarurat}
                      </span>
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
                    <span className="text-black">
                      {karyawan?.pendidikanTerakhir}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Nama Institusi Pendidikan</span>
                    <span className="text-black">
                      {karyawan?.namaInstitusiPendidikan}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {option === 2 && (
          <div className="flex flex-col gap-2 text-xs sm:text-sm lg:text-base">
            {/* Masa Kerja */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black lg:text-lg">Masa Kerja</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Mulai Kerja</span>
                    <span className="text-black">
                      {format(new Date(karyawan?.mulaiKerja), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Masa Kerja</span>
                    <span className="text-black">{karyawan?.masaKerja}</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Akhir Kerja</span>
                    <span className="text-black">
                      {format(new Date(karyawan?.akhirKerja), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* NPWP */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black lg:text-lg">NPWP</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>Nomor NPWP</span>
                    <span className="text-black">{karyawan?.npwp}</span>
                  </div>
                  <div className="w-full flex justify-between flex-col lg:flex-row">
                    <span>NPWP Pemotong</span>
                    <span className="text-black">{karyawan?.npwpPemotong}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* BPJS */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black lg:text-lg">BPJS</h4>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-between">
                    <span>No BPJS Ketenagakerjaan</span>
                    <span className="text-black">
                      {karyawan?.noBpjsKetenagakerjaan}
                    </span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span>No BPJS Kesehatan</span>
                    <span className="text-black">
                      {karyawan?.noBpjsKesehatan}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Rekening Bank */}
            <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col gap-5 font-medium">
                <h4 className="text-black lg:text-lg">Rekening Bank</h4>
                <div className="w-full flex justify-between flex-col lg:flex-row">
                  <span>{karyawan?.namaBank}</span>
                  <span className="text-black">
                    {karyawan?.noRekening} a/n {karyawan?.namaRekening}
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
