import { useParams } from 'react-router-dom';
import NotificationDashboard from '../../components/ui/notification/NotificationDashboard';
import { CurrencyCircleDollar } from 'phosphor-react';
import { SidebarComponent } from '../../components/layout/Sidebar';
import TableDetailPayroll from '../../components/ui/table/TableDetailPayroll';
import { PayrollData } from '../../data/PayrollData';
import { Button } from 'keep-react';
import { DownloadSimple } from 'phosphor-react';

export default function DetailPayroll() {
  const { id } = useParams();

  // Find the specific payroll data
  const payrollDetail = PayrollData.find((p) => p.id === parseInt(id));

  if (!payrollDetail) {
    return (
      <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen text-[#455468]">
        <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
          <SidebarComponent />
        </div>
        <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">Payroll data not found</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const end = new Date(endDate).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return `${start} - ${end}`;
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
              <CurrencyCircleDollar size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Payroll</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl lg:text-3xl font-medium">Payroll</h1>
              <p className="text-sm text-gray-500 mt-1">
                {formatDateRange(
                  payrollDetail.startPeriode,
                  payrollDetail.endPeriode
                )}
              </p>
              <h2 className="text-xl font-medium mt-2">{payrollDetail.slip}</h2>
            </div>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full bg-white overflow-auto">
            <TableDetailPayroll
              payrollDetail={payrollDetail}
              onDownload={() => {
                // Handle download functionality
                console.log('Download slip gaji massal');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
