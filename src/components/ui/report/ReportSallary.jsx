import { Card, CardContent, CardDescription, CardTitle } from "keep-react";
import IconSallary from "/iconsallary.png";
import { useState, useEffect } from "react";
import BarChart from "../chart/BarChart";

export default function ReportSallary() {
  const [sallaryData, setSallaryData] = useState([
    { department: "IT Development", sallary: 8500000 },
    { department: "Design Development", sallary: 6500000 },
    { department: "Keuangan", sallary: 6000000 },
    { department: "HRD", sallary: 6200000 },
    { department: "Pemasaran", sallary: 4000000 },
    { department: "Penjualan", sallary: 5000000 },
    { department: "Produksi", sallary: 5500000 },
    { department: "Tata Kelola", sallary: 6500000 },
  ]);

  const report = [
    {
      id: 1,
      title: "Total Gaji Bulan Ini",
      total: 7038889,
      percentage: 100,
    },
    {
      id: 2,
      title: "Rata-rata Gaji Bulan Ini",
      total: 2038889,
      percentage: 100,
    },
  ];

  const formatRupiah = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const [sallaryFilter, setSallaryFilter] = useState("Last 2 week");

  const sallaryOptions = [
    "Last 1 week",
    "Last 2 week",
    "Last 3 week",
    "Last 4 week",
  ];

  const chartConfig = {
    sallary: {
      label: "Gaji",
      color: "#22C55E",
    },
  };

  // TODO: Replace with actual API calls
  useEffect(() => {
    // Fetch sallary data
    // const fetchSallaryData = async () => {
    //   const response = await fetch('/api/sallary');
    //   const data = await response.json();
    //   setSallaryData(data);
    // };
    // fetchSallaryData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-3 border border-gray-200 rounded-t-lg">
        <span className="text-lg text-[#455468] font-medium">Laporan Gaji</span>
      </div>
      <div className="p-3 border border-gray-200 rounded-b-lg">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {report.map((item) => (
              <Card key={item.id} className="max-w-none bg-secondary">
                <div className="flex justify-between items-center">
                  <CardContent className="flex flex-col gap-5">
                    <CardDescription className="text-sm lg:text-base">
                      {item.title}
                    </CardDescription>
                    <div className="flex gap-2 items-center">
                      <CardTitle className="text-2xl lg:text-3xl">
                        {formatRupiah(item.total)}
                      </CardTitle>
                      <span className="text-white text-xs py-1 px-2 rounded-full bg-[#22C55E]">
                        +{item.percentage}%
                      </span>
                    </div>
                    <CardDescription className="text-sm lg:text-base">
                      Dari bulan sebelumnya
                    </CardDescription>
                  </CardContent>
                  <div className="p-6 hidden sm:block lg:hidden xl:block">
                    <img
                      src={IconSallary}
                      alt="Icon Sallary"
                      className="w-[72px] h-[72px]"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <div className="w-full">
              <BarChart
                data={sallaryData}
                dropdownValue={sallaryFilter}
                dropdownOptions={sallaryOptions}
                dropDownOnChange={setSallaryFilter}
                chartConfig={chartConfig}
                title="Gaji Per Organisasi Bulan Ini"
                dataKey="sallary"
                yAxisTicks={[
                  0, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000,
                  7000000, 8000000, 9000000, 10000000,
                ]}
                yAxisFormatter={formatRupiah}
                sizeChart="h-[250px] sm:h-[320px] md:h-[370px] xl:h-[480px] 2xl:h-[600px] 3xl:h-[700px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
