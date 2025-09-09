import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HeaderLogo from "@/components/HeaderLogo";
import { useRouter } from "next/router";
import SmoothScrollLink from "./SmoothScollLink";
import FooterLogo from "./FooterLogo";

interface HeaderProps {
  theme?: string;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<null | "address" | "phone">(
    null
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setActiveModal(null);
      }
    };

    const handleScroll = () => {
      setActiveModal(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 ${
          theme === "dark" ? "bg-black" : "bg-white"
        } ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        <div
          className={`shadow-md ${
            theme === "dark" ? "bg-black" : "bg-white"
          } transition-all duration-300 py-4 px-5 xlg:py-[12px] custom_container ${
            theme === "dark" ? "border-t-black_80" : "border-t-black_10"
          } border-t-[1px] flex items-center justify-between translate-y-0`}
        >
          <div className="services-dropdown max-w-[1200px] mx-auto w-full flex items-center justify-between ">
            <FooterLogo />
            <nav className="hidden xlg:flex space-x-8 items-center">
              <SmoothScrollLink
                href="#services"
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } font-medium transition-all duration-300 hover:text-blue-600 whitespace-nowrap`}
              >
                <span>Услуги</span>
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#about"
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } font-medium transition-all duration-300 hover:text-blue-600 whitespace-nowrap`}
              >
                О нас
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#portfolio"
                className={`${
                  theme === "dark" ? "text-white" : "text-dark"
                } font-medium transition-all duration-300 hover:text-blue-600`}
              >
                Портфолио
              </SmoothScrollLink>
            </nav>
            <SmoothScrollLink
              href="#quiz"
              className="hidden xlg:block bg-blue_main min-h-[50px] py-3 text-center rounded-full max-w-[204px] text-white px-[36px] w-full text-[16px]  hover:bg-blue-700"
            >
              Обсудить проект
            </SmoothScrollLink>
          </div>
          <button
            className={`xlg:hidden flex-col items-end flex ${
              theme === "dark" ? "text-white" : "text-gray-700"
            } focus:outline-none`}
            onClick={toggleMenu}
          >
            <span
              className={`block w-5 h-[1.6px] ${
                theme === "dark" ? "bg-white" : "bg-gray-800"
              } transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <div className="flex mt-[5px] h-[1.6px] mb-[5px]">
              <span
                className={`w-[6px] me-[2px] h-full ${
                  theme === "dark" ? "bg-white" : "bg-gray-800"
                } transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                } `}
              ></span>
              <span
                className={`w-5 h-full ${
                  theme === "dark" ? "bg-white" : "bg-gray-800"
                } transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
            </div>
            <span
              className={`block h-[2px] ${
                theme === "dark" ? "bg-white" : "bg-gray-800"
              } transition-transform duration-300 ${
                isMenuOpen ? "w-5 -rotate-45 -translate-y-1.5" : "w-7 "
              }`}
            ></span>
          </button>
          <div
            className={`${
              theme === "dark" ? "bg-black" : "bg-white"
            } h-screen fixed top-0 left-0 w-full transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } z-60`}
          >
            <div className="flex items-center justify-between py-4 md:py-[20px] md:px-[46px] px-[20px]">
              <HeaderLogo />
              <button
                onClick={() => {
                  toggleMenu();
                  isMobileServicesOpen
                    ? setIsMobileServicesOpen(!isMobileServicesOpen)
                    : setIsMobileServicesOpen(isMobileServicesOpen);
                }}
                className="text-gray-700 focus:outline-none"
              >
                <span
                  className={`block w-5 h-0.5 ${
                    theme === "dark" ? "bg-white" : "bg-gray-800"
                  } transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 ${
                    theme === "dark" ? "bg-white" : "bg-gray-800"
                  } transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  } my-1`}
                ></span>
                <span
                  className={`block w-5 h-0.5 ${
                    theme === "dark" ? "bg-white" : "bg-gray-800"
                  } transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </button>
            </div>
            <nav className="flex md:mx-[46px] px-[20px] flex-col items-start space-y-[15px] mt-8 mb-[30px]">
              <div
                className={`duration-500 flex flex-col items-start space-y-[15px] ${
                  isMobileServicesOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                <SmoothScrollLink
                  href="#services"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  } font-medium transition-all duration-300 hover:text-blue-600 text-[22px]`}
                >
                  <span onClick={toggleMenu}>Услуги</span>
                </SmoothScrollLink>
                <SmoothScrollLink
                  href="#about"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  } font-medium transition-all duration-300 hover:text-blue-600 text-[22px]`}
                >
                  <span onClick={toggleMenu}>О нас</span>
                </SmoothScrollLink>
                <SmoothScrollLink
                  href="#portfolio"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  } font-medium transition-all duration-300 hover:text-blue-600 text-[22px]`}
                >
                  <span onClick={toggleMenu}>Портфолио</span>
                </SmoothScrollLink>
              </div>
            </nav>
            <SmoothScrollLink
              href="#quiz"
              className="xlg:hidden block md:ml-[46px] ml-[20px] bg-blue_main min-h-[50px] py-3 text-center rounded-full max-w-[204px] text-white px-[36px] w-full text-[16px]  hover:bg-blue-700"
            >
              <span onClick={toggleMenu}>Обсудить проект</span>
            </SmoothScrollLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
