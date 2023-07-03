import React, { useState, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import { originPoint, originAddress } from "../Helper/constants";
import { calculateDistance } from "../Helper";

const GoogleMaps = (props: any) => {
  const { distanceCallBack, placementLocationCallBack , placementAddressCallBack } = props;
  let [map, setMap] = useState(null);
  let autocompleteRef = useRef<any>(null);
  const [markerPoint , setMarkerPoint] = useState(originPoint)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.value = originAddress;
    }
  }, []);

  function handleLoad(maps: any) {
    setMap(maps);
  }

  async function onPlaceChanged() {
    
    if (autocompleteRef?.current?.value === "") {
      return;
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: autocompleteRef?.current?.value },
      function (results: any, status: any) {
        if (status === google.maps.GeocoderStatus.OK) {
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          const destination = { lat: latitude, lng: longitude };
          let distance = calculateDistance(originPoint, destination);
          distanceCallBack(distance);
          placementLocationCallBack(destination);
          placementAddressCallBack(autocompleteRef?.current?.value)
          setMarkerPoint(destination)
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }

  const getAddressFromLatLng = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results: any, status: any) => {
        if (status === "OK") {
          if (results[0]) {
            if (autocompleteRef.current) {
              autocompleteRef.current.value = results[0].formatted_address;
              geocoder.geocode({ address: autocompleteRef?.current?.value });
              placementAddressCallBack(autocompleteRef?.current?.value)
            }
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      }
    );
  };

  function handleDragEnd(e: any) {
    let destination = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    getAddressFromLatLng(e.latLng.lat(), e.latLng.lng());
    let distance = calculateDistance(originPoint, destination);
    distanceCallBack(distance);
    placementLocationCallBack(destination);
  }

  const mapContainerStyle = { width: "100%", height: "400px" };

  return (
    <React.Fragment>
      <section style={{ paddingBottom: "15px" }} className="form--services">
        {isLoaded && (
          <GoogleMap
            center={markerPoint}
            zoom={13}
            mapContainerStyle={mapContainerStyle}
            onLoad={handleLoad}
          >
            <MarkerF
              draggable
              onDragEnd={handleDragEnd}
              position={markerPoint}
            />
            <Autocomplete onPlaceChanged={onPlaceChanged}>
              <div
               
                className="from--wrapper" style={{maxWidth:"460px"}}
              >
                <div className="from--tabs--content">
                  <div
                    className="form--group"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <input
                      style={{ padding: "0px 12px" }}
                      type="search"
                      placeholder="Enter placement location"
                      ref={autocompleteRef}
                    />
                  </div>
                </div>
              </div>
            </Autocomplete>
          </GoogleMap>
        )}
      </section>
    </React.Fragment>
  );
};

export default GoogleMaps;
