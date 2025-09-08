import React, { useEffect, useRef, useState } from "react";
import SmallMainBlockCard from "@/components/SmallMainBlockCard";
import { GoArrowUpRight } from "react-icons/go";
import StandardMarginsLayout from "@/layouts/StandardMarginsLayout";
import SmoothScrollLink from "./SmoothScollLink";

const MainBlockFirst: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <StandardMarginsLayout
        styles="lg:mt-[75px] mt-[50px]"
        children={
          <>
            <h1 className="font-bold text-[40px] md:text-[50px] lg:text-[75px] xl:text-[90px]">
              Создаем веб-сайты, которые{" "}
              <span className="text-blue_main ">продают 24/7</span>
            </h1>
            <div className="flex flex-col lg:gap-5 gap-0">
              <p className="max-w-[666px] md:text-[24px] text-[18px] font-bold md:mt-0 mt-[20px]">
                Мы – архитекторы цифрового успеха, создающие веб-сайты, которые
                не просто впечатляют, а конвертируют посетителей в лояльных
                клиентов
              </p>
              <SmoothScrollLink
                className="order-2 lg:order-1 flex transition-all lg:w-fit w-full mt-[20px] lg:mt-0"
                href="#quiz"
              >
                <div className="w-[219px] text-[18px] py-[11px] text-center bg-blue_main rounded-full text-white">
                  Получить скидку
                </div>
                <div
                  className={`ms-[-10px] lg:text-[28px] text-[18px] md:text-[24px] size-[48px] min-w-[48px] flex justify-center items-center rounded-full text-white bg-blue_main`}
                >
                  <GoArrowUpRight />
                </div>
              </SmoothScrollLink>
            </div>
          </>
        }
      />
      {/* <div className="w-full mx-auto max-w-[1440px] sm:px-[45px] px-[0px]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-[0px] sm:rounded-[40px] mt-[60px] w-full shadow-lg"
          preload="none"
        >
          <source src="/resources/main.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div> */}
    </>
  );
};

export default MainBlockFirst;
