import React, { ReactNode } from "react";
import StandardMarginsLayout from "@/layouts/StandardMarginsLayout";
import { FaCircleChevronRight } from "react-icons/fa6";
import SmoothScrollLink from "./SmoothScollLink";

interface ColorfulBlockProps {
  title: string;
  list_left: string[];
  titleLeftBlock: string;
  textLeftBlock_1: string;
  textLeftBlock_2: string;
  description_1?: string;
  description_2?: string;
  leftBlock?: ReactNode;
  buttonText_1: string;
  buttonText_2: string;
  buttonColor_1: string;
  buttonColor_2: string;
  buttonBgColor_1: string;
  buttonBgColor_2: string;
  bgColor_1: string;
  bgColor_2: string;
  isOnlyBottomPadding?: boolean;
  list_1: string[];
  list_2: string[];
  smallTitle_1: string;
  smallTitle_2: string;
  secondSmallTitle_1?: string;
  secondSmallTitle_2?: string;
  price_1: string;
  price_2: string;
  min_h_ticket_list?: number;
}

const TicketSeoBlock: React.FC<ColorfulBlockProps> = ({
  title,
  list_left,
  titleLeftBlock,
  textLeftBlock_1,
  textLeftBlock_2,
  leftBlock,
  buttonText_1,
  buttonText_2,
  buttonColor_1,
  buttonColor_2,
  buttonBgColor_1,
  buttonBgColor_2,
  bgColor_1,
  bgColor_2,
  smallTitle_1,
  smallTitle_2,
  price_1,
  price_2,
  list_1,
  list_2,
  description_1 = "",
  description_2 = "",
  min_h_ticket_list = 252,
  secondSmallTitle_1 = "",
  secondSmallTitle_2 = "",
  isOnlyBottomPadding = true,
}) => {
  return (
    <StandardMarginsLayout
      styles={isOnlyBottomPadding ? "pb-[40px]" : "py-[40px]"}
      children={
        <div className="flex flex-col w-full" id="services">
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-bold mb-[30px] w-full">
            {title}
          </h2>
          <div className="flex lg:flex-row flex-col justify-between">
            <div className="flex flex-col lg:max-w-[413px] w-full lg:me-[20px]">
              <h2 className="text-[22px] lg:text-[24px] font-bold mb-[10px]">
                {titleLeftBlock}
              </h2>
              {textLeftBlock_1 && (
                <p className="text-[18px] font-medium mb-[10px]">
                  {textLeftBlock_1}
                </p>
              )}
              {textLeftBlock_2 && (
                <p className="text-[18px] font-medium mb-[10px]">
                  {textLeftBlock_2}
                </p>
              )}
              {list_left && (
                <ul>
                  {list_left.map((item, index) => (
                    <li key={index} className="flex flex-row mb-[15px]">
                      <div className="flex min-w-[15px] min-h-[15px]  me-[10px] mt-1">
                        <FaCircleChevronRight className="!w-[15px] !h-[15px]" />
                      </div>
                      <span className="text-[16px] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col max-w-full lg:max-w-[414px] w-full h-full lg:mt-0 mt-[30px] bg-blue_main rounded-[40px] text-white lg:me-[20px]">
              <div className="px-[26px] pt-[31px]">
                <h3
                  className={`text-[24px] font-semibold ${
                    description_1 != "" ? "mb-0" : "mb-[8px]"
                  } `}
                >
                  {smallTitle_1}
                </h3>
                {description_1 && description_1 != "" ? (
                  <p className="text-[14px] font-medium mt-[4px]">
                    {description_1}
                  </p>
                ) : (
                  <></>
                )}
                {price_1 && (
                  <div className="flex items-end">
                    <p className="text-[18px] font-bold me-2 mb-[8px]">от</p>
                    <p>
                      <span className="text-[36px] lg:text-[40px] font-bold">
                        {price_1}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <div className="border-t-[1.5px] border-dashed before:absolute before:top-[-4px] before:content-none w-full relative bottom-[-20px]" />
                <div className="flex h-[39px] w-full flex-row items-center">
                  <div className="min-h-[40px] min-w-[40px] bg-white rounded-full relative left-[-20px] z-20"></div>
                  <div className="w-full flex" />
                  <div className="min-h-[40px] min-w-[40px] bg-white rounded-full relative right-[-20px] z-20"></div>
                </div>
              </div>
              <div className="px-[26px] pb-[31px] h-fit">
                {list_1 && list_1.length > 0 ? (
                  <div
                    className="flex flex-col"
                    style={{ minHeight: min_h_ticket_list }}
                  >
                    {secondSmallTitle_1 && secondSmallTitle_1 != "" ? (
                      <p className="text-[16px] font-medium mb-[10px]">
                        {secondSmallTitle_1}
                      </p>
                    ) : (
                      <></>
                    )}
                    <ul>
                      {list_1.map((item, index) => (
                        <li
                          key={index}
                          className="flex flex-row items-center mb-[15px]"
                        >
                          <div className="flex min-w-[20px] min-h-[20px]  me-[10px]">
                            <FaCircleChevronRight className="!w-[20px] !h-[20px]" />
                          </div>
                          <span className="text-[16px] font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex justify-center">
                  <SmoothScrollLink
                    className="flex lg:w-fit w-full"
                    href="#quiz"
                  >
                    <div
                      className={`font-medium text-[18px]  lg:w-fit w-full py-[12.5px] px-[20px] text-center rounded-full text-white`}
                      style={{
                        backgroundColor: buttonBgColor_1,
                        color: buttonColor_1,
                      }}
                    >
                      {buttonText_1}
                    </div>
                  </SmoothScrollLink>
                </div>
              </div>
            </div>
            <div className="flex flex-col max-w-full lg:max-w-[414px] w-full lg:mt-0 mt-[30px]">
              <div className="px-[26px] pt-[31px] rounded-t-[40px] border-b-0 border-[1.5px] border-black">
                <h3
                  className={`text-[24px] font-semibold ${
                    description_2 != "" ? "mb-0" : "mb-[8px]"
                  } `}
                >
                  {smallTitle_2}
                </h3>
                {description_2 && description_2 != "" ? (
                  <p className="text-[14px] font-medium mt-[4px]">
                    {description_2}
                  </p>
                ) : (
                  <></>
                )}
                {price_2 && (
                  <div className="flex items-end">
                    <p className="text-[18px] font-bold me-2 mb-[8px]">от</p>
                    <p>
                      <span className="text-[36px] lg:text-[40px] font-bold">
                        {price_2}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full">
                <div className="border-t-[1.5px] border-dashed before:absolute before:top-[-3px] border-black before:content-none w-full relative bottom-[-19px]" />
                <div className="flex h-[40px] w-full flex-row items-center translate-y-[-1px]">
                  <div className="inline-block overflow-hidden ">
                    <div className="min-h-[40px] min-w-[40px] border-[1.5px] border-black bg-white relative left-[-20px]  rounded-full z-30"></div>
                  </div>
                  <div className="w-full flex" />
                  <div className="inline-block overflow-hidden ms-[1px]">
                    <div className="min-h-[40px] min-w-[40px] border-[1.5px] border-black bg-white relative right-[-13px] rounded-full z-30"></div>
                  </div>
                </div>
              </div>

              <div className="h-full flex flex-col justify-between px-[26px] mt-[-1px] pb-[31px] rounded-b-[40px] border-t-0 border-[1.5px] border-black">
                {list_2 && list_2.length > 0 ? (
                  <div
                    className="flex flex-col"
                    style={{ minHeight: min_h_ticket_list }}
                  >
                    {secondSmallTitle_2 && secondSmallTitle_2 != "" ? (
                      <p className="text-[16px] font-medium mb-[10px]">
                        {secondSmallTitle_2}
                      </p>
                    ) : (
                      <></>
                    )}
                    <ul>
                      {list_2.map((item, index) => (
                        <li
                          key={index}
                          className="flex flex-row items-center mb-[15px]"
                        >
                          <div className="flex min-w-[20px] min-h-[20px]  me-[10px]">
                            <FaCircleChevronRight className="!w-[20px] !h-[20px]" />
                          </div>
                          <span className="text-[16px] font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex justify-center">
                  <SmoothScrollLink
                    className="flex lg:w-fit w-full"
                    href="#quiz"
                  >
                    <div
                      className={`font-medium text-[18px]  lg:w-fit w-full py-[12.5px] px-[20px] text-center rounded-full text-white`}
                      style={{
                        backgroundColor: buttonBgColor_2,
                        color: buttonColor_2,
                      }}
                    >
                      {buttonText_2}
                    </div>
                  </SmoothScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default TicketSeoBlock;
