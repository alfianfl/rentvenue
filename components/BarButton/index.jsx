import React from "react";
import Link from "next/link";

const initialFilter = ["pending", "success", "finished"];
function index({ path }) {
  const [openTab, setOpenTab] = React.useState(1);

  console.log(path);
  return (
    <div className="w-fll flex flex-wrap justify-center">
      <ul
        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
        role="tablist"
      >
        {initialFilter.map((filter) => (
          <li
            key={filter}
            className="mb-2 mr-2 last:mr-0 flex-auto text-center "
          >
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block hover:bg-blue-800 cursor-pointer leading-normal " +
                (openTab === 1
                  ? "text-white bg-purple-700"
                  : "text-white-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
              <Link href={`/vendor/transaksi/${filter}`}>{filter}</Link>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default index;
