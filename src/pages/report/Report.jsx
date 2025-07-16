import { useState } from "react";
import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import { MagnifyingGlass, Note } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import { Input, InputIcon } from "keep-react";
import BGSalarySummary from "/sallary-summary.png";
import BGSalaryPayment from "/sallary-payment.png";
import { Link } from "react-router-dom";

export default function Report() {
  const [searchTerm, setSearchTerm] = useState("");

  // Data statis untuk pencarian
  const options = [
    {
      id: 1,
      name: "Ringkasan Gaji",
      image: BGSalarySummary,
      link: "/report/payroll-summary",
    },
    {
      id: 2,
      name: "Pembayaran Gaji",
      image: BGSalaryPayment,
      link: "/report/payroll",
    },
  ];

  // Filter opsi berdasarkan searchTerm
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
              <Note size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Laporan</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Laporan</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full bg-white flex flex-col gap-8">
            <fieldset className="relative w-full">
              <Input
                type="text"
                placeholder="Cari"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1 ps-11"
              />
              <InputIcon>
                <MagnifyingGlass size={19} color="#2d3643" weight="bold" />
              </InputIcon>
            </fieldset>
            <div>
              <div className="bg-white rounded-2xl rounded-b-none py-4 lg:py-6 shadow-sm border border-gray-100">
                {/* Section Header with Filters */}
                <div className="flex items-center gap-4 px-4 lg:px-6">
                  <h2 className="text-lg font-medium">Payroll</h2>
                </div>
              </div>
              {/* Option */}
              <div className="bg-white rounded-2xl rounded-t-none py-4 lg:py-6 shadow-sm border border-gray-100">
                <div className="px-4 lg:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredOptions.map((option) => (
                      <Link
                        to={option.link}
                        key={option.id}
                        className="p-4 rounded-2xl bg-secondary flex justify-between items-center"
                      >
                        <h4 className="text-lg lg:text-xl xl:text-2xl font-medium text-black">
                          {option.name}
                        </h4>
                        <img
                          src={option.image}
                          alt={option.name}
                          className="w-16 md:w-20 2xl:w-28 h-auto"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
