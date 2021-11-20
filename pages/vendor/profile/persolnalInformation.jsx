import React, { useState, useReducer } from "react";
import { Sidebar } from "../../../components/Sidebar";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/solid";
import { ProfileVendorAPI } from "../../../services/ProfileAPI";
import Cookies from "js-cookie";
import swal from "sweetalert";
import withUtils from "../../../utils/withUtilsVendor";
import VendorLayout from "../../../components/Layout/VendorLayout";
import Link from "next/link";


const initialState = {
  vendor_name: "",
  description: "",
  address: "",
  phone_number: "",
  password: "",
  profile_picture:"",
};

const profileReducer = (currentState, action) => {
  switch (action.type) {
    case "PASSWORD":
      return { ...currentState, password: action.payload };
    case "VENDOR_NAME":
      return { ...currentState, vendor_name: action.payload };
    case "DESCRIPTION":
      return { ...currentState, description: action.payload };
    case "ADDRESS":
      return { ...currentState, address: action.payload };
    case "PHONE_NUMBER":
      return { ...currentState, phone_number: action.payload };
    case "RAW":
      return { ...currentState, profile_picture: action.payload };
    default:
      return currentState;
  }
};

function persolnalInformation() {
  const [image, setImage] = useState({ preview: false, raw: undefined });
  const [profileData, dispatch] = useReducer(profileReducer, initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
      });

      dispatch({ type: "RAW", payload: e.target.files[0] })

    }
  };


  const vendorId = Cookies.get("vendorId");

  const sumbmitHandler = () => {

    setLoading(true);
    const data = new FormData();

    Object.keys(initialState).map(key => {
      profileData[key] === "" ? null : data.append(key, profileData[key]);
      
    })

    ProfileVendorAPI(vendorId, data)
      .then(res=>{
        console.log(res.data.message);

        if(res.data.message === "Wrong Password!"){
          setLoading(false);
          alert(res.data.message)
        } else{
          setLoading(false);
          swal(res.data.message);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <div className="tenant-personal-information w-full">
      <div className="">
        <div className="container-change-profile px-5 md:px-10 lg:px-20 py-10">
          <form className="w-[full] lg:w-1/2" action="">
            <div className="mb-10">
              <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl">
                <div className="relative h-28 w-44">
                  <Image
                    src={
                      image.preview
                        ? image.preview
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    layout="fill"
                    className="rounded-lg"
                  />
                </div>
                <div className="button-image-profile w-full">
                  <label htmlFor="upload-button">
                    <div className="bg-transparent flex justify-between align-center text-blue-700 font-semibold cursor-pointer  py-1 px-4 border border-blue-500  rounded-2xl">
                      <div></div>
                      <div className="text-center m-auto"> Upload </div>
                      <div>
                        <CameraIcon className="h-8 bg-blue-800 text-white rounded-full p-2 cursor-pointer md:inline-flex md:mx-2" />
                      </div>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="upload-button"
                    hidden
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Vendor name*
              </label>
              <input
                className="shadow text-sm appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="vendorName"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "VENDOR_NAME", payload: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Address
              </label>
              <input
                className="shadow appearance-none text-sm border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="vendorName"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "ADDRESS", payload: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
               Description
              </label>
              <input
                className="shadow appearance-none text-sm border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="vendorName"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "DESCRIPTION", payload: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Phone Number*
              </label>
              <input
                className="shadow appearance-none text-sm border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone number"
                type="number"
                onChange={(e) =>
                  dispatch({ type: "PHONE_NUMBER", payload: e.target.value })
                }
                placeholder="Phone number"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="password"
              >
                Confirm Password*
              </label>
              <input
                className="shadow appearance-none text-sm border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                onChange={(e) =>
                  dispatch({ type: "PASSWORD", payload: e.target.value })
                }
                placeholder="******************"
              />

              {/* if no choose password */}
              {/* <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p> */}
            </div>
          </form>
          <div className="flex items-center justify-end">
            <div>
              <button
                className={`button-update-profile rounded-2xl text-lg text-white font-bold py-2 px-5 ${loading ? `cursor-wait bg-red-500` : `cursor-pointer`} focus:outline-none focus:shadow-outline`}
                type="button"
                onClick={sumbmitHandler}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

persolnalInformation.Layout = VendorLayout;

export default persolnalInformation;
