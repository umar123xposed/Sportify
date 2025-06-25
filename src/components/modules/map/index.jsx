import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Circle,
  Autocomplete,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { positions, width } from "@mui/system";

const Map = (props) => {
  const loc = {
    latitude: 19.584634,
    longitude: 9.29883,
  };
  //useSelector((itm) => itm?.content?.location);

  const containerStyle = {
    width: "100%",
    height: "450px",
  };

  const [selectedLocation, setSelectedLocation] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = useState(null);
  const [address, setAddress] = useState(null);

  const autocompleteRef = useRef(null);
  const dispatch = useDispatch();

  const mapcustomStyle = {
    borderRadius: "12px",
    width: "100%",
    height: "30rem",
    position: "relative",
  };

  const onPlaceChanged = () => {
    console.log("change");
    if (autocompleteRef.current) {
      console.log("change");
      const place = autocompleteRef.current.getPlace();
      console.log(place, "asfasffas");
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(newLocation);
        props?.state(newLocation, place.formatted_address);
        fetchAddress(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        );
        map.panTo(newLocation);
      }
    }
  };

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    props?.state({ lat, lng });
    fetchAddress(lat, lng);
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          import.meta.env.VITE_GOOGLEMAP_KEY
        }`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        console.log(data.results[0]?.geometry?.location?.lat);

        const addressComponents = data.results[0].address_components;

        // Extracting specific parts
        let street = "";
        let city = "";
        let state = "";
        let country = "";
        let postalCode = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("route")) {
            street = component.long_name;
          }
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        // Standardized Address Object

        setAddress({
          street,
          city,
          state,
          country,
          postalCode,
          formattedAddress: data.results[0].formatted_address, // Full address
        });
        // localStorage.setItem("loc" , JSON.stringify(data))
        // setAddress(data.results[0]);
        // setValue("location", data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      // setAddress(prevState => ({ ...prevState, address: "Error fetching address" }));
    }
  };

  const handleSelect = () => {
    console.log(address);
    // dispatch(addAddress(JSON.stringify(address)));
    props?.state((prevState) => ({
      ...prevState,
      show1: false,
      addres: address,
    }));

    props?.setModal();
  };

  return (
    <div className="my-2 text-center marg-bottom">
      <>
        <div className="d-flex justify-content-end">
          <svg
            onClick={() => props?.setModal(false)}
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="25"
            viewBox="0 0 41 40"
            fill="none"
          >
            <mask
              id="mask0_3632_3419"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="41"
              height="40"
            >
              <rect x="0.777344" width="40" height="40" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_3632_3419)">
              <path
                d="M14.6529 27.5983L20.7767 21.4742L26.9004 27.5983L28.375 26.1237L22.2509 20L28.375 13.8762L26.9004 12.4017L20.7767 18.5258L14.6529 12.4017L13.1784 13.8762L19.3025 20L13.1784 26.1237L14.6529 27.5983ZM20.7796 35.8333C18.601 35.8333 16.55 35.4178 14.6267 34.5867C12.7034 33.7555 11.0243 32.623 9.58961 31.1892C8.15516 29.755 7.02211 28.0767 6.19044 26.1542C5.35905 24.2317 4.94336 22.1812 4.94336 20.0029C4.94336 17.8129 5.35891 15.7544 6.19003 13.8275C7.02114 11.9005 8.15364 10.2244 9.58753 8.79916C11.0217 7.37388 12.7 6.24541 14.6225 5.41374C16.545 4.58235 18.5954 4.16666 20.7738 4.16666C22.9638 4.16666 25.0222 4.58221 26.9492 5.41332C28.8761 6.24443 30.5522 7.37235 31.9775 8.79707C33.4028 10.2218 34.5313 11.8972 35.3629 13.8233C36.1943 15.7494 36.61 17.8074 36.61 19.9971C36.61 22.1757 36.1945 24.2267 35.3634 26.15C34.5322 28.0733 33.4043 29.7523 31.9796 31.1871C30.5549 32.6215 28.8795 33.7546 26.9534 34.5862C25.0272 35.4176 22.9693 35.8333 20.7796 35.8333ZM20.7767 33.7392C24.6042 33.7392 27.851 32.4033 30.5171 29.7317C33.1829 27.06 34.5159 23.8161 34.5159 20C34.5159 16.1725 33.1829 12.9257 30.5171 10.2596C27.851 7.59374 24.6042 6.26082 20.7767 6.26082C16.9606 6.26082 13.7167 7.59374 11.045 10.2596C8.37336 12.9257 7.03753 16.1725 7.03753 20C7.03753 23.8161 8.37336 27.06 11.045 29.7317C13.7167 32.4033 16.9606 33.7392 20.7767 33.7392Z"
                fill="white"
              />
            </g>
          </svg>
        </div>
        <div
          style={{ position: "absolute", zIndex: "999", top: "40px" }}
          className="w-100 d-flex justify-content-center"
        >
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              style={{
                color: "#fff",
                fontSize: "14px",
                backgroundColor: "#1E1E1E",
                borderRadius: "25px",
                border: "none",
                minWidth: "360px",
                padding: "10px 20px",
              }}
              type="text"
              className="w-100 "
              placeholder="Search location"
            />
          </Autocomplete>
        </div>

        <GoogleMap
          mapContainerStyle={mapcustomStyle}
          center={selectedLocation}
          zoom={14}
          onLoad={(map) => setMap(map)}
          options={{
            zoomControl: true,
            fullscreenControl: false, // Enables fullscreen button
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: false,
            disableDefaultUI: true, // Enables default UI (includes My Location button)
          }}
          onClick={(e) => {
            onMapClick(e);
          }}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </>
      <div className="d-flex justify-content-center">
        <button
          className="primary-btn py-3 my-4"
          style={{ position: "absolute", bottom: "0", minWidth: "150px" }}
          onClick={handleSelect}
        >
          <h3>Select</h3>
        </button>
      </div>
    </div>
  );
};

export default Map;
