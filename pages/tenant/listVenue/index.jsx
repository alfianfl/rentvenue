import React, { useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import { fetchUserVenue } from "../../../redux";
import NumberFormat from 'react-number-format';
import withUtils from "../../../utils/withUtils";

const item = [{}, {}, {}, {}, {}, {}, {}, {}];

const initialFilter = ["Semua kategori", "Termahal", "Termurah"];
function index() {
  const [openTab, setOpenTab] = React.useState(1);
  const color = "blue";

  const venueData = useSelector((state) => state.userVenue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserVenue());
  }, [dispatch]);

  console.log(venueData);
  return (
    <Link href={`/tenant/booking/${venue.id}`}>
      <div className="flex flex-wrap px-10 lg:px-20 pt-10 pb-20">
        <div className="w-1/8">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {initialFilter.map((filter) => (
              <li
                key={filter}
                className="mb-2 mr-2 last:mr-0 flex-auto text-center "
              >
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block hover:bg-blue-800 cursor-pointer leading-normal " +
                    (openTab === 1
                      ? "text-white bg-blue-600"
                      : "text-white bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                  {filter}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {venueData.loading
            ? item.map((x) => (
                <div className="bg-gray-100 w-full p-8 flex flex-wrap mt-5">
                  <div className="w-full">
                    <a
                      href="/detail/72112620-skoda-octavia-combi-iii-combi-style-green-tec"
                      className="flex flex-col relative w-full bg-white overflow-hidden card translate-3d-none-after relative w-full bg-white overflow-hidden card translate-3d-none-after rounded border border-gray-300"
                    >
                      <div
                        className="relative group text-primary-500"
                        style={{ paddingTop: "70%" }}
                      >
                        <div className="absolute top-0 left-0 h-full w-full">
                          <span className="skeleton-box group-hover:scale-110 transition-transform transform-center block h-full" />
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="pl-4 pr-4 pt-4 mb-4 text-left relative flex-grow">
                          <h3 className="text-lg font-bold text-gray-darkest mr-10">
                            <span className="skeleton-box h-5 w-1/6 inline-block" />
                            <span className="skeleton-box h-5 w-1/2 inline-block" />
                            <span className="skeleton-box h-5 w-2/4 inline-block" />
                            <span className="skeleton-box h-5 w-2/5 inline-block" />
                          </h3>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))
            : venueData.venue.map((venue) => (
                <div className="relative w-full h-[400px] lg:h-90 bg-white shadow-2xl rounded-3xl p-8 mx-2 my-3 cursor-pointer ">
                  <div className="overflow-x-hidden rounded-2xl relative">
                    <img
                      className="h-52 rounded-2xl w-full object-cover"
                      src={venue.Venue_Photos[0].url}
                    />
                  </div>
                  <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-0">
                        {venue.name}
                      </p>
                      <p className="text-xs text-gray-800 mt-0">
                        {venue.address}
                      </p>
                      <p className="text-sm text-red-500"><NumberFormat value={venue.price} displayType={'text'} thousandSeparator={true} prefix={' IDR '} /></p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-sm text-blue-600 text-center">
                      Detail
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
      </Link>
  );
}

export default index;
