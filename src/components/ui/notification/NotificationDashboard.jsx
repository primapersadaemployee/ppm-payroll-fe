import { BellSimple } from "phosphor-react";
import { memo } from "react";

function NotificationDashboard() {
  return (
    <div className="flex items-center justify-center p-3 bg-[#F5F5F5] rounded-lg w-full sm:w-auto">
      <BellSimple size={20} color="#2d3643" weight="bold" />
    </div>
  );
}

export default memo(NotificationDashboard);
