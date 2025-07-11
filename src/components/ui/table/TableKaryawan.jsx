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
} from 'keep-react';
import { CaretLeft, CaretRight, Eye, NotePencil } from 'phosphor-react';
import { Link } from 'react-router-dom';

export default function TableKaryawan({
  employees,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="space-y-4">
      <Table className="w-full min-w-[1600px] rounded-t-none">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[190px] text-[#8897AE] bg-[#F9FAFB]">
              Nama
            </TableHead>
            <TableHead className="min-w-[150px] text-[#8897AE] bg-[#F9FAFB]">
              Jenis Kelamin
            </TableHead>
            <TableHead className="min-w-[80px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Warga
            </TableHead>
            <TableHead className="min-w-[100px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Identitas
            </TableHead>
            <TableHead className="min-w-[120px] text-[#8897AE] bg-[#F9FAFB] text-center">
              ID/NIK
            </TableHead>
            <TableHead className="min-w-[150px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Tempat Lahir
            </TableHead>
            <TableHead className="min-w-[150px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Tanggal Lahir
            </TableHead>
            <TableHead className="min-w-[180px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Status Perkawinan
            </TableHead>
            <TableHead className="min-w-[80px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Agama
            </TableHead>
            <TableHead className="min-w-[180px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Golongan Darah
            </TableHead>
            <TableHead className="min-w-[190px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Pendidikan Terakhir
            </TableHead>
            <TableHead className="min-w-[100px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Divisi
            </TableHead>
            <TableHead className="min-w-[170px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Status Karyawan
            </TableHead>
            <TableHead className="min-w-[80px] text-[#8897AE] bg-[#F9FAFB] text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow
                key={employee.id}
                className="hover:bg-gray-50 font-medium"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={employee.image} alt={employee.nama} />
                    </Avatar>
                    <span className="truncate">{employee.nama}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {employee.jenisKelamin}
                </TableCell>
                <TableCell className="text-center">
                  {employee.kewarganegaraan}
                </TableCell>
                <TableCell className="text-center">
                  {employee.identitas}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col">
                    <span>{employee.idKartuIdentitas}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {employee.tempatLahir}
                </TableCell>
                <TableCell className="text-center">
                  {employee.tanggalLahir}
                </TableCell>
                <TableCell className="text-center">
                  {employee.statusPerkawinan}
                </TableCell>
                <TableCell className="text-center">{employee.agama}</TableCell>
                <TableCell className="text-center">
                  <span>{employee.golonganDarah}</span>
                </TableCell>
                <TableCell className="text-center">
                  {employee.pendidikanTerakhir}
                </TableCell>
                <TableCell className="text-center">{employee.divisi}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="base"
                    color={
                      employee.statusKaryawan === 'Tetap'
                        ? 'success'
                        : employee.statusKaryawan === 'PKWT'
                        ? 'secondary'
                        : employee.statusKaryawan === 'Resign'
                        ? 'error'
                        : 'warning'
                    }
                  >
                    {employee.statusKaryawan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <Link to={`/karyawan/detail-karyawan/${employee.id}`}>
                      <Button
                        size="sm"
                        className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                        title="View"
                      >
                        <Eye size={19} />
                        <span>View</span>
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="py-[2px] px-2 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                      title="Edit"
                    >
                      <NotePencil size={19} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={14} className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-medium">Tidak ada data karyawan</p>
                  <p className="text-sm">
                    Coba ubah filter atau kata kunci pencarian
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 px-4 lg:px-6">
          <div className="flex items-center justify-between gap-1">
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 flex items-center"
            >
              <CaretLeft size={14} />
              <span>Previous</span>
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first page, last page, current page, and pages around current
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  );
                })
                .map((page, index, array) => {
                  // Add ellipsis if there's a gap
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;

                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Button
                        size="sm"
                        // variant={currentPage === page ? "softBg" : "link"}
                        // color={currentPage === page ? "primary" : "secondary"}
                        onClick={() => onPageChange(page)}
                        className={`min-w-[32px] h-8 rounded-full ${
                          currentPage === page
                            ? 'bg-[#5E718D] text-white hover:bg-[#5E718D]'
                            : 'text-[#455468] bg-transparent hover:bg-[#5E718D] hover:text-white'
                        }`}
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}
            </div>

            <Button
              size="sm"
              variant="outline"
              color="secondary"
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 flex items-center"
            >
              <span>Next</span>
              <CaretRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
