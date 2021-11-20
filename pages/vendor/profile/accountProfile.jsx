import React, { useState, useEffect } from "react";
import { Sidebar } from "../../../components/Sidebar";
import Image from "next/image";
import { getProfileAPI } from "../../../services/ProfileAPI";
import Cookies from "js-cookie";
import VendorLayout from "../../../components/Layout/VendorLayout";
import { getProfileVendorAPI } from "../../../services/ProfileAPI";
import withUtils from "../../../utils/withUtilsVendor";

function accountProfile() {
  const vendorId = Cookies.get("vendorId");
  const [user, setUser] = useState([]);

  useEffect(() => {
    getProfileVendorAPI(vendorId)
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="tenant-personal-information w-full px-5 lg:px-20 my-10 lg:my-20">
      <div className="col-span-2">
        <div className="container-change-profile px-5 md:px-10 lg:px-20 py-10">
          <form className="w-[full] lg:w-1/2" action="">
            <div className="mb-10">
              <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl">
                <div className="relative h-32 w-32">
                  <Image
                    src={
                      user.url
                        ? user.url
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="mb-6 text-sm">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Vendor Name
              </label>
              <p style={{ color: "575757" }}>{user.vendor_name}</p>
            </div>
            <div className="mb-6 text-sm">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <p style={{ color: "575757" }}>{user.email}</p>
            </div>
            <div className="mb-6 text-sm">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Address
              </label>
              <p style={{ color: "575757" }}>
                {user.firstName} {user.address}
              </p>
            </div>
            <div className="mb-6 text-sm">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Description
              </label>
              <p style={{ color: "575757" }}>{user.description}</p>
            </div>
            <div className="mb-6 text-sm">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Nomor Telepon
              </label>
              <p style={{ color: "575757" }}>{user.phone_number}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

accountProfile.Layout = VendorLayout;
export default accountProfile;
