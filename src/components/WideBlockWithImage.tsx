import Image, { StaticImageData } from "next/image";
import React from "react";
import StandardMarginsLayout from "@/layouts/StandardMarginsLayout";

interface WideBlockWithImageProps {
  title: string;
  text_1: string;
  text_11?: string;
  text_2: string;
  bg?: string
}

const WideBlockWithImage: React.FC<WideBlockWithImageProps> = ({
  title,
  text_1,
  text_11,
  text_2,
  bg = 'bg-black_5'
}) => {
  return (
    <StandardMarginsLayout
      styles={`pb-[40px] ${bg} text-black`}
      children={
        <div id="about">
          <h2 className="mb-[30px] font-bold text-[32px] md:text-[42px] lg:text-[60px]">
            {title}
          </h2>
          <div className="flex flex-col lg:flex-row justify-between md:gap-[20px] gap-[10px]">
            <div className="lg:max-w-[640px]">
              <p
                className="text-[22px] font-bold"
                dangerouslySetInnerHTML={{ __html: text_1 }}
              ></p>
              {text_11 && (
                <p
                  className="text-[22px] font-bold mt-[10px]"
                  dangerouslySetInnerHTML={{ __html: text_11 }}
                ></p>
              )}
            </div>
            <p
              className="text-[16px] font-medium  lg:max-w-[640px]"
              dangerouslySetInnerHTML={{ __html: text_2 }}
            ></p>
          </div>
        </div>
      }
    />
  );
};

export default WideBlockWithImage;
