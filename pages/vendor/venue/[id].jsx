import React, { useEffect } from "react";
import VendorLayout from "../../../components/Layout/VendorLayout";
import Link from "next/link";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import withUtils from "../../../utils/withUtilsVendor";
import { getDetailVenueAPI, deleteVenueAPI } from "../../../services/VenueApi";
import { useRouter } from 'next/dist/client/router';
import swal from "sweetalert";

function detailVenue({ venue }) {

  const router = useRouter();

  const deleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteVenueAPI(id)
            .then(res => {
              swal("Poof! Your venue has been deleted!", {
                icon: "success",
              });
              router.push(
                {
                  pathname: '/vendor/venue'
                }
              )
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          swal("Your venue is safe!");
        }
      });
  }

  return (
    <div className="detail-venue">
      <div className="title">{venue.name}</div>

        <div className="grid grid-cols-4 gap-6 w-full mt-6">
          {venue.Venue_Photos.map((item, index) => (
            <img
              key={index}
              src={item.url}
              className=" h-56 w-full ..."
            />
          ))}

        </div>


      <div className="title mt-10">
         {venue.address}{" "}
      </div>
      <div className="deskripsi-venue">
        <div className="flex w-full justify-between my-8">
          <p className="text-md text-gray-800 mt-0">Kapasitas {venue.capacity} Orang</p>
          <p className="text-md text-red-500">IDR {venue.price}</p>
        </div>
        <p className="text-lg font-light">
          {venue.description}
        </p>
        <div className="flex w-full justify-between my-8">
          <Link href={`/vendor/venue/editVenue/${venue.id}`}>
            <button
              className="bg-blue-500 font-xs hover:bg-blue-700 text-white rounded-2xl  py-2 px-3 justify-around flex focus:outline-none focus:shadow-outline"
              type="button"
              style={{ fontSize: "16px" }}
            >
              <PencilAltIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-3" />{" "}
              Edit Venue
            </button>
          </Link>
          <button
            className="bg-red-500 font-xs hover:bg-red-600 text-white rounded-2xl  py-2 px-3 justify-around flex focus:outline-none focus:shadow-outline"
            type="button"
            style={{ fontSize: "16px" }}
            onClick={() => deleteHandler(venue.id)}
          >
            <TrashIcon className="h-7 bg-red-500 text-white rounded-full p-1 cursor-pointer mr-3" />{" "}
            Delete Venue
          </button>

        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const venue = await getDetailVenueAPI(params.id)
    .then(res => res.data.data);

  return {
    props: {
      venue
    }
  }

}
detailVenue.Layout = VendorLayout;
export default detailVenue;
