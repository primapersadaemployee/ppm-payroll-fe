import {
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import { PencilSimple, Trash } from "phosphor-react";

export default function TableReportEmployees({ filteredEmployees }) {
  return (
    <Table className="w-full min-w-[600px] rounded-t-none">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4 min-w-[150px] text-[#8897AE] bg-[#F9FAFB]">
            Nama Karyawan
          </TableHead>
          <TableHead className="w-1/4 min-w-[150px] text-[#8897AE] bg-[#F9FAFB]">
            Tanggal Kontrak
          </TableHead>
          <TableHead className="w-1/4 min-w-[150px] text-[#8897AE] bg-[#F9FAFB]">
            Akhir Kontrak
          </TableHead>
          <TableHead className="w-1/6 min-w-[100px] text-[#8897AE] bg-[#F9FAFB]">
            Status Karyawan
          </TableHead>
          <TableHead className="w-1/6 min-w-[120px] text-[#8897AE] bg-[#F9FAFB] text-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                  </Avatar>
                  <span>{employee.name}</span>
                </div>
              </TableCell>
              <TableCell>{employee.contractStart}</TableCell>
              <TableCell>{employee.contractEnd}</TableCell>
              <TableCell className="text-center">
                <Badge variant="base" color={employee.statusColor}>
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell className="w-1/6 max-w-xs">
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="softBg"
                    color="secondary"
                    className="text-xs whitespace-nowrap w-full font-semibold"
                  >
                    <PencilSimple size={14} />
                    <span className="hidden sm:inline">Perpanjang Kontrak</span>
                    <span className="sm:hidden">Perpanjang</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="softBg"
                    color="secondary"
                    className="text-xs whitespace-nowrap w-full font-semibold"
                  >
                    <Trash size={14} />
                    <span className="hidden sm:inline">Terminasi Kontrak</span>
                    <span className="sm:hidden">Terminasi</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
