import React, {useState} from 'react';
import VendorLayout from "../../../components/Layout/VendorLayout";
import { checkInAPI, checkOutAPI } from "../../../services/CheckInOutAPI";
import swal from "sweetalert";
import withUtils from "../../../utils/withUtilsVendor";

function index() {
    const [token, setToken] = useState("");

    const handlerCheckIn = () => {
      const payload = {
        checkin_code : token
      }

      checkInAPI(payload)
        .then(res=>{
          console.log(res.data.message);
          if(res.data.message === "Invalid Booking Code"){
            swal(res.data.message);
          }else if(res.data.message === "Please checkIn at the right time"){
            swal(res.data.message);
          }else{
            swal("selamat anda berhasil check-in", "success");
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }

    const handlerCheckOut = () => {
      const payload = {
        checkout_code : token
      }

      checkOutAPI(payload)
      .then(res=>{
        console.log(res.data.message);
        if(res.data.message === "Invalid Booking Code"){
          swal(res.data.message);
        }else{
          swal("selamat anda berhasil check-in", "success");
        }
      })
      .catch(err=>{
        console.log(err);
      })
      
    }
    return (
        <div className="checkin-checkou w-1/2">
            <h1>Input Kode Check-in/Check-out</h1>
            <div className="my-6">
              <input
                className="shadow appearance-none text-sm border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                id="check"
                type="text"
                value={token}
                placeholder="Masukan kode"
                onChange={(e) =>setToken(e.target.value)}
              />
            </div>
            <div className="flex items-center float-right ">
              <button
                className="bg-blue-500 mr-5 rounded-2xl text-sm hover:bg-blue-700 text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handlerCheckIn}
              >
                Check-in
              </button>
              <button
                className="bg-blue-500 text-sm rounded-2xl hover:bg-blue-700 text-white font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handlerCheckOut}
              >
                Check-Out
              </button>
            </div>
        </div>
    )
}

index.Layout = VendorLayout;
export default index;
