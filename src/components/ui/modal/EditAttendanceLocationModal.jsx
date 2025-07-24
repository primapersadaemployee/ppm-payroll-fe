import { Input } from "keep-react";
import { useEditAttendanceLocationStore } from "../../../store/settings/EditAttendanceLocationStore";
import MapComponent from "../maps/MapComponent";
import { Wrapper } from "@googlemaps/react-wrapper";
import BaseModal from "./common/BaseModal";

export default function EditAttendanceLocationModal() {
  const {
    formData,
    isFirstModalOpen,
    setIsFirstModalOpen,
    setIsSecondModalOpen,
    handleInputChange,
    handleEditAttendanceLocation,
    resetForm,
  } = useEditAttendanceLocationStore();

  const handleModalSuccess = () => {
    const success = handleEditAttendanceLocation();
    if (success) {
      setIsFirstModalOpen(false);
      setIsSecondModalOpen(true);
    }
  };

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
    <BaseModal
      isOpen={isFirstModalOpen}
      onClose={() => {
        setIsFirstModalOpen(false);
        resetForm();
      }}
      title="Edit Lokasi Kehadiran"
      onSave={handleModalSuccess}
    >
      <form
        id="add-attendance-location"
        name="add-attendance-location"
        className="p-6 rounded-3xl border text-[#455468] border-gray-100 flex flex-col gap-5 font-poppins"
      >
        {/* Maps Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Pilih Lokasi</label>
          <div className="border rounded-lg p-4 bg-gray-50">
            <Wrapper
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              render={render}
              libraries={["places"]}
            >
              <MapComponent
                onLocationSelect={handleLocationSelect}
                selectedLocation={formData}
                latitude={formData.latitude}
                longitude={formData.longitude}
                zoom={20}
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
          <label htmlFor="alamat" className="block text-sm font-medium mb-2">
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
              onChange={(e) => handleInputChange("latitude", e.target.value)}
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
              onChange={(e) => handleInputChange("longitude", e.target.value)}
              readOnly
              className="bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="radius" className="block text-sm font-medium mb-2">
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
    </BaseModal>
  );
}
