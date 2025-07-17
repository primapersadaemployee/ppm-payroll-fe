import {
  Button,
  Input,
  InputIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlass,
  NotePencil,
  Plus,
} from "phosphor-react";
import { useState } from "react";
import { CompanyPolicyData } from "../../../data/SettingData";
import PDFIcon from "/icon-pdf.png";
import { Link } from "react-router-dom";
import { useAddCompanyPolicyStore } from "../../../store/settings/AddCompanyPolicyStore";
import AddCompanyPolicyModal from "../modal/AddCompanyPolicyModal";
import ConfirmModal from "../modal/ConfirmModal";
import EditCompanyPolicyModal from "../modal/EditCompanyPolicyModal";
import { useEditCompanyPolicyStore } from "../../../store/settings/EditCompanyPolicyStore";

export default function TableCompanyPolicy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {
    setCompanyPolicy,
    setIsFirstModalOpen,
    isSecondModalOpen: isEditSecondModalOpen,
    setIsSecondModalOpen: setIsEditSecondModalOpen,
    resetForm: resetEditForm,
  } = useEditCompanyPolicyStore();
  const {
    setIsFirstModalOpen: setIsAddFirstModalOpen,
    isSecondModalOpen,
    setIsSecondModalOpen,
    resetForm,
  } = useAddCompanyPolicyStore();

  // Filter employees based on search and filters
  const filteredCompanyPolicy = CompanyPolicyData.filter((policy) => {
    const matchesSearch = policy.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCompanyPolicy.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanyPolicy = filteredCompanyPolicy.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEditCompanyPolicy = (id) => {
    setCompanyPolicy(id, CompanyPolicyData);
    setIsFirstModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      {/* Section Header with Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 px-4 lg:px-6">
          <h2 className="text-lg font-medium">Daftar Peraturan Perusahaan</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 px-4 lg:px-6">
          <Button
            className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-white"
            onClick={() => setIsAddFirstModalOpen(true)}
          >
            <Plus size={16} />
            Tambah Peraturan
          </Button>
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
        </div>
      </div>

      {/* Annual Leave Table */}
      <div className="overflow-x-auto">
        <div className="space-y-4">
          <Table className="w-full rounded-t-none">
            <TableHeader>
              <TableRow>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                  No
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[180px]">
                  Judul
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[160px]">
                  Isi Peraturan
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[220px]">
                  Lampiran
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCompanyPolicy.length > 0 ? (
                paginatedCompanyPolicy.map((policy) => (
                  <TableRow
                    key={policy.id}
                    className="hover:bg-gray-50 font-medium"
                  >
                    <TableCell className="text-center">{policy.id}</TableCell>
                    <TableCell className="text-center">
                      {policy.judul}
                    </TableCell>
                    <TableCell className="text-center">{policy.isi}</TableCell>
                    <TableCell className="text-center">
                      <Link
                        to={policy.lampiranUrl}
                        target="_blank"
                        className="flex gap-1 items-center justify-center"
                      >
                        <img
                          src={PDFIcon}
                          alt="pdf"
                          className="w-5 h-auto object-contain object-center"
                        />
                        <span>{policy.lampiran}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                        title="Edit"
                        onClick={() => handleEditCompanyPolicy(policy.id)}
                      >
                        <span>
                          <NotePencil size={19} />
                        </span>
                        <span>Edit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-medium">Belum ada data Peraturan.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <AddCompanyPolicyModal />
          <ConfirmModal
            open={isSecondModalOpen}
            onClose={() => {
              setIsSecondModalOpen(false);
              resetForm();
            }}
            title="Tambah Peraturan Perusahaan Berhasil"
            description="Peraturan Perusahaan berhasil ditambahkan."
            onClick={() => {
              setIsSecondModalOpen(false);
              resetForm();
            }}
          />
          <EditCompanyPolicyModal />
          <ConfirmModal
            open={isEditSecondModalOpen}
            onClose={() => {
              setIsEditSecondModalOpen(false);
              resetEditForm();
            }}
            title="Edit Peraturan Perusahaan Berhasil"
            description="Peraturan Perusahaan berhasil diubah."
            onClick={() => {
              setIsEditSecondModalOpen(false);
              resetEditForm();
            }}
          />
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 px-4 lg:px-6">
              <div className="flex items-center justify-between gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  color="secondary"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                      const showEllipsis =
                        index > 0 && page - array[index - 1] > 1;

                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <Button
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[32px] h-8 rounded-full ${
                              currentPage === page
                                ? "bg-[#5E718D] text-white hover:bg-[#5E718D]"
                                : "text-[#455468] bg-transparent hover:bg-[#5E718D] hover:text-white"
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
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
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
      </div>
    </div>
  );
}
