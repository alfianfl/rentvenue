import React, { useState } from "react";
import { Sidebar } from "../../../components/Sidebar";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/solid";

function persolnalInformation() {
  const [image, setImage] = useState({ preview: false, raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <div className="tenant-personal-information grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 px-5 lg:px-20 my-10 llg:my-20">
      <Sidebar />
      <div className="col-span-2">
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
                Email*
              </label>
              <input
                className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Username"
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name*
                </label>
                <input
                  className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                />
                {/* <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p> */}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name*
                </label>
                <input
                  className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Gender*
              </label>
              <div className="custom_radio flex justify-between">
                <div>
                  <input type="radio" id="featured-1" name="featured" />
                  <label htmlFor="featured-1">Laki-laki</label>
                </div>
                <br />
                <div>
                  <input type="radio" id="featured-2" name="featured" />
                  <label htmlFor="featured-2">Perempuan</label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Phone Number*
              </label>
              <input
                className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone number"
                type="text"
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
                className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
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
                className="rounded-2xl font-bold py-2 px-5 mr-5 focus:outline-none focus:shadow-outline"
                type="button"
                style={{ backgroundColor: "white", color: "#0579aa" }}
              >
                Back to Home
              </button>
              <button
                className="button-update-profile rounded-2xl text-white font-bold py-2 px-5 focus:outline-none focus:shadow-outline"
                type="button"
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

export default persolnalInformation;
