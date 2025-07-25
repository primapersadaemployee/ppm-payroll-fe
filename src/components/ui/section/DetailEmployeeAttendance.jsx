import { useState } from "react";
import FilterDropdown from "../dropdown/FilterDropdown";
import TableAttendanceDaily from "../table/TableAttendanceDaily";
import TableHistoryAttendance from "../table/TableHistoryAttendance";

export default function DetailEmployeeAttendance({ karyawan }) {
  const [option, setOption] = useState(1);
  const kehadiran = karyawan.kehadiranHarian;
  const [attendances] = useState(kehadiran);
  const historiKehadiran = karyawan.historiKehadiran;
  const [historyAttendances] = useState(historiKehadiran);

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
          Harian
        </button>

        <button
          onClick={() => setOption(2)}
          className={`z-10 w-1/2 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base 
        `}
        >
          Histori Kehadiran
        </button>
      </div>

      {/* Content */}
      <div>
        {option === 1 && <TableAttendanceDaily attendances={attendances} />}
        {option === 2 && (
          <TableHistoryAttendance historyAttendances={historyAttendances} />
        )}
      </div>
    </div>
  );
}
