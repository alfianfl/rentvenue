import React, { useState, useEffect } from "react";
import { getAdminDataUser } from "../../services/VenueApi";
import AdminLayout from "../../components/Layout/AdminLayout";

function customer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAdminDataUser()
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="w-[500px] lg:w-[1500px] overflow-auto">
        <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Nama
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Gender
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No Telp
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Foto Profile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                        {item.firtsName} {item.lastName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                        {item.email}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {item.gender}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {item.phone_number}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        <img
                          src={item.url}
                          width="120px"
                          height="150px"
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

customer.Layout = AdminLayout;
export default customer;
