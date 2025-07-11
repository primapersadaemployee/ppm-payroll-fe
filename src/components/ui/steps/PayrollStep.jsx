import { Plus } from 'phosphor-react';
import { Button, Input } from 'keep-react';
import InputDate from '../input/InputDate';
import TableRekening from '../table/TableRekening';
import { useAddKaryawanStore } from '../../../store/AddKaryawanStore';
import AddRekeningModal from '../modal/AddRekeningModal';
import ConfirmRekeningModal from '../modal/ConfirmRekeningModal';

export default function PayrollStep() {
  const {
    formData,
    rekenings,
    setRekenings,
    setIsFirstModalOpen,
    handleInputChange,
    handleDateChange,
  } = useAddKaryawanStore();

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">NPWP</h2>
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="npwp" className="block text-sm font-medium mb-2">
                NPWP <span className="text-red-500">*</span>
              </label>
              <Input
                id="npwp"
                name="npwp"
                placeholder="No NPWP"
                value={formData.npwp}
                onChange={(e) => handleInputChange('npwp', e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="npwpPemotong"
                className="block text-sm font-medium mb-2"
              >
                NPWP Pemotong <span className="text-red-500">*</span>
              </label>
              <Input
                id="npwpPemotong"
                name="npwpPemotong"
                placeholder="No NPWP"
                value={formData.npwpPemotong}
                onChange={(e) =>
                  handleInputChange('npwpPemotong', e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-4">BPJS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="noBpjsKetenagakerjaan"
                className="block text-sm font-medium mb-2"
              >
                No BPJS Ketenagakerjaan
              </label>
              <Input
                id="noBpjsKetenagakerjaan"
                name="noBpjsKetenagakerjaan"
                placeholder="Masukan No/Nomor bpjs"
                value={formData.noBpjsKetenagakerjaan}
                onChange={(e) =>
                  handleInputChange('noBpjsKetenagakerjaan', e.target.value)
                }
              />
            </div>
            <InputDate
              label="Tanggal Efektif BPJS Ketenagakerjaan (Opsional)"
              htmlFor="tanggalEfektifBpjsKetenagakerjaan"
              placeHolder="Tanggal Efektif BPJS Ketenagakerjaan"
              fieldName="tanggalEfektifBpjsKetenagakerjaan"
              value={formData.tanggalEfektifBpjsKetenagakerjaan}
              onChange={handleDateChange}
              hideAsterisk={true}
            />
            <div>
              <label
                htmlFor="noBpjsKesehatan"
                className="block text-sm font-medium mb-2"
              >
                No BPJS Kesehatan
              </label>
              <Input
                id="noBpjsKesehatan"
                name="noBpjsKesehatan"
                placeholder="No BPJS Kesehatan"
                value={formData.noBpjsKesehatan}
                onChange={(e) =>
                  handleInputChange('noBpjsKesehatan', e.target.value)
                }
              />
            </div>
            <InputDate
              label="Tanggal Efektif BPJS Kesehatan (Opsional)"
              htmlFor="tanggalEfektifBpjsKesehatan"
              placeHolder="Tanggal Efektif BPJS Kesehatan"
              fieldName="tanggalEfektifBpjsKesehatan"
              value={formData.tanggalEfektifBpjsKesehatan}
              onChange={handleDateChange}
              hideAsterisk={true}
            />
            <div>
              <label
                htmlFor="jumlahAngsuranKeluarga"
                className="block text-sm font-medium mb-2"
              >
                Jumlah Anggota Keluarga BPJS Ketenagakerjaan
              </label>
              <Input
                id="jumlahAngsuranKeluarga"
                name="jumlahAngsuranKeluarga"
                placeholder="Anggota Keluarga"
                value={formData.jumlahAngsuranKeluarga}
                onChange={(e) =>
                  handleInputChange('jumlahAngsuranKeluarga', e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-medium mb-6">Nomor Rekening</h2>
        <hr className="-mx-6 mb-4" />
        <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
          <div className="flex flex-col xl:flex-row px-4 lg:px-6 xl:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium">Daftar Nomor Rekening</h2>
            </div>
            <Button
              type="button"
              className="flex items-center gap-2 whitespace-nowrap bg-transparent hover:bg-transparent text-primary border border-primary"
              onClick={() => setIsFirstModalOpen(true)}
            >
              Tambah Nomor Rekening
              <Plus size={16} />
            </Button>
            <AddRekeningModal />
            <ConfirmRekeningModal />
          </div>
          <div className="overflow-x-auto">
            <TableRekening
              rekeningData={rekenings}
              setRekeningData={setRekenings}
              setFormData={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
