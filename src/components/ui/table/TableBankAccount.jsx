import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import { Trash } from "phosphor-react";

export default function TableBankAccount({
  rekeningData,
  setRekeningData,
  setFormData,
}) {
  const handleDeleteRekening = (id) => {
    const newRekeningData = rekeningData.filter(
      (rekening) => rekening.id !== id
    );
    setRekeningData(newRekeningData);
    setFormData((prev) => ({
      ...prev,
      namaBank: "",
      cabangBank: "",
      namaPemilikRekening: "",
      nomorRekening: "",
    }));
  };

  return (
    <div className="space-y-4">
      <Table className="w-full rounded-t-none">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-left font-medium text-sm text-[#8897AE] min-w-[160px]">
              Bank
            </TableHead>
            <TableHead className="text-left font-medium text-sm text-[#8897AE] min-w-[160px]">
              Cabang
            </TableHead>
            <TableHead className="text-center font-medium text-sm text-[#8897AE] min-w-[160px]">
              Nama Pemilik
            </TableHead>
            <TableHead className="text-center font-medium text-sm text-[#8897AE] min-w-[160px]">
              Nomor Rekening
            </TableHead>
            <TableHead className="text-center font-medium text-sm text-[#8897AE] min-w-[180px]">
              Status
            </TableHead>
            <TableHead className="text-center font-medium text-sm text-[#8897AE] min-w-[160px]">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rekeningData.length > 0 ? (
            rekeningData.map((rekening) => (
              <TableRow key={rekening.id} className="bg-white hover:bg-gray-50">
                <TableCell className="text-gray-700 text-left">
                  {rekening.bank}
                </TableCell>
                <TableCell className="text-gray-700 text-left">
                  {rekening.cabang}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {rekening.namaPemilik}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {rekening.nomorRekening}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="base"
                    color={
                      rekening.status === "Terverifikasi" ? "success" : "error"
                    }
                  >
                    {rekening.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                    title="Hapus"
                    onClick={() => handleDeleteRekening(rekening.id)}
                  >
                    <Trash size={19} />
                    <span>Hapus</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="py-8 text-center text-gray-400">
                <div className="flex flex-col items-center">
                  <p className="font-medium">Belum ada nomor rekening</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
