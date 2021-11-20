import React, { useState, useEffect } from "react";
import { TableTransaksi } from "../../../components/Table";
import VendorLayout from "../../../components/Layout/VendorLayout";
import MOCK_DATA_PRODUK from "../../../components/Table/MOCK_DATA_PRODUK.json";
import { getPendingTransactionVendorAPI } from "../../../services/TransactionAPI";
import Cookies from "js-cookie";
import BarButton from "../../../components/BarButton";
import moment from "moment";
import withUtils from "../../../utils/withUtilsVendor";
function pending() {
  const [selectedRow, setSelectedRow] = useState({});
  const [transaksi, setTransaksi] = useState([]);

  const vendorId = Cookies.get("vendorId");

  function selectRow(row) {
    setSelectedRow(row);
    console.log(selectedRow);
  }

  const TRANSACTION = [
    { Header: "ID Transaksi", accessor: "id" },
    { Header: "Nama Venue", accessor: "nama" },
    { Header: "Klien", accessor: "klien" },
    { Header: "Tanggal check-in", accessor: "checkin_time" },
    { Header: "Tanggal check-out", accessor: "tanggalCheckOut" },
    { Header: "Status Pembayaran", accessor: "status" },
  ];

  useEffect(() => {
    getPendingTransactionVendorAPI(vendorId)
      .then((res) => {
        console.log(res.data.data);
        setTransaksi(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-[500px] lg:w-[1300px] overflow-auto">
    <BarButton />
    <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-5">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  ID Transaksi
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nama Gedung
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Klien
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Start Book
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  End Book
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status Penyewaan
                </th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((item, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {item.id}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {item.Venue.name}
                  </td>
                  <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.User.firstName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4" />
                    {moment(item.start_book).format("MMMM Do YYYY")}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4" />
                    {moment(item.finish_book).format("MMMM Do YYYY")}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-arrow-up text-emerald-500 mr-4" />
                    {item.payment_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
}
pending.Layout = VendorLayout;
export default pending;
