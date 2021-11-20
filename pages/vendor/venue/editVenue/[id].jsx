import React, {useReducer, useState} from "react";
import VendorLayout from "../../../../components/Layout/VendorLayout";
import Link from "next/link";
import { PhotographIcon, PencilAltIcon } from "@heroicons/react/solid";
import { editVenueAPI } from "../../../../services/VenueApi";
import { useRouter } from "next/router";

const initialState = {
  name: "",
  description: "",
  address:"",
  capacity: "",
  price: "",
  venue_photos:""

};

const editVenueReducer = (currentState, action) => {
  switch (action.type) {
    case "NAMA_GEDUNG":
      return { ...currentState, name: action.payload };
    case "DESKRIPSI":
      return { ...currentState, description: action.payload };
    case "ALAMAT":
      return { ...currentState, address: action.payload };
    case "KAPASITAS":
      return { ...currentState, capacity: action.payload };
    case "HARGA":
      return { ...currentState, price: action.payload };
    default:
      return currentState;
  }
}; 
function editVenue() {
  const [venue, dispatch] = useReducer(editVenueReducer, initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {id} = router;

  const editVenueHandler = () => {

    setLoading(true);
    const data = new FormData();

    Object.keys(initialState).map(key => {
      venue[key] === "" ? null : data.append(key, venue[key]);
    })

    console.log("nama",venue.name);
    console.log("alamat",venue.address);
    console.log("kapasitas",venue.capacity);
    console.log("harga",venue.price);
    console.log("desktipsi",venue.description);

    console.log(data);

    editVenueAPI(2, data)
      .then(res=>{
        console.log(res.data.data);
      })
      .catch(err => {
        setLoading(false);
        alert(err)
        console.log(err);
      });
  }
  return (
    <div className="detail-venue">
      <h1 className="text-4xl font-bold mb-10">Edit Venue</h1>
      <div className="mb-8 w-[full] lg:w-1/3">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="username"
        >
          Nama Gendung
        </label>
        <input
          className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nama gedung"
          type="text"
          value={venue.name}
          onChange={(e) =>
            dispatch({ type: "NAMA_GEDUNG", payload: e.target.value })
          }
        />
      </div>

      {/* <label htmlFor="upload-button1" className="flex">
            <div className="bg-transparent flex justify-between bg-blue-800 align-center text-white font-semibold cursor-pointer  py-1 px-4 border border-blue-500  rounded-2xl">
              <div>
                <PhotographIcon className="h-8 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-10" />
              </div>
              <div className="text-center m-auto" style={{ fontSize: "14px" }}>
                {" "}
                Tambah Gambar{" "}
              </div>
            </div>
            <span
              className="font-light ml-3"
              style={{ fontSize: "16px" }}
            ></span>
          </label> */}
      <div className="deskripsi-venue">
        <div className="mb-8 w-[full] lg:w-1/3 mt-10">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Alamat Lengkap
          </label>
          <input
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="alamat"
            type="text"
            onChange={(e) =>
              dispatch({ type: "ALAMAT", payload: e.target.value })
            }
          />
        </div>
        <div className="flex flex-wrap mb-8 ">
          <div className="w-full md:w-1/2  mb-6 md:mb-0">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Kapasitas
            </label>
            <input
              className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="number"
              placeholder="0"
              onChange={(e) =>
                dispatch({ type: "KAPASITAS", payload: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Harga Sewa
            </label>
            <input
              className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-last-name"
              type="number"
              placeholder="Rp"
              onChange={(e) =>
                dispatch({ type: "HARGA", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-8 w-[full] lg:w-full">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="username"
          >
            Deskripsi
          </label>
          <textarea
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deskripsi"
            type="textarea"
            onChange={(e) =>
              dispatch({ type: "DESKRIPSI", payload: e.target.value })
            }
          />
        </div>
            <button
              className="bg-blue-500 font-xs hover:bg-blue-700 text-white rounded-2xl  py-2 px-3 justify-around flex focus:outline-none focus:shadow-outline"
              type="button"
              style={{ fontSize: "16px" }}
              onClick={editVenueHandler}
            >
              <PencilAltIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-3" />{" "}
              Simpan
            </button>
        </div>
      </div>
  );
}

editVenue.Layout = VendorLayout;
export default editVenue;
