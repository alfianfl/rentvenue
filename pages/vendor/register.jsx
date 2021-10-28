import React, { useReducer, useState } from "react";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import EmptyLayout from "../../components/Layout/EmptyLayout";
import { useRouter } from "next/dist/client/router";
import { registerVendorAPI } from "../../services/AuthAPI";
import { ModalVerification } from "../../components/Modal";

import Link from "next/link";

const initialState = {
  email: "",
  vendorName: "",
  address: "",
  deskripsi: "",
  phoneNumber: "",
  password: "",
  confirmPassword:""
};

const registerReducer = (currentState, action) => {
  switch (action.type) {
    case "EMAIL":
      return { ...currentState, email: action.payload };
    case "PASSWORD":
      return { ...currentState, password: action.payload };
    case "VENDOR_NAME":
      return { ...currentState, vendorName: action.payload };
    case "ADDRESS":
      return { ...currentState, address: action.payload };
    case "DESKRIPSI":
      return { ...currentState, deskripsi: action.payload };
    case "PHONE_NUMBER":
      return { ...currentState, phoneNumber: action.payload };
    case "CONFIRM_PASSWORD":
      return { ...currentState, confirmPassword: action.payload };
    default:
      return currentState;
  }
};

function register() {
  const [registerData, dispatch] = useReducer(registerReducer, initialState);
  const [disabled, setDisabled] = useState(false);
  const [modalVerif, setModalVerif] = useState(false);
  const [alert, setAlert] = useState({
    emailAlreadyRegist: false,
    passwordDoesntMatch:false
  });

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);

    const payload = {
      email: registerData.email,
      password:registerData.password,
      vendor_name:registerData.vendorName,
      address:registerData.address,
      description:registerData.deskripsi,
      phone_number: registerData.phoneNumber,
      confirm_password: registerData.confirmPassword
    };

    registerVendorAPI(payload)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "Email has been used") {
          setAlert({ emailAlreadyRegist: res.data.message});
        }
        if (res.data.message === "Password and confirm password is not the same") {
          setAlert({ passwordDoesntMatch: res.data.message});
        }
        if (res.data.message === "Register Success!") {
          setModalVerif(true);
        }
        setDisabled(false)
      })
      .catch((err) => {
        console.log(err);
        setDisabled(false);
      });
  };
  return (
    <div className="login-rent">
      <ModalVerification isOpen={modalVerif} path="vendor"/>
      <div>
        <div
          className="container absolute  px-5 sm:px-10 lg:px-20"
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

          {alert.emailAlreadyRegist ? (
            <div
              className="bg-red-400 border border-red-400 w-[100%] lg:w-[50%]  text-white px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">failed to register! </strong>
              <span className="block sm:inline">
                {alert.emailAlreadyRegist}
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-white"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : null}
          {alert.passwordDoesntMatch ? (
            <div
              className="bg-red-400 border border-red-400 w-[100%] lg:w-[50%]  text-white px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">failed to register! </strong>
              <span className="block sm:inline">
                {alert.passwordDoesntMatch}
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-white"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : null}
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
                  dispatch({ type: "EMAIL", payload: e.target.value })
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
                  dispatch({ type: "VENDOR_NAME", payload: e.target.value })
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
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="deskripsi"
                type="text"
                onChange={(e) =>
                  dispatch({ type: "DESKRIPSI", payload: e.target.value })
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
                type="password"
                placeholder="******************"
                onChange={(e) =>
                  dispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value })
                }
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
                onClick={submitHandler}
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
