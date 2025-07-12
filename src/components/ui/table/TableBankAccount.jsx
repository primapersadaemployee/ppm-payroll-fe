import { Badge, Button } from "keep-react";
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
      <table className="w-full min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left font-medium text-sm text-[#8897AE] min-w-[160px]">
              Bank
            </th>
            <th className="py-2 px-4 text-left font-medium text-sm text-[#8897AE] min-w-[160px]">
              Cabang
            </th>
            <th className="py-2 px-4 text-center font-medium text-sm text-[#8897AE] min-w-[160px]">
              Nama Pemilik
            </th>
            <th className="py-2 px-4 text-center font-medium text-sm text-[#8897AE] min-w-[160px]">
              Nomor Rekening
            </th>
            <th className="py-2 px-4 text-center font-medium text-sm text-[#8897AE] min-w-[180px]">
              Status
            </th>
            <th className="py-2 px-4 text-center font-medium text-sm text-[#8897AE] min-w-[160px]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {rekeningData.length > 0 ? (
            rekeningData.map((rekening) => (
              <tr key={rekening.id} className="bg-white hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700 text-left">
                  {rekening.bank}
                </td>
                <td className="py-3 px-4 text-gray-700 text-left">
                  {rekening.cabang}
                </td>
                <td className="py-3 px-4 text-gray-700 text-center">
                  {rekening.namaPemilik}
                </td>
                <td className="py-3 px-4 text-gray-700 text-center">
                  {rekening.nomorRekening}
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge
                    variant="base"
                    color={
                      rekening.status === "Terverifikasi" ? "success" : "error"
                    }
                  >
                    {rekening.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-center">
                  <Button
                    size="sm"
                    className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                    title="Hapus"
                    onClick={() => handleDeleteRekening(rekening.id)}
                  >
                    <Trash size={19} />
                    <span>Hapus</span>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-8 text-center text-gray-400">
                <div className="flex flex-col items-center">
                  <p className="font-medium">Belum ada nomor rekening</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
