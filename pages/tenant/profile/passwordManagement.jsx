import React from "react";
import { Sidebar } from "../../../components/Sidebar";

function passwordManagement() {
  return (
    <div className="tenant-profile grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 px-5 lg:px-20 my-10 llg:my-20">
      <Sidebar />
      <div className="col-span-2">
        <div className="container-change-password px-5 md:px-10 lg:px-20 py-10">
          <form className="w-[full] lg:w-1/2" action="">
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="password"
              >
                Old Password*
              </label>
              <input
                className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="old-password"
                type="password"
                placeholder="******************"
              />

              {/* if no choose password */}
              {/* <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p> */}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="password"
              >
                New Password*
              </label>
              <input
                className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="new-password"
                type="password"
                placeholder="******************"
              />

              {/* if no choose password */}
              {/* <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p> */}
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
                className="button-update-password rounded-2xl text-white font-bold py-2 px-5 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default passwordManagement;
