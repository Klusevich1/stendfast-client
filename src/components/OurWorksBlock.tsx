import StandardMarginsLayout from "@/layouts/StandardMarginsLayout";
import Image from "next/image";
import React from "react";
import { FaCircleChevronRight } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import SmoothScrollLink from "./SmoothScollLink";

interface Case {
  imagePath: string;
  name: string;
  title: string;
  achievements: string[];
}

interface OurWOrksBlockProps {
  title: string;
  cases: Case[];
}

const OurWorksBlock: React.FC<OurWOrksBlockProps> = ({ title, cases }) => {
  return (
    <StandardMarginsLayout styles="my-[40px]">
      <div id="portfolio">
        <h2 className="mb-[30px] font-bold text-[32px] md:text-[42px] lg:text-[60px]">
          {title}
        </h2>
        <div className="flex flex-col gap-[40px]">
          {cases.map((c, idx) => (
            <div key={idx}>
              <CaseCard c={c} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </StandardMarginsLayout>
  );
};

const CaseCard: React.FC<{ c: Case; idx: number }> = ({ c, idx }) => {
  return (
    <div
      className={`flex ${
        idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } flex-col sm:gap-6 gap-5`}
    >
      <div className="lg:max-w-[688px] lg:min-w-[55%] w-full">
        <Image
          src={c.imagePath}
          width={688}
          height={360}
          className="object-cover w-full"
          alt={c.title}
        />
      </div>
      <div className="w-full">
        <p className="sm:text-[18px] text-[16px] font-medium mb-2">{c.name}</p>
        <h3 className="sm:text-[24px] text-[20px] font-semibold mb-5">
          {c.title}
        </h3>
        <div className="flex flex-col min-w-[40%] lg:pt-0 mb-5">
          {c.achievements.map((ac, idx) => (
            <div className="flex" key={idx}>
              <div className="flex min-w-[24px] min-h-[24px] me-[8px] mt-1">
                <FaCircleChevronRight className="!w-[20px] !h-[20px]" />
              </div>
              <p className="sm:text-[18px] text-[16px] mb-[10px] font-medium  lg:max-w-[640px]">
                {ac}
              </p>
            </div>
          ))}
        </div>
        <SmoothScrollLink
          className="order-2 lg:order-1 flex transition-all lg:w-fit w-full mt-0"
          href="#quiz"
        >
          <div
            className={`lg:w-[275px] w-full text-[16px] lg:py-[15px] py-[12px] leading-normal text-center rounded-full text-white bg-blue_main`}
          >
            Бесплатная консультация
          </div>
          <div
            className={`ms-[-10px] lg:text-[28px] text-[16px] md:text-[24px] lg:size-[54px] size-[50px] lg:min-w-[54px] min-w-[50px] flex justify-center items-center rounded-full text-white bg-blue_main`}
          >
            <GoArrowUpRight />
          </div>
        </SmoothScrollLink>
      </div>
    </div>
  );
};

export default OurWorksBlock;
