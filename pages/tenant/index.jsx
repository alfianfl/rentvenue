import Head from "next/head";
import React, { useEffect, useState } from "react";

import Banner from "../../components/Banner";
import { LargeCard, MediumCard, SmallCard } from "../../components/Card";
import withUtils from "../../utils/withUtils";
import Link from "next/link";
import gedung from "../../assets/index.jpg";
import bgHome from "../../assets/bgHome.png";
import {
  getVenueByCityAPI,
  getVenueCityFilterAPI,
} from "../../services/VenueApi";
import NumberFormat from 'react-number-format';

const initialFilter = ["Jakarta", "Bandung", "Surabaya", "Cimahi", "Bekasi"];
const item = [{}, {}, {}, {}, {}, {}, {}, {}];

function Home({ exploreData, cardData }) {
  const [openTab, setOpenTab] = React.useState(1);
  const [venueByCity, setVenueByCity] = useState([]);
  const [filterVenue, setfilterVenue] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterVenueHandler = (city) => {
    setLoading(true);
    const payload = {
      city,
    };
    getVenueCityFilterAPI(payload)
      .then((res) => {
        console.log(res.data.data);
        setfilterVenue(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getVenueByCityAPI()
      .then((res) => {
        setVenueByCity(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const payload = {
      city: "cimahi"
    };
    getVenueCityFilterAPI(payload)
      .then((res) => {
        console.log(res.data.data);
        setfilterVenue(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [])
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner image={bgHome}></Banner>

      <main className="max-w-7xl mx-auto px-8 sm:px-1">
        <section className="pt-6 mt-20">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Pull some data from server */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {venueByCity.map((item, index) => (
              <SmallCard
                key={index}
                img={gedung}
                venue={item.venueCount}
                location={item.city}
              />
            ))}
          </div>
        </section>
        <section className=" pt-10 pb-20 mt-20">
          <h2 className="text-4xl font-semibold pb-5">Rekomendasi Lainnya</h2>
          <div className="w-1/8 flex flex-wrap justify-center">
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
                        ? "text-white bg-purple-700"
                        : "text-white-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                      filterVenueHandler(filter);
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
          <div className="relative flex flex-col min-w-0 break-words bg-white justify-center w-full mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {
              loading ? item.map((x) => (
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
              : filterVenue.length ===0 ? <h1 className="font-2xl font-bold">Venue tidak ada...</h1> :
              filterVenue.map((venue) => (
                <Link href={`/tenant/booking/${venue.id}`}>
                <div className="relative w-full h-[400px] lg:h-90 bg-white shadow-2xl rounded-3xl p-8 mx-2 my-3 cursor-pointer ">
                  <div className="overflow-x-hidden rounded-2xl relative">
                    <img
                      className="lg:h-52 h-52 rounded-2xl w-full object-cover"
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
                      <p className="text-sm text-red-500"><NumberFormat value={venue.price} displayType={'text'} thousandSeparator={true} prefix={' IDR '} /> </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-sm text-blue-600 text-center">
                        Detail
                    </span>
                  </div>
                </div>
                </Link>
              ))
            }
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide">
            {cardData.map((item, index) => (
              <MediumCard key={index} img={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <section>
          <LargeCard
            img="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
            description="Wishlists created by Airbnb"
            buttonText="Get Inspired"
          />
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardData,
    },
  };
}

export default withUtils(Home);
