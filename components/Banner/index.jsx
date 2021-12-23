import React from "react";
import Image from "next/image";

function Banner({ image, children }) {
  const src = image.src;
  return (
    <div
      className={`relative h-[100vh] sm:h-[400px] lg:h-[500px] ${
        src.includes("bgHome") ? "xl:h-[60vh]" : "xl:h-[100vh]"
      }  xxl:h-[800px]`}
    >
      <Image src={image} layout="fill" objectFit="cover" />
      {children}
    </div>
  );
}

export default Banner;
