import React from "react";
import VendorLayout from "../../../components/Layout/VendorLayout";
import {
DocumentAddIcon
  } from "@heroicons/react/solid";
import { VendorVenue } from "../../../components/Card";
import Link from "next/link";

function index() {
  return (
    <div className="vendor-venue">
      <div className="title">
        Hi, [Nama Orang]. Anda memiliki [Jumlah] Venue
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

        <VendorVenue />
   
      
      <div className="title mt-20 mb-10">
        Venue yang belum terverifikasi admin
      </div>
      <VendorVenue />
    </div>
  );
}

index.Layout = VendorLayout;
export default index;
