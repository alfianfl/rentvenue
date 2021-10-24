import React, { useReducer, useState } from "react";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import EmptyLayout from "../../components/Layout/EmptyLayout";
import { useRouter } from "next/dist/client/router";
import { registerAPI } from "../../services/AuthAPI";

import Link from "next/link";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  password: "",
};

const registerReducer = (currentState, action) => {
  switch (action.type) {
    case "EMAIL":
      return { ...currentState, email: action.payload };
    case "PASSWORD":
      return { ...currentState, password: action.payload };
    case "FIRST_NAME":
      return { ...currentState, firstName: action.payload };
    case "LAST_NAME":
      return { ...currentState, lastName: action.payload };
    case "GENDER":
      return { ...currentState, gender: action.payload };
    case "PHONE_NUMBER":
      return { ...currentState, phoneNumber: action.payload };
    default:
      return currentState;
  }
};

function register() {
  const [registerData, dispatch] = useReducer(registerReducer, initialState);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);

    const payload = {};

    registerAPI(payload)
      .then((res) => {
        setDisabled(false);
        router.push({
          pathname: "/tenant/login",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login-rent">
      <div>
        <div
          className="container absolute  px-5 sm:px-10 lg:px-20"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1592890288564-76628a30a657?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwb24lMjBwaG9uZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80")`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="relative flex items-center my-auto h-20 cursor-pointer mb-10 mt-10">
            <Image
              src={logo}
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          <h1 className="font-bold text-xl">
            Selamat Datang! <br />
            Daftarkan dirimu ke website RENTVENUE sebagai Vendor
          </h1>
          <h1 className="pt-8">
            Sudah Mendaftar ?{" "}
            <strong className="cursor-pointer">
              {" "}
              <Link href="/vendor/login"> Sign In </Link>
            </strong>{" "}
          </h1>
          <form
            onSubmit={submitHandler}
            className="bg-transparent pt-6 w-[full] lg:w-1/3  pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Email*
              </label>
              <input
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Vendor name*
              </label>
              <input
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="vendorName"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Address*
              </label>
              <input
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
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
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="deskripsi"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
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
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone number"
                type="text"
                placeholder="Phone number"
                onChange={(e) =>
                  dispatch({ type: "PHONE_NUMBER", payload: e.target.value })
                }
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
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(e) =>
                  dispatch({ type: "PASSWORD", payload: e.target.value })
                }
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
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm password"
                type="confirm password"
                placeholder="******************"
              />

              {/* if no choose password */}
              {/* <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p> */}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-2xl font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
                type="button"
                disabled={disabled}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

register.Layout = EmptyLayout;
export default register;
