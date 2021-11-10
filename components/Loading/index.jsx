import React from "react";
import { CircleToBlockLoading } from "react-loadingg";
import Image from "next/image";
import logo from "../../assets/rentLogo.png";

function index() {
  return (
    <div className="flex h-screen align-center">
      <div className="relative h-44 w-60 lg:w-80 m-auto" style={{bottom:"100px"}}>
        <Image
          src={logo}
          layout="fill"
          className="rounded-2xl"
        />
      </div>
      <CircleToBlockLoading 
        color="#049ADA"
      />
    </div>
  );
}

export default index;
