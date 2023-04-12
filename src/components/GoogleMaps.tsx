import React, { useState, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import IsLoadingHOC from "../Common/IsLoadingHOC";

const GoogleMaps = (props: any) => {
  const { setLoading } = props;
  const [latLng, setCurrentLatLng] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef<any>(null);

  var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

  const successCallback = function (position: GeolocationPosition) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLatLng(location);
         setLoading(false);
        }
      );
    }
  };

  function errorCallback(error: any) {
    setLoading(false);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("Unknown error");
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  function handleLoad(maps: any) {
    setMap(maps);
  }

  async function onPlaceChanged() {
    if (autocompleteRef?.current?.value === "") {
      return;
    }

    const geocoder = new google.maps.Geocoder();
    console.log("geocoder", geocoder);
    geocoder.geocode(
      { address: autocompleteRef?.current?.value },
      function (results: any, status: any) {
        if (status === google.maps.GeocoderStatus.OK) {
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          const location = { lat: latitude, lng: longitude };
          setCurrentLatLng(location);
          // dispatch(saveCurrentLatLng(location))
          // dispatch(saveAddress(autocompleteRef.current.value))
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }

  function handleDragEnd(e: any) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results: any, status: any) => {
        if (status === "OK") {
          if (results[0]) {
            if (autocompleteRef.current) {
              autocompleteRef.current.value = results[0].formatted_address;
              geocoder.geocode({ address: autocompleteRef?.current?.value });
              console.log(results[0].formatted_address);
            }
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      }
    );
  }

  const mapContainerStyle = { width: "100%", height: "600px" };

  return (
    <section className="form--services">
      <div className="grid">
        <div className="p--0 grid----">
          <div className="grid--wrapper">
            <div className="map--wrapper">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99029.84505283511!2d-84.61044109524899!3d39.13645224401073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884051b1de3821f9%3A0x69fb7e8be4c09317!2sCincinnati%2C%20OH%2C%20USA!5e0!3m2!1sen!2sin!4v1680159428717!5m2!1sen!2sin"
                width="100%"
                style={{ border: "0px" }}
                loading="lazy"
                allowFullScreen
              ></iframe> */}
              {isLoaded && latLng && latLng.lat && latLng.lng && (
                <GoogleMap
                  center={latLng}
                  zoom={15}
                  mapContainerStyle={mapContainerStyle}
                  onLoad={handleLoad}
                >
                  <MarkerF
                    draggable
                    onDragEnd={handleDragEnd}
                    position={latLng}
                  />
                  <Autocomplete onPlaceChanged={onPlaceChanged}>
                    <div className="from--wrapper">
                      <div className="from--tabs">
                        <ul data-aos="fade-up" data-aos-duration="1000">
                          <li className="active--form--tab">
                            <div className="tabs--item">
                              <div className="icon">
                                <img
                                  src={
                                    require("../asstes/image/house--1.svg")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                              <h4>Residential Services</h4>
                            </div>
                          </li>
                          <li>
                            <div className="tabs--item">
                              <div className="icon">
                                <img
                                  src={
                                    require("../asstes/image/house--1.svg")
                                      .default
                                  }
                                  alt=""
                                />
                              </div>
                              <h4>Business Services</h4>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="from--tabs--content">
                        <div
                          className="form--group"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                        >
                          <input
                            type="search"
                            placeholder="Enter location"
                            ref={autocompleteRef}
                          />
                          <div className="btn btn--submit">
                            <button type="button">Search</button>
                          </div>
                        </div>
                        <div
                          className="current--location"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                        >
                          <span className="icon">
                            <img
                              src={
                                require("../asstes/image/house--1.svg").default
                              }
                              alt="location"
                            />
                          </span>
                          <h5>Use my current location</h5>
                        </div>
                      </div>
                    </div>
                  </Autocomplete>
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsLoadingHOC(GoogleMaps);
