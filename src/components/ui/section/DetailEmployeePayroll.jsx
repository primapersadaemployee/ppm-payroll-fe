import { useState } from "react";
import TableHistoryPayroll from "../table/TableHistoryPayroll";
import { Plus } from "phosphor-react";
import { Button } from "keep-react";
import AddPayrollEmployeeModal from "../modal/AddPayrollEmployeeModal";
import { useAddPayrollEmployeStore } from "../../../store/AddPayrollEmployeStore";
import ConfirmPayrollEmployeeModal from "../modal/ConfirmPayrollEmployeeModal";

export default function DetailEmployeePayroll({ karyawan }) {
  const payroll = karyawan?.payroll[0];
  const riwayatPayroll = karyawan?.riwayatPayroll;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { setIsFirstModalOpen } = useAddPayrollEmployeStore();

  // Pagination
  const totalPages = Math.ceil(riwayatPayroll.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRiwayatPayroll = riwayatPayroll.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col gap-2 text-xs sm:text-sm lg:text-base">
      {/* Payroll */}
      <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-5 font-medium">
          <h4 className="text-black lg:text-lg">Payroll</h4>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col lg:flex-row justify-between">
              <span>Tanggal Efektif</span>
              <span className="text-black">{payroll?.tanggalEfektif}</span>
            </div>
            <div className="w-full flex justify-between flex-col lg:flex-row">
              <span>Jaminan Keselamatan Kerja</span>
              <span className="text-black">
                {payroll?.jaminanKeselamatanKerja}
              </span>
            </div>
            <div className="w-full flex justify-between flex-col lg:flex-row">
              <span>Jaminan Kematian</span>
              <span className="text-black">{payroll?.jaminanKematian}</span>
            </div>
            <div className="w-full flex justify-between flex-col lg:flex-row">
              <span>Metode Perhitungan PPH 21/26</span>
              <span className="text-black capitalize">
                {payroll?.metodePerhitunganPph}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 xl:flex-row">
        {/* Gaji Bulanan */}
        <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col gap-5 font-medium">
            <h4 className="text-black lg:text-lg">Gaji Bulanan</h4>
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-col lg:flex-row justify-between">
                <span>Koperasi</span>
                <span className="text-primary">Rp {payroll?.koperasi}</span>
              </div>
              <div className="w-full flex justify-between flex-col lg:flex-row">
                <span>Gaji Pokok</span>
                <span className="text-black">{payroll?.gajiPokok}</span>
              </div>
              <div className="w-full flex justify-between flex-col lg:flex-row">
                <span>Total</span>
                <span className="text-primary">{payroll?.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* THR */}
        <div className="w-full bg-[#F5F5F5] rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col gap-5 font-medium">
            <h4 className="text-black lg:text-lg">THR</h4>
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-col lg:flex-row justify-between">
                <span>THR</span>
                <span className="text-black">
                  {payroll?.thr === true ? "1 x Gaji Pokok" : "0"}
                </span>
              </div>
              <div className="w-full flex justify-between flex-col lg:flex-row">
                <span>Total</span>
                <span className="text-primary">
                  {payroll?.thr === true ? payroll?.total : "0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 border-b-2 border-gray-100">
        <h4 className="text-black text-xs sm:text-sm lg:text-lg p-4 lg:p-6 font-medium">
          Riwayat Payroll
        </h4>
      </div>

      <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
        <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 px-4 lg:px-6">
            <h2 className="text-lg font-medium">Daftar Riwayat Payroll</h2>
          </div>
          <div className="px-4 lg:px-6">
            <Button
              type="button"
              variant="outline"
              className="text-primary border-primary"
              onClick={() => setIsFirstModalOpen(true)}
            >
              Penyesuaian Gaji
              <Plus size={20} className="ml-2" />
            </Button>
            <AddPayrollEmployeeModal />
            <ConfirmPayrollEmployeeModal />
          </div>
        </div>

        {/* History Attendance Table */}
        <div className="overflow-x-auto">
          <TableHistoryPayroll
            historyPayroll={paginatedRiwayatPayroll}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
