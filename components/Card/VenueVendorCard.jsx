import React from "react";
import Link from "next/link";

function VenueVendorCard({data}) {
  console.log(data);
  return (
    <div className="relative max-w-sm min-w-[350px] bg-white shadow-2xl rounded-3xl p-8 mx-1 my-3 cursor-pointer ">
      <div className="overflow-x-hidden rounded-2xl relative">
        <img
          className="h-40 rounded-2xl w-full object-cover"
          src={data.Venue_Photos[0].url}
        />
      </div>
      <div className="mt-4 pl-2 mb-2 flex justify-between ">
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-0">
            {data.name}
          </p>
          <p className="text-xs text-gray-800 mt-0">{data.address}</p>
          <p className="text-sm text-red-500">IDR {data.price}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <span className="text-sm text-blue-600 text-center">
          <Link href={`venue/${data.id}`}>Detail</Link>
        </span>
      </div>
    </div>
  );
}

export default VenueVendorCard;
