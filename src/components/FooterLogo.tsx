import React from "react";
import Image from "next/image";

const FooterLogo: React.FC = () => {
  return (
    <a className="text-xl flex items-center text-white h-fit" href="#">
      <Image
        src="/StendfastFooter.svg"
        width={140}
        height={30}
        className="w-[100px] md:w-[140px]"
        alt="Digital Devils logo"
      />
    </a>
  );
};

export default FooterLogo;
