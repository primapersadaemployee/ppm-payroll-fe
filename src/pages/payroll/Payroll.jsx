import { useState } from "react";
import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import { CurrencyCircleDollar } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import TablePayroll from "../../components/ui/table/TablePayroll";
import { PayrollData } from "../../data/PayrollData";

export default function Payroll() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Fungsi untuk menghasilkan daftar bulan berdasarkan tahun
  const generateMonths = (year) => {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return monthNames.map((name, index) => ({
      id: index,
      name,
      year: year.toString(),
    }));
  };

  const handleMonthChange = (monthIndex) => {
    setSelectedMonth(monthIndex);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const months = generateMonths(selectedYear);

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
              <CurrencyCircleDollar size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Payroll</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Payroll</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Month Filter - Responsive Scrollable */}
          <div className="w-full overflow-x-auto pb-4">
            <div className="flex items-center gap-2 min-w-max px-2 sm:px-4 lg:justify-center">
              {months.map((month) => (
                <button
                  key={`${month.id}-${month.year}`}
                  onClick={() => handleMonthChange(month.id)}
                  className={`rounded-xl min-w-[80px] sm:min-w-[90px] lg:min-w-[100px] px-3 sm:px-4 py-2 sm:py-3 flex flex-col items-center border border-gray-100 transition-all flex-shrink-0 ${
                    selectedMonth === month.id
                      ? "bg-primary text-white"
                      : "bg-white text-[#455468] hover:bg-primary hover:text-white"
                  }`}
                >
                  <span className="font-medium text-sm">{month.name}</span>
                  <span className="text-xs">{month.year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full bg-white overflow-auto">
            <TablePayroll
              payrollData={PayrollData}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
