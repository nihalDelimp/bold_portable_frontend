/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import simpleMarker from '../assets/img/marker.png'

function SimpleMap() {
  const [latLng , setCurrentLatLng] =  useState({lat: 28.5927167 , lng : 77.2972733})
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef();

  var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

  const successCallback = function (position) {
   // setLoading(false);
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const location = { lat: lat, lng: lng };
    console.log("Location" , location)
   // setCurrentLatLng(location);
  };

  function errorCallback() {
   // setLoading(false);
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
      // setLoading(true)
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }, []);

  const { isLoaded } = useJsApiLoader(
    {
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    },
    []
  );

  function handleLoad(maps) {
    setMap(maps);
  }

//   const handleBoundsChanged = () => {
//     var lat = map.getCenter().lat();
//     var lng = map.getCenter().lng();
//     if (latLng.lat !== lat && latLng.lng !== lng) {
//       setTimeout(() => {
//         const latLng = { lat: lat, lng: lng };
//         //  dispatch(saveCurrentLatLng(latLng))
//       }, 500);
//     }
//   };


  async function onPlaceChanged(place) {
    console.log("originRef", autocompleteRef.current.value);
    if (autocompleteRef.current.value === "") {
      return;
    }
    const geocoder = new google.maps.Geocoder();
    console.log("geocoder", geocoder);
    geocoder.geocode(
      { address: autocompleteRef.current.value },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          const location = { lat: latitude, lng: longitude };
          setCurrentLatLng(location)
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

  const mapContainerStyle = { width: "100%", height: "600px" };
console.log('latLng' , latLng)
  return (
    <div className="container mt-5">
    <div className="track-maps-content">
      {isLoaded && latLng && latLng.lat  && latLng.lng  && (
        <GoogleMap
          center={latLng}
          // onBoundsChanged={handleBoundsChanged}
          zoom={15}
          mapContainerStyle={mapContainerStyle}
          onLoad={handleLoad}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={latLng}  icon = {simpleMarker} />
          <Autocomplete onPlaceChanged={(place) => onPlaceChanged(place)}>
            <section className="content mt-1 p-3">
              <div className="row">
                <div className="col-12">
                  <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      style={{ borderRadius: "2.25rem", height: "2.5rem" }}
                      className="form-control"
                      ref={autocompleteRef}
                      type="search"
                      placeholder="Search"
                    />
                    <div className="col-auto">
                      <button className="btn btn-lg" type="submit">
                        <i className="bi-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Autocomplete>
        </GoogleMap>
      )}
    </div>
    </div>
  );
}
export default SimpleMap;
