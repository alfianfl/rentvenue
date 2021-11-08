import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { SwiperBooking } from "../../../components/Swiper";
import Image from "next/image";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import { StarIcon } from "@heroicons/react/solid";

import { getDetailVenueAPI } from "../../../services/VenueApi";
import { bookingAPI } from "../../../services/TransactionAPI";
import { ModalBooking } from "../../../components/Modal";
import Cookies from "js-cookie";

import moment from "moment";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxmaWFuZmwiLCJhIjoiY2t0amQwb3oyMWFuZzJwcnRzZG90eWZkbCJ9.zn3csz72YfegBayAqOuWDA";

function booking({ venue }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dayBook, setDayBook] = useState(1);
  const [bookToken, setBookToken] = useState(false);
  const [modalBook, setModalBook] = useState(false);

  console.log(new Date());

  console.log(venue);

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [geoLocation, setGeoLocation] = useState({
    lat: "",
    long: "",
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      setGeoLocation({
        ...geoLocation,
        lat: newViewport.latitude,
        long: newViewport.longitude,
      });
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const bookingHandler = () => {
    const startBook = moment(startDate);
    const endBook = moment(endDate);

    const payload = {
      VenueId: venue.id,
      start_book: startBook.format("YYYY-MM-DDThh:mm:ssZ"),
      finish_book: endBook.format("YYYY-MM-DDThh:mm:ssZ"),
    };
    bookingAPI(payload)
      .then((res) => {
        console.log(res.data.redirect_url);
        if (res.data.redirect_url) {
          setModalBook(true);
          setBookToken(res.data.redirect_url);
        } else {
          alert("tanggal sudah terisi");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var oneDay = 24 * 60 * 60 * 1000;
    const day =
      Math.round(
        Math.round((endDate.getTime() - startDate.getTime()) / oneDay)
      ) + 1;
    setDayBook(day);
  });

  useEffect(() => {
    Cookies.set("bookingToken", bookToken, { path: "" });
  }, [bookToken]);
  return (
    <div className="booking-page">
      <div className="container px-0 lg:px-20 py-20">
        <h1 className="font-bold text-lg lg:text-2xl lg:text-left text-center mb-4 lg:px-0 px-5">
          {venue.name}
        </h1>
        <div className=" lg:w-1/3 text-sm lg:text-md flex justify-between mb-4 lg:px-0 px-5">
          <span className="flex ">
            {" "}
            <StarIcon className="h-6 text-yellow-400 mr-3 " />{" "}
            <span className="my-auto">4,5 (21 Ulasan)</span>{" "}
          </span>
          <span className="font-bold">{venue.address}</span>
        </div>
        <div className="mb-14">
          <SwiperBooking>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="relative h-96 w-full">
                  <Image
                    src={
                      "data:image/jpeg;base64,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"
                    }
                    layout="fill"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="cursor-pointer">
                <div className="relative h-96 w-full">
                  <Image
                    src={
                      "data:image/jpeg;base64,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"
                    }
                    layout="fill"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          </SwiperBooking>
        </div>
        <div className="justify-center lg:flex lg:justify-between w-full ">
          <p className="mr-0 lg:mr-20">{venue.description}</p>
          <div className="relative ml-0 lg:ml-20 max-w-sm w-[100%] lg:w-[350px] bg-white shadow-2xl rounded-3xl p-8 mb-3 cursor-pointer ">
            <div className="mt-4 pl-2 mb-2 flex justify-between ">
              <p className="text-sm text-red-500">
                IDR {venue.price}{" "}
                <span className="font-bold text-black">/hari</span>
              </p>
              <p className="text-xs text-gray-800 mt-0 flex">
                <StarIcon className="h-5 text-yellow-400 mr-1" />{" "}
                <span className="my-auto"> 4,5 (21 Ulasan)</span>
              </p>
            </div>
            <div className="booking-date">
              <div className="flex mt-2 justify-center ">
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["049ADA"]}
                  onChange={handleSelect}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <span
                onClick={bookingHandler}
                className="text-sm text-white px-10 py-3 rounded-xl bg-blue-500 hover:bg-blue-700 text-center cursor-pointer"
              >
                Booking
              </span>
            </div>
            <div className="mt-4 pl-2 mb-2 flex justify-between ">
              <p className="text-sm">
                IDR {venue.price}
                <span className="font-bold text-black"> X {dayBook} Hari</span>
              </p>
              <p className="text-xs text-gray-800 mt-0">
                IDR {dayBook * venue.price}
              </p>
            </div>
            <div className="mt-4 pl-2 mb-2 flex justify-between ">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg text-gray-800 mt-0 font-bold">
                IDR {dayBook * venue.price}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-location px-5 lg:px-20 lg:block hidden">
        <div className="mb-8 w-[full] lg:w-full">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="username"
          >
            Lokasi anda
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

        <h1 className="font-bold text-2xl">Ulasan</h1>
        <div>
          <div className="flex">
            <img src="" alt="profile" />
            <span className="ml-5">Naufal</span>
          </div>

          <div className="rating">
            {" "}
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400" />
            </p>
          </div>
        </div>
      </div>
      <ModalBooking path={bookToken} isOpen={modalBook} />
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const venue = await getDetailVenueAPI(params.id).then((res) => res.data.data);
  return {
    props: {
      venue,
    },
  };
}
export default booking;
