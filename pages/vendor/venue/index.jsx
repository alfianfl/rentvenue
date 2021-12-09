import React, {useEffect} from "react";
import VendorLayout from "../../../components/Layout/VendorLayout";
import {
DocumentAddIcon
  } from "@heroicons/react/solid";
import { VendorVenue } from "../../../components/Card";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {fetchVenue, fetchVenueVerified} from "../../../redux";
import Cookies from "js-cookie";
import withUtilsVendor from "../../../utils/withUtilsVendor";

function venue() {
  const venueData = useSelector(state=>state.venue);
  const venueDataVerified = useSelector(state=>state.venueVerified);
  const dispatch = useDispatch();

  const vendorId = Cookies.get("vendorId");

  console.log(venueData);

  useEffect(() => {
    dispatch(fetchVenue(vendorId));
    dispatch(fetchVenueVerified(vendorId));
  }, [dispatch]);

  return (
    <div className="vendor-venue">
      <div className="title">
        Hi,  Selamat datang di rentavenue
      </div>
      <div className="flex items-center justify-start mt-10">
          <Link href="/vendor/venue/addVenue">
            <button
            className="bg-blue-500 font-xs hover:bg-blue-700 text-white rounded-2xl  py-2 px-3 justify-around flex focus:outline-none focus:shadow-outline"
            type="button"
            style={{ fontSize: "16px" }}
            >
            <DocumentAddIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-3" />{" "}
            Tambah Venue
            </button>
          </Link>
      </div>
      <div className="relative m-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {
          venueDataVerified.venue.map((venue, index)=>(
            <VendorVenue key={index} data={venue} />
          ))
        }
      </div>
      <div className="title mt-20 mb-10">
        Venue yang belum terverifikasi admin
      </div>
      <div className="relative m-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {
          venueData.venue.map((venue, index)=>(
            <VendorVenue key={index} data={venue} />
          ))
        }
      </div>
      

    </div>
  );
}

venue.Layout = VendorLayout;
export default venue;
