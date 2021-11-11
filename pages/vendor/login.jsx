import React, { useReducer, useState, useEffect } from "react";
import Banner from "../../components/Banner";
import EmptyLayout from "../../components/Layout/EmptyLayout";
import loginBg from "../../assets/imageLogin.png";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { loginVendorAPI } from "../../services/AuthAPI";
import Cookies from "js-cookie";

import Link from "next/link";

const initialState = {
  email: "",
  password: "",
};

const loginReducer = (currentState, action) => {
  switch (action.type) {
    case "EMAIL":
      return { ...currentState, email: action.payload };
    case "PASSWORD":
      return { ...currentState, password: action.payload };
    default:
      return currentState;
  }
};

function login() {
  const [loginData, dispatch] = useReducer(loginReducer, initialState);
  const [disabled, setDisabled] = useState(false);
  const [alert, setAlert] = useState({
    emailNotVerified: false,
    passwordDoesntMatch: false,
  });
  const [token, setToken] = useState(() => {
    const cookie = Cookies.get("vendorId");
    return cookie ? cookie : false;
  });

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);

    const payload = {
      email: loginData.email,
      password: loginData.password,
    };

    loginVendorAPI(payload)
      .then((res) => {
        if (res.data.message === "Please activate your email first") {
          setAlert({ emailNotVerified: res.data.message });
        } else {
          if (res.data.message === "Email and password didn't match") {
            setAlert({ passwordDoesntMatch: res.data.message });
          } else if (res.data.message === "Email is not registered") {
            setAlert({ passwordDoesntMatch: res.data.message });
          } else {
            setToken(res.data.data.VendorId);
            router.push({
              pathname: "/vendor/venue",
            });
          }
        }
        setDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setDisabled(false);
      });
  };
  useEffect(() => {
    if (token === false) {
      Cookies.remove("vendorId", { path: "" });
    } else {
      Cookies.set("vendorId", token, { path: "" });
    }
  }, [token]);

  return (
    <div className="login-rent">
      <Banner image={loginBg}>
        <div
          className="container absolute px-5 sm:px-10 lg:px-20"
          style={{ top: "100px" }}
        >
          <div className="relative flex items-center my-auto h-20 cursor-pointer mb-10">
            <Image
              src={logo}
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          <h1 className="font-bold text-xl mb-5">
            Selamat Datang! <br />
            Silahkan login untuk masuk website RentVenue sebagai Vendor
          </h1>
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
          {alert.emailNotVerified ? (
            <div
              className="bg-red-400 border border-red-400 w-[100%] lg:w-[50%]  text-white px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">failed to register! </strong>
              <span className="block sm:inline">{alert.emailNotVerified}</span>
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

          <form className="bg-transparent pt-6 w-[full] lg:w-1/3  pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Email*
              </label>
              <input
                className="shadow appearance-none border border-grey-700 rounded-2xl w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) =>
                  dispatch({ type: "EMAIL", payload: e.target.value })
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
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 rounded-2xl hover:bg-blue-700 text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={submitHandler}
                disabled={disabled}
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
            <strong className="cursor-pointer">
              {" "}
              <Link href="/vendor/register">Sign Up</Link>
            </strong>{" "}
            atau{" "}
            <strong className="cursor-pointer">
              {" "}
              <Link href="/">Login sebagai tenant</Link>
            </strong>{" "}
          </h1>
        </div>
      </Banner>
    </div>
  );
}

login.Layout = EmptyLayout;
export default login;
