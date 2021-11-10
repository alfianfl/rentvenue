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
import { getFeedbackAPI } from "../../../services/FeedbackAPI";
import { bookingAPI } from "../../../services/TransactionAPI";
import { ModalBooking } from "../../../components/Modal";
import Cookies from "js-cookie";

import moment from "moment";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxmaWFuZmwiLCJhIjoiY2t0amQwb3oyMWFuZzJwcnRzZG90eWZkbCJ9.zn3csz72YfegBayAqOuWDA";

function booking({ venue, feedback }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dayBook, setDayBook] = useState(1);
  const [bookToken, setBookToken] = useState(false);
  const [modalBook, setModalBook] = useState(false);

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

  console.log(feedback);

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

  const getStar = (length) => {
    let rating = [];
    for (let i = 0; i < length; i++) {
      rating.push(<StarIcon className="h-5 text-yellow-500" style={{fontSize:"30px"}} key={i} />);
    }
    return <>{rating}</>;
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
      <div className="container px-0 lg:px-20 py-20 m-auto">
        <h1 className="font-bold text-lg lg:text-2xl lg:text-left text-center mb-4 lg:px-0 px-5">
          {venue.name}
        </h1>
        <div className=" lg:w-1/3 text-sm lg:text-md flex justify-between mb-4 lg:px-0 px-5">
          <span className="flex ">
            {" "}
            <StarIcon className="h-6 text-yellow-400 mr-3 " />{" "}
            <span className="my-auto">{feedback.averageRating} ( {feedback.findFeedback.length} Ulasan)</span>{" "}
          </span>
          <span className="font-bold">{venue.address}</span>
        </div>
        <div className="mb-14">
          <SwiperBooking>
            {
              venue.Venue_Photos.map(img=>(
                <SwiperSlide key={img.url}>
                  <div className="cursor-pointer">
                    <div className="relative h-96 w-full">
                      <Image
                        src={img.url}
                        layout="fill"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
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
                <span className="my-auto"> {feedback.averageRating} ( {feedback.findFeedback.length} Ulasan)</span>
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

        <div className="my-20">
          <h1 className="font-bold text-4xl">Ulasan</h1>
          { feedback.findFeedback.length === 0 ? <h1 className="font-lg text-gray-700">Belum ada ulasan...</h1> :
          feedback.findFeedback.map((feedback, index) => (
            <div key={index}>
              <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl">
                <div className="relative h-14 w-14">
                  <Image
                    src={
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    layout="fill"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <span className="font-bold">{feedback.Transaction.User.firstName}</span>
                </div>
              </div>

              <div className="rating">
                {" "}
                <p className="flex items-center my-2">{getStar(feedback.rating)}</p>
                <p className="text-gray-400 text-sm">{feedback.feedback_content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalBooking path={bookToken} isOpen={modalBook} />
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const venue = await getDetailVenueAPI(params.id).then((res) => res.data.data);
  const feedback = await getFeedbackAPI(params.id).then((res) => res.data.data);
  return {
    props: {
      venue,
      feedback,
    },
  };
}
export default booking;
