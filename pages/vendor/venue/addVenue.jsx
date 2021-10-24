import React, { useState, useRef, useCallback } from "react";
import VendorLayout from "../../../components/Layout/VendorLayout";
import {
  FolderOpenIcon,
  PhotographIcon,
  SaveIcon,
} from "@heroicons/react/solid";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxmaWFuZmwiLCJhIjoiY2t0amQwb3oyMWFuZzJwcnRzZG90eWZkbCJ9.zn3csz72YfegBayAqOuWDA";
function addVenue() {
  const [file, setFile] = useState({ raw1: "", raw: "" });
  const [image, setImage] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const [geoLocation, setGeoLocation] = useState({
    lat:"",
    long:""
  })
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      setGeoLocation({...geoLocation, lat: newViewport.latitude, long: newViewport.longitude});
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  const handleChange = (e) => {
    if (e.target.files.length) {
      if (e.target.name === "ktp") {
        setFile({ ...file, raw1: e.target.files[0].name });
      } else {
        setFile({ ...file, raw2: e.target.files[0].name });
      }
    }
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length < 6 && image.length < 5) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImage((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    } else {
      alert("File maksimal 5");
    }
  };

  // render photoimage
  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img
          src={photo}
          alt="image"
          className="h-full w-full mb-20 cursor-pointer"
          key={photo}
        />
      );
    });
  };

  return (
    <div className="add-venue-vendor">
      <form className="bg-transparent pt-6 w-[full]  pb-8 mb-4">
        <div className="mb-8 w-[full] lg:w-1/3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Nama Gendung
          </label>
          <input
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nama gedung"
            type="text"
          />
        </div>
        <div className="mb-8 w-[full] lg:w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Deskripsi
          </label>
          <textarea
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deskripsi"
            type="textarea"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {renderPhotos(image)}
        </div>
        <div className="button-image-profile w-1/3 mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Tambahkan foto (Maksimal 5 foto)
          </label>
          <label htmlFor="upload-button1" className="flex">
            <div className="bg-transparent flex justify-between align-center text-blue-700 font-semibold cursor-pointer  py-1 px-4 border border-blue-500  rounded-2xl">
              <div>
                <PhotographIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-10" />
              </div>
              <div className="text-center m-auto" style={{ fontSize: "14px" }}>
                {" "}
                Tambah Gambar{" "}
              </div>
            </div>
            <span
              className="font-light ml-3"
              style={{ fontSize: "16px" }}
            ></span>
          </label>
          <input
            type="file"
            name="ktp"
            id="upload-button1"
            hidden
            multiple
            onChange={handleChangeImage}
          />
        </div>
        <div className="mb-8 w-[full] lg:w-1/3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Kota
          </label>
          <input
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="kota"
            type="text"
          />
        </div>
        <div className="mb-8 w-[full] lg:w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Alamat 
          </label>
          <div style={{ height: "500px", width: "100%" }}>
            <MapGL
              ref={mapRef}
              {...viewport}
              width="100%"
              height="100%"
              onViewportChange={handleViewportChange}
              mapStyle="mapbox://styles/alfianfl/cktjd6j0o261c18qfjwjrknzz"
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
              <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position="top-left"
              />
            </MapGL>
          </div>
        </div>
        <div className="mb-8 w-[full] lg:w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Patokan Alamat (Nama jalan)
          </label>
          <input
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="kota"
            type="text"
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-8">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Kapasitas
            </label>
            <input
              className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="number"
              placeholder="0"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Harga Sewa
            </label>
            <input
              className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-last-name"
              type="number"
              placeholder="Rp"
            />
          </div>
        </div>
        <div className="button-image-profile w-1/3 mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Tambahkan Foto Surat
          </label>
          <label htmlFor="upload-button" className="flex">
            <div className="bg-transparent flex justify-between align-center text-blue-700 font-semibold cursor-pointer  py-1 px-4 border border-blue-500  rounded-2xl">
              <div>
                <FolderOpenIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-10" />
              </div>
              <div className="text-center m-auto" style={{ fontSize: "14px" }}>
                {" "}
                Tambah File{" "}
              </div>
            </div>
            <span className="font-light ml-3" style={{ fontSize: "16px" }}>
              {file.raw2}
            </span>
          </label>
          <input
            type="file"
            onChange={handleChange}
            name="surat"
            id="upload-button"
            hidden
          />
        </div>
        <div className="button-image-profile w-1/3 mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Tambahkan Foto KTP
          </label>
          <label htmlFor="upload-button2" className="flex">
            <div className="bg-transparent flex justify-between align-center text-blue-700 font-semibold cursor-pointer  py-1 px-4 border border-blue-500  rounded-2xl">
              <div>
                <PhotographIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-10" />
              </div>
              <div className="text-center m-auto" style={{ fontSize: "14px" }}>
                {" "}
                Tambah Gambar{" "}
              </div>
            </div>
            <span className="font-light ml-3" style={{ fontSize: "16px" }}>
              {file.raw1}
            </span>
          </label>
          <input
            type="file"
            onChange={handleChange}
            name="ktp"
            id="upload-button2"
            multiple
            hidden
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 font-xs hover:bg-blue-700 text-white rounded-2xl  py-2 px-3 justify-around flex focus:outline-none focus:shadow-outline"
            type="button"
            style={{ fontSize: "16px" }}
          >
            <SaveIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-3" />{" "}
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

addVenue.Layout = VendorLayout;
export default addVenue;