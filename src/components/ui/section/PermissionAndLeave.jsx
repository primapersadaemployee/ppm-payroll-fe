import { useState } from "react";
import TableAnnualLeave from "../table/TableAnnualLeave";
import TableSpecialLeave from "../table/TableSpecialLeave";

export default function PermissionAndLeave() {
  const [option, setOption] = useState(1);

  return (
    <div className="flex flex-col gap-9">
      {/* Option Button */}
      <div className="relative w-full lg:w-3/4 xl:w-1/2 h-6 sm:h-8 lg:h-10 bg-[#F5F5F5] rounded-lg p-1 flex items-center font-medium text-[#455468]">
        <div
          className={`absolute top-1 h-4 sm:h-6 lg:h-8 w-1/5 bg-white rounded-lg shadow transition-transform duration-300 ease-in-out ${
            option === 5 ? "-left-1" : "left-1"
          }`}
          style={{
            transform: `translateX(${(option - 1) * 100}%)`,
          }}
        />

        {["Cuti Tahunan", "Cuti Khusus", "Sakit", "Izin", "Unpaid Leave"].map(
          (label, index) => (
            <button
              key={index}
              onClick={() => setOption(index + 1)}
              className={`z-10 w-1/5 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* Content */}
      {option === 1 && <TableAnnualLeave />}
      {option === 2 && <TableSpecialLeave />}
      {/* {option === 3 && <TableSickLeave />} */}
      {/* {option === 4 && <TableLeave />} */}
      {/* {option === 5 && <TableUnpaidLeave />} */}
    </div>
  );
}
