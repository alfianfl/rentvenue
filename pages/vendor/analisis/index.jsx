import React, { useState, useEffect } from "react";
import VendorLayout from "../../../components/Layout/VendorLayout";
import people from "../../../assets/people.png";
import like from "../../../assets/like.png";
import dolar from "../../../assets/dolar.png";
import swal from "sweetalert";
import Image from "next/image";
import { Line, Pie } from "react-chartjs-2";
import { getAnalyticAPI } from "../../../services/VenueApi";
import { getWalletVendorAPI, getVendorAnalytic } from "../../../services/TransactionAPI";
import Cookies from "js-cookie";
import NumberFormat from "react-number-format";
import moment from "moment";
import withUtils from "../../../utils/withUtilsVendor";

function index() {
  const vendorId = Cookies.get("vendorId");
  const [dataAnalitik, setDataAnalitik] = useState({});
  const [dataPerMonth, setDataPerMonth] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [wallet, setWallet] = useState();
  useEffect(() => {
    getAnalyticAPI(vendorId)
      .then((res) => {
        setDataAnalitik(res.data.data);
        setDataTransaction(res.data.data.transactionPerVenue);
      })
      .catch((err) => {
        console.log(err);
      });
    getWalletVendorAPI(vendorId)
      .then((res) => {
        setWallet(res.data.data.balance);
      })
      .catch((err) => {
        console.log(err);
      });
      getVendorAnalytic(vendorId)
      .then((res) => {
        console.log(res.data.data);
        setDataPerMonth(res.data.data.transactionPerMonth)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = dataTransaction.map((item) => {
    return parseInt(item.count, 10);
  });

  const label = dataTransaction.map((item) => {
    return item.Venue.name;
  });

  const dataMonth = dataPerMonth.map((item) => {
    return item.count;
  });

  const month = dataPerMonth.map((item) => {
    const monthP = moment(item.month);
    monthP.format('L')

    return monthP;
  });

  return (
    <div className="analisis w-full lg:px-5 md:px-4 px-2">
      <div className="title">
        <h1 className="font-bold text-4xl">Total Uang Anda</h1>
      </div>
      <div className="saldo mt-4">
        <span className="font-bold text-red-600 text-2xl">
          {" "}
          <NumberFormat
            value={wallet}
            displayType={"text"}
            thousandSeparator={true}
            prefix={" IDR "}
          />
        </span>
      </div>
      <div className="mt-10 min-w-0 break-words w-full mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        <div className="relative flex max-w-sm w-[260px] bg-white shadow-2xl rounded-3xl p-4 mx-1 my-3 cursor-pointer ">
          <div className="overflow-x-hidden rounded-2xl relative">
            <div className="relative h-20 w-16 flex-shrink-0">
              <Image
                src={dolar}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          </div>
          <div className="mt-4 pl-2 mb-2 ">
            <p className="text-sm font-bold">Total Pemasukan </p>
            <p className="text-sm font-bold">
              {" "}
              <NumberFormat
                value={dataAnalitik.totalIncome}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" IDR "}
              />{" "}
            </p>
          </div>
        </div>
        <div className="relative flex max-w-sm w-[260px] bg-white shadow-2xl rounded-3xl p-4 mx-1 my-3 cursor-pointer ">
          <div className="overflow-x-hidden rounded-2xl relative">
            <div className="relative h-20 w-16 flex-shrink-0">
              <Image
                src={like}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </div>
          </div>
          <div className="mt-4 pl-2 mb-2 ">
            <p className="text-sm font-bold">Total Ulasan </p>
            <p className="text-md font-bold">
              {dataAnalitik.totalFeedback} Ulasan{" "}
            </p>
          </div>
        </div>
        <div className="relative flex max-w-sm w-[260px] bg-white shadow-2xl rounded-3xl p-4 mx-1 my-3 cursor-pointer ">
          <div className="relative h-20 w-16 flex-shrink-0">
            <Image
              src={people}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
          <div className="mt-4 pl-2 mb-2 ">
            <p className="text-sm font-bold">Total Penyewaan </p>
            <p className="text-md font-bold">
              {dataAnalitik.totalTransaction} Penyewa{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around my-20">
        <div className="w-1/2">
          <h1 className="text-center mb-4">Analisis Grafik per tahun</h1>
          <Line
            data={{
              labels:month,
              datasets: [
                {
                  label: "# of Votes",
                  data: dataMonth,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        <div className="w-1/3">
          <h1 className="text-center mb-4">Analisis penyewaan per venue</h1>
          <Pie
            data={{
              labels: label,
              datasets: [
                {
                  label: "# of Votes",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

index.Layout = VendorLayout;
export default index;
