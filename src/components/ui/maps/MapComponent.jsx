import { useEffect, useRef, useState } from "react";

export default function MapComponent({
  onLocationSelect,
  selectedLocation,
  latitude = -6.2088,
  longitude = 106.8456,
  zoom = 12,
}) {
  const ref = useRef();
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      const mapInstance = new window.google.maps.Map(ref.current, {
        center: { lat: latitude, lng: longitude },
        zoom: zoom,
      });

      setMap(mapInstance);

      // Event listener untuk click pada map
      mapInstance.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        // Reverse geocoding untuk mendapatkan alamat
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;

            onLocationSelect({
              alamat: address,
              latitude: lat.toString(),
              longitude: lng.toString(),
            });
          }
        });
      });
    }
  }, [ref, map, onLocationSelect]);

  // Update marker ketika lokasi berubah
  useEffect(() => {
    if (map && selectedLocation.latitude && selectedLocation.longitude) {
      const lat = parseFloat(selectedLocation.latitude);
      const lng = parseFloat(selectedLocation.longitude);

      if (marker) {
        marker.setMap(null);
      }

      const newMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: selectedLocation.nama,
        animation: window.google.maps.Animation.DROP,
      });

      setMarker(newMarker);
      map.setCenter({ lat, lng });
    }
  }, [map, selectedLocation]);

  return <div ref={ref} className="w-full h-64 rounded-lg" />;
}
