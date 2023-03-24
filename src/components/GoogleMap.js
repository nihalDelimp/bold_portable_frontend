/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    Autocomplete,
} from "@react-google-maps/api";
import IsLoadingHOC from "../Common/IsLoadingHOC";


function SimpleMap(props) {
    const {setLoading}  = props
    const [latLng, setCurrentLatLng] = useState(null)
    const [map, setMap] = useState(null);
    const autocompleteRef = useRef();

    var options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
    };

    const successCallback = function (position) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const location = { lat: position.coords.latitude, lng: position.coords.longitude };
                setCurrentLatLng(location)
                setLoading(false);
            });
        }
    };


    function errorCallback() {
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
            setLoading(true)
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

    function handleDragEnd(e) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    autocompleteRef.current.value = results[0].formatted_address
                    geocoder.geocode({ address: autocompleteRef.current.value })
                    console.log(results[0].formatted_address)
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });
    }


    const mapContainerStyle = { width: "100%", height: "600px" };
    console.log('latLng', latLng)
    return (
        <div className="container mt-5">
            <div className="track-maps-content">
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
                            position={latLng} />
                        <Autocomplete onPlaceChanged={(place) => onPlaceChanged(place)}>
                            <section className="content mt-5 p-3">
                                <div className="row">
                                    <div className="mx-auto col-10 col-lg-8">
                                        <div className="form-group">
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
export default  IsLoadingHOC(SimpleMap);
