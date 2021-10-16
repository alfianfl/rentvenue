import React, { useReducer, useState } from "react";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import EmptyLayout from "../../components/Layout/EmptyLayout";
import { useRouter } from "next/dist/client/router";
import { registerAPI } from "../../services/AuthAPI";

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
      return { ...currentState, email: action.payload };
    case "LAST_NAME":
      return { ...currentState, password: action.payload };
    case "GENDER":
      return { ...currentState, password: action.payload };
    case "PHONE_NUMBER":
      return { ...currentState, password: action.payload };
    default:
      return currentState;
  }
};

function register() {
  const [registerData, dispatch] = useReducer(registerReducer, initialState);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const submitHandler = (e) =>{
    e.preventDefault();
    setDisabled(true);

    const payload = {
    };

    registerAPI(payload)
      .then(res =>  {
        
        setDisabled(false);
        router.push({
          pathname: '/tenant/login',
        });
        
      })
      .catch(err=>{
        console.log(err);
      });
  }
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
            Selamat Datang! <br /> Silahkan login untuk mengakses website
            RENTVENUE
          </h1>
          <h1 className="pt-8">
            Sudah Mendaftar ?{" "}
            <strong className="cursor-pointer">Sign In</strong>{" "}
          </h1>
          <form onSubmit={submitHandler} className="bg-transparent pt-6 w-[full] lg:w-1/3  pb-8 mb-4">
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
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
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
                  onChange={(e) =>
                    dispatch({ type: "FIRST_NAME", payload: e.target.value })
                  }
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
                  onChange={(e) =>
                    dispatch({ type: "LAST_NAME", payload: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="username"
              >
                Gender*
              </label>
              <input
                className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone number"
                type="text"
                placeholder="Phone number"
              />
            </div>
            <div className="mb-4">
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
                onChange={(e) =>
                  dispatch({ type: "PHONE_NUMBER", payload: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-light mb-2"
                htmlFor="password"
              >
                Password*
              </label>
              <input
                className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
