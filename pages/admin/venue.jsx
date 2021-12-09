import React, { useState, useEffect, Fragment, useRef } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import { Dialog, Transition } from "@headlessui/react";
import {
  getAdminVenue,
  submitVenueVerification,
  getVenueDocument,
} from "../../services/VenueApi";
import { useRouter } from "next/router";
import swal from "sweetalert";

function venue() {
  const cancelButtonRef = useRef(null);
  const [dataVenue, setDataVenue] = useState([]);
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState({
    ktp: "",
    surat: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitVenue = (id, action) => {
    const data = {
      respond: action,
    };
    swal({
      title: `Are you sure ${action} this venue?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        submitVenueVerification(id, data)
          .then((res) => {
            console.log(res);
            router.push({
              pathname: "venue",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        swal("Success!", {
          icon: "success",
        });
      } else {
        swal("The action had been canceled!");
      }
    });
  };

  const getDocument = (id) => {
    setLoading(true);
    getVenueDocument(id)
      .then((res) => {
        console.log(res);
        setDocument({
          ktp: res.data.data.urlKTP,
          surat: res.data.data.urlSurat,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAdminVenue()
      .then((res) => {
        console.log(res);
        setDataVenue(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="w-[500px] lg:w-[1500px] overflow-auto">
        <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Nama Vendor
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Nama Venue
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Alamat
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Foto Dokumen
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataVenue.map((item, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.Vendor.vendor_name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {item.name}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.address}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4" />
                        <button
                          onClick={() => {
                            getDocument(item.id);
                            setOpen(true);
                          }}
                        >
                          Detail
                        </button>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4" />
                        <button
                          className={`rounded-2xl ${
                            item.is_verified
                              ? "bg-green-500"
                              : "hover:bg-blue-700 bg-blue-500"
                          }  text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline mr-2`}
                          disabled={item.is_verified ? true : false}
                          onClick={() => submitVenue(item.id, "accept")}
                        >
                          {item.is_verified ? (
                            <span>Diterima</span>
                          ) : (
                            <span>Accept</span>
                          )}
                        </button>
                        {item.is_verified ? (
                          <span></span>
                        ) : (
                          <button
                            className={`rounded-2xl hover:bg-red-700 bg-red-500 text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline`}
                            disabled={item.is_verified ? true : false}
                            onClick={() => submitVenue(item.id, "reject")}
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
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
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="mt-2">
                        <h1 className="font-bold">Foto KTP</h1>
                        <div className="my-5">
                          {loading ? (
                            <h1 className="font-bold">Loading...</h1>
                          ) : (
                            <img
                              style={{ width: "800px", height: "auto" }}
                              src={document.ktp}
                              alt=""
                            />
                          )}
                        </div>
                        <h1 className="font-bold">Foto Surat Tanah</h1>
                        <div className="my-5">
                          {loading ? (
                            <h1 className="font-bold">Loading...</h1>
                          ) : (
                            <img
                              style={{ width: "800px", height: "auto" }}
                              src={document.surat}
                              alt=""
                            />
                          )}
                        </div>
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

venue.Layout = AdminLayout;
export default venue;
