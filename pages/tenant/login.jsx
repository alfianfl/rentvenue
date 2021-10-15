import React from "react";
import Banner from "../../components/Banner";
import EmptyLayout from "../../components/Layout/EmptyLayout";

import loginBg from "../../assets/imageLogin.png";
import logo from "../../assets/Logo.png";
import Image from "next/image";

function login() {
  return (
    <div className="login-rent">
      <Banner image={loginBg}>
        <div className="container absolute top-1/4 px-5 sm:px-10 lg:px-20">
          <div className="relative flex items-center my-auto h-20 cursor-pointer mb-10">
            <Image
              src={logo}
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          <h1 className="font-bold text-xl">
            Selamat Datang! <br /> Silahkan login untuk mengakses website
            RENTVENUE
          </h1>
          <form className="bg-transparent pt-6 w-[full] lg:w-1/3  pb-8 mb-4">
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
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="password"
              >
                Password*
              </label>
              <input
                className="shadow appearance-none border border-red-200 rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />

              {/* if no choose password */}
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 rounded-2xl hover:bg-blue-700 text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <h1>
            Belum punya akun?{" "}
            <strong className="cursor-pointer">Sign Up</strong>{" "}
          </h1>
        </div>
      </Banner>
    </div>
  );
}

login.Layout = EmptyLayout;
export default login;
