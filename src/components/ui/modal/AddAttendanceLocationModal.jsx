import {
  Button,
  Input,
  Modal,
  ModalAction,
  ModalContent,
  ModalHeader,
  ModalDescription,
  ModalTitle,
} from "keep-react";
import { useAddAttendanceLocationStore } from "../../../store/settings/AddAttendanceLocationStore";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../maps/MapComponent";

export default function AddAttendanceLocationModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    handleInputChange,
    handleAddAttendanceLocation,
  } = useAddAttendanceLocationStore();

  const handleLocationSelect = (locationData) => {
    // Update form data dengan data lokasi yang dipilih
    Object.keys(locationData).forEach((key) => {
      handleInputChange(key, locationData[key]);
    });
  };

  const render = (status) => {
    if (status === "LOADING")
      return <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />;
    if (status === "FAILURE")
      return (
        <div className="h-64 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
          Error loading map
        </div>
      );
    return null;
  };

  return (
    <Modal
      open={isFirstModalOpen}
      onClose={() => setIsFirstModalOpen(false)}
      showCloseIcon={false}
    >
      <ModalAction asChild></ModalAction>
      <ModalContent className="max-w-md lg:max-w-[960px] overflow-auto h-full max-h-[800px]">
        <ModalHeader className="py-6 flex flex-col justify-center gap-8">
          <div className="flex justify-between items-center">
            <ModalTitle className="xl:text-2xl font-medium text-[#455468] font-poppins">
              Tambah Lokasi Kantor
            </ModalTitle>
            <ModalDescription className="hidden">
              Silahkan isi data lokasi kantor dibawah ini.
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
                onClick={handleAddAttendanceLocation}
              >
                Simpan
              </Button>
            </div>
          </div>

          <form
            id="add-attendance-location"
            name="add-attendance-location"
            className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
          >
            {/* Maps Section */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pilih Lokasi
              </label>
              <div className="border rounded-lg p-4 bg-gray-50">
                <Wrapper
                  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  render={render}
                  libraries={["places"]}
                >
                  <MapComponent
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={formData}
                  />
                </Wrapper>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Klik pada peta atau gunakan pencarian untuk memilih lokasi
              </p>
            </div>

            {/* Form Fields */}
            <div>
              <label htmlFor="nama" className="block text-sm font-medium mb-2">
                Nama Lokasi
              </label>
              <Input
                id="nama"
                name="nama"
                placeholder="Nama Lokasi"
                value={formData.nama}
                onChange={(e) => handleInputChange("nama", e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="alamat"
                className="block text-sm font-medium mb-2"
              >
                Alamat
              </label>
              <Input
                id="alamat"
                name="alamat"
                placeholder="Alamat"
                value={formData.alamat}
                onChange={(e) => handleInputChange("alamat", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium mb-2"
                >
                  Latitude
                </label>
                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={(e) =>
                    handleInputChange("latitude", e.target.value)
                  }
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium mb-2"
                >
                  Longitude
                </label>
                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={(e) =>
                    handleInputChange("longitude", e.target.value)
                  }
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="radius"
                className="block text-sm font-medium mb-2"
              >
                Radius (meter)
              </label>
              <Input
                id="radius"
                name="radius"
                placeholder="Radius"
                value={formData.radius}
                onChange={(e) => handleInputChange("radius", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="ip" className="block text-sm font-medium mb-2">
                Alamat IP
              </label>
              <Input
                id="ip"
                name="ip"
                placeholder="Alamat IP"
                value={formData.ip}
                onChange={(e) => handleInputChange("ip", e.target.value)}
              />
            </div>
          </form>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
