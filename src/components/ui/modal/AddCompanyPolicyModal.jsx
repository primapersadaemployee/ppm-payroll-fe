import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalHeader,
  ModalDescription,
  ModalTitle,
  Textarea,
  Upload,
  UploadBody,
  UploadFooter,
  UploadIcon,
  UploadText,
} from "keep-react";
import { useAddCompanyPolicyStore } from "../../../store/settings/AddCompanyPolicyStore";
import { useCallback, useState } from "react";
import { Info } from "phosphor-react";
import IconUpload from "/upload-icon.png";

export default function AddCompanyPolicyModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    handleInputChange,
    handleFileChange,
    handleAddCompanyPolicy,
  } = useAddCompanyPolicyStore();

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const handleSubmit = () => {
    handleAddCompanyPolicy();
    setFiles([]);
  };

  return (
    <Modal
      open={isFirstModalOpen}
      onClose={() => setIsFirstModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Tambah Peraturan
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data peraturan dibawah ini.
            </ModalDescription>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                onClick={() => setIsFirstModalOpen(false)}
              >
                Kembali
              </Button>
              <Button
                type="button"
                className="flex items-center gap-2 font-poppins whitespace-nowrap bg-primary hover:bg-primary text-white font-medium"
                onClick={handleSubmit}
              >
                Tambahkan
              </Button>
            </div>
          </div>
          <form
            id="add-company-policy"
            name="add-company-policy"
            className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
          >
            <div>
              <label htmlFor="judul" className="block text-sm font-medium mb-2">
                Judul Peraturan <span className="text-red-500">*</span>
              </label>
              <Input
                id="judul"
                name="judul"
                placeholder="Judul"
                value={formData.judul}
                onChange={(e) => handleInputChange("judul", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="isi" className="block text-sm font-medium mb-2">
                Isi Peraturan
              </label>
              <Textarea
                id="isi"
                name="isi"
                rows={8}
                placeholder="Isi Peraturan"
                value={formData.isi}
                onChange={(e) => handleInputChange("isi", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="lampiran"
                className="block text-sm font-medium mb-2"
              >
                Lampiran
              </label>
              <Upload
                onChange={handleFileChange}
                id="lampiran"
                options={{ onDrop, multiple: false }}
              >
                <UploadBody id="lampiran">
                  <UploadIcon>
                    <img src={IconUpload} alt="folder" />
                  </UploadIcon>
                  <UploadText>
                    <p className="text-body-3 font-medium text-metal-600 dark:text-white">
                      Drag & Drop or Choose File to Upload
                    </p>
                    <p className="text-body-4 font-normal text-metal-400 dark:text-metal-300">
                      DOCX, XLSX, PPTX, PDF, and JPG formats, up to 50 MB.
                    </p>
                  </UploadText>
                </UploadBody>
                <UploadFooter id="lampiran" isFileExists={files.length > 0}>
                  <p className="my-2 flex items-center gap-1 text-body-4 font-normal text-metal-600 dark:text-metal-300">
                    <Info size={16} />
                    Uploaded Files
                  </p>
                  <ul className="space-y-1">
                    {files?.map((file) => (
                      <li
                        key={file?.name}
                        className="flex items-center justify-between border-l-4 border-l-metal-100 bg-metal-25 px-4 py-2.5 text-left text-body-4 font-normal capitalize text-metal-600 dark:border-l-metal-600 dark:bg-metal-800 dark:text-metal-300 "
                      >
                        {file?.name}
                      </li>
                    ))}
                  </ul>
                </UploadFooter>
              </Upload>
            </div>
          </form>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
