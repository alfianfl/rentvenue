import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import moment from "moment";
import {
  getPendingTransactionAPI,
  getSuccessTransactionAPI,
  getFinishedTransactionAPI,
  feedbackAPI,
  getCodeForCheck,
} from "../../../services/TransactionAPI";
import swal from "sweetalert";
import wa from "../../../assets/wa.png";
import Image from "next/image";
import withUtils from "../../../utils/withUtils";

function transaksi() {
  const userId = Cookies.get("userId");
  const cancelButtonRef = useRef(null);
  const [transaksi, setTransaksi] = useState([]);
  const [transaksiFinish, setTransaksiFinish] = useState([]);
  const [transaksiSuccess, setTransaksiSuccess] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [ulasan, setUlasan] = useState("");
  const [rating, setRating] = useState(0);
  const [idTransaksi, setIdTransaksi] = useState(null);
  const [checkIn, setCheckIn] = useState({
    checkin_code: "",
    checkout_code: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPendingTransactionAPI(userId)
      .then((res) => {
        console.log(res.data.data);
        setTransaksi(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSuccessTransactionAPI(userId)
      .then((res) => {
        console.log(res.data.data);
        setTransaksiSuccess(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getFinishedTransactionAPI(userId)
      .then((res) => {
        console.log(res.data);
        setTransaksiFinish(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getCodeForCheck(userId, idTransaksi)
      .then((res) => {
        setCheckIn({
          checkin_code: res.data.data.checkin_code,
          checkout_code: res.data.data.checkout_code,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [idTransaksi]);

  const submitHandler = (id) => {
    const payload = {
      feedback_content: ulasan,
      rating: rating,
    };

    feedbackAPI(id, payload)
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          swal(res.data.message);
        } else {
          swal("Feedback berhasil dikirim");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-10 mb-20">
      <h1 className="font-bold mt-16 text-2xl">Menunggu Pembayaran</h1>
      {transaksi.length === 0 ? (
        <h1 className="lg:text-lg text-sm mt-4">
          Tidak ada yang harus dibayar...
        </h1>
      ) : (
        transaksi.map((t) => (
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-sm min-w-[100%] lg:min-w-[700px] bg-white shadow-2xl rounded-3xl p-8 mx-1 mb-10 cursor-pointer ">
            <div className="overflow-x-hidden col-span-2 rounded-2xl relative">
              <img className={t.Venue.Venue_Photos[0].url} />
            </div>
            <div className="mt-4 pl-2 mb-2 col-span-3 flex justify-between ">
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-0">
                  {t.Venue.name}
                </p>
                <p className="text-xs text-gray-800 mt-0">{t.Venue.address}</p>
                <p className="text-sm text-red-500">IDR {t.total_payment}</p>

                <div className="mt-5">
                  <p className="text-sm text-red-500 font-bold mb-3">
                    Pembayaran berakhir pada pukul{" "}
                    {moment(t.expiredAt).format("hh:mm:ss")}
                  </p>
                  <a
                    href={`https://app.sandbox.midtrans.com/snap/v2/vtweb/${t.token}`}
                  >
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 text-white text-md rounded rounded-2xl">
                      Bayar
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <h1 className="font-bold mt-16 text-2xl">Penyewaan Berhasil</h1>
      {!transaksiSuccess.length ? (
        <h1>Belum ada gedung yang disewa...</h1>
      ) : (
        transaksiSuccess.map((t) => (
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-sm min-w-[100%] lg:min-w-[700px] bg-white shadow-2xl rounded-3xl p-8 mx-1 mb-10 cursor-pointer ">
            <div className="overflow-x-hidden col-span-2 rounded-2xl relative">
              <img
                className="rounded-2xl w-full h-40 object-cover"
                src={t.Venue.Venue_Photos[0].url}
              />
            </div>
            <div className="mt-4 pl-2 mb-2 col-span-3 flex justify-between ">
              <div className="w-full ">
                <p className="text-lg font-semibold text-gray-900 mb-0">
                  {t.Venue.name}
                </p>
                <p className="text-xs text-gray-800 mt-0">{t.Venue.address}</p>
                <div className="mt-10 ">
                  <p className="text-xs text-gray-500 font-bold mt-0">
                    {moment(t.start_book).format("D MMM YYYY")} -{" "}
                    {moment(t.finish_book).format("D MMM YYYY")}
                  </p>
                  <div className="mt-2 flex justify-between ">
                    <div>
                      <button
                        className={`${
                          t.Checkin_Status.checkin_code !== null
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400"
                        }   px-3 py-1 text-white text-xs rounded rounded-2xl mr-5`}
                        disabled={
                          t.Checkin_Status.checkin_code === null ? true : false
                        }
                        onClick={() => {
                          setOpen(true);
                          setAction("checkin");
                          setIdTransaksi(t.id);
                        }}
                      >
                        Check-in
                      </button>
                      <button
                        className={`${
                          t.Checkin_Status.checkin_code === null
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400"
                        }   px-3 py-1 text-white text-xs rounded rounded-2xl`}
                        disabled={
                          t.Checkin_Status.checkin_code !== null ? true : false
                        }
                        onClick={() => {
                          setOpen(true);
                          setAction("checkout");
                          setIdTransaksi(t.id);
                        }}
                      >
                        Check-out
                      </button>
                    </div>
                    <div className="relative h-8 w-8">
                      <a href={` https://wa.me/${t.Venue.Vendor.phone_number}`}>
                        <Image src={wa} layout="fill" className="rounded-lg" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <h1 className="font-bold mt-16 text-2xl">Penyewaan Selesai</h1>
      {transaksiFinish.map((t) => (
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-sm min-w-[100%] lg:min-w-[700px] bg-white shadow-2xl rounded-3xl p-8 mx-1 mb-10 cursor-pointer ">
          <div className="overflow-x-hidden col-span-2 rounded-2xl relative">
            <img
              className="rounded-2xl w-full object-cover"
              src={t.Venue.Venue_Photos[0].url}
            />
          </div>
          <div className="mt-4 pl-2 mb-2 col-span-3 flex justify-between ">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-0">
                {t.Venue.name}
              </p>
              <p className="text-xs text-gray-800 mt-0">{t.Venue.address}</p>
              <p className="text-sm text-red-500">IDR {t.total_payment}</p>

              <div className="mt-5">
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-light mb-2"
                    htmlFor="username"
                  >
                    Berikan Ulasan
                  </label>
                  <input
                    className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Masukan komentar"
                    onChange={(e) => setUlasan(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-gray-700 text-sm font-light mb-2"
                    htmlFor="username"
                  >
                    Masukan rating
                  </label>
                  <div className="inline-block relative w-64">
                    <select
                      onChange={(e) => setRating(e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value={1}>⭐</option>
                      <option value={2}>⭐⭐</option>
                      <option value={3}>⭐⭐⭐</option>
                      <option value={4}>⭐⭐⭐⭐</option>
                      <option value={5}>⭐⭐⭐⭐⭐</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <a href="#">
                  <button
                    onClick={() => submitHandler(t.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-1 text-white text-md rounded rounded-2xl"
                  >
                    Kirim
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        <p className="text-md text-center text-gray-500">
                          Gunakan dan Berikan kode untuk{" "}
                          {action === "checkin" ? (
                            <span>Check-in</span>
                          ) : (
                            <span>Check-out</span>
                          )}{" "}
                          kepada Vendor
                        </p>
                        {loading ? (
                          <h1 className="cursor-wait font-bold text-center text-lg">
                            loading...
                          </h1>
                        ) : (
                          <h1 className="text-4xl text-center font-bold mt-5">
                            {" "}
                            {action === "checkin" ? (
                              <span>{checkIn.checkin_code}</span>
                            ) : (
                              <span>{checkIn.checkout_code}</span>
                            )}
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default transaksi;
