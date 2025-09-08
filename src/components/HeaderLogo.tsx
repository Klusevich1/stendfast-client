import React from "react";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <a
      className={`flex items-center outline-none`}
      href="/"
    >
      <Image
        src="/StendfastHeader.svg"
        width={140}
        height={30}
        className="w-[100px] md:w-[140px]"
        alt="Digital Devils logo"
        priority={true}
      />
    </a>
  );
};

export default HeaderLogo;
