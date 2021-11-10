import React, { useState } from "react";
import { Sidebar } from "../../../components/Sidebar";
import Image from "next/image";
import { ProfileAPI } from "../../../services/ProfileAPI";

function accountProfile() {
  return (
    <div className="tenant-personal-information grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 px-5 lg:px-20 my-10 llg:my-20">
      <Sidebar />
      <div className="col-span-2">
        <div className="container-change-profile px-5 md:px-10 lg:px-20 py-10">
          <form className="w-[full] lg:w-1/2" action="">
            <div className="mb-10">
              <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl">
                <div className="relative h-32 w-32">
                  <Image
                    src={ "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
                <p style={{color: "575757"}}>rentvenue@gmail.com</p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Nama
              </label>
                <p style={{color: "575757"}}>rentvenue@gmail.com</p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Gender
              </label>
                <p style={{color: "575757"}}>rentvenue@gmail.com</p>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Nomor Telepon
              </label>
                <p style={{color: "575757"}}>rentvenue@gmail.com</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default accountProfile;
