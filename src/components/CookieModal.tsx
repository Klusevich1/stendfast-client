import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const CookieModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [necessaryCookie, setNecessaryCookie] = useState<boolean>(true);
  const [staticCookie, setStaticCookie] = useState<boolean>(true);

  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.visualViewport) {
      const updateViewportHeight = () => {
        window.visualViewport && setViewportHeight(window.visualViewport.height);
      };

      updateViewportHeight(); // Установить начальное значение
      window.visualViewport.addEventListener("resize", updateViewportHeight);

      return () => {
        window.visualViewport?.removeEventListener("resize", updateViewportHeight);
      };
    }
  }, []);

  const closeModal = (answ: string) => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setCookie("cookieConsent", true, { maxAge: 60 * 60 * 24 * 365 });
    setCookie("acceptCookiesRules", answ, { maxAge: 60 * 60 * 24 * 365 });
    if (answ === "agree") {
      setCookie("necessaryCookie", true, {
        maxAge: 60 * 60 * 24 * 365,
      });
      setCookie("staticCookie", true, { maxAge: 60 * 60 * 24 * 365 });
    } else {
      setCookie("necessaryCookie", false, {
        maxAge: 60 * 60 * 24 * 365,
      });
      setCookie("staticCookie", false, { maxAge: 60 * 60 * 24 * 365 });
    }
    // router.reload();
  };

  const acceptCookieSettings = (necessaryC: boolean, staticC: boolean) => {
    setIsModalOpen(false);
    setCookie("necessaryCookie", necessaryC, { maxAge: 60 * 60 * 24 * 365 });
    setCookie("staticCookie", staticC, { maxAge: 60 * 60 * 24 * 365 });
    setCookie("cookieConsent", true, { maxAge: 60 * 60 * 24 * 365 });
    if (necessaryC === false && staticC === false) {
      setCookie("acceptCookiesRules", "cancel", { maxAge: 60 * 60 * 24 * 365 });
    } else {
      setCookie("acceptCookiesRules", "agree", { maxAge: 60 * 60 * 24 * 365 });
    }
    // router.reload();
  };

  const backReset = () => {
    setIsSettings(false);
    setNecessaryCookie(true);
    setStaticCookie(true);
  };

  const handleToggleNecessary = () => {
    setNecessaryCookie(!necessaryCookie);
  };

  const handleToggleStatic = () => {
    setStaticCookie(!staticCookie);
  };

  useEffect(() => {
    setTimeout(() => {
      const consent = getCookie("cookieConsent");
      if (consent !== "true") {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
      }
    }, 5000);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black text-black bg-opacity-50 flex justify-end items-end z-50 transition-all ${
          !isModalOpen ? "opacity-0 hidden" : "opacity-100 visible"
        }`}
      >
        <div
          className={`md:w-[640px] w-[100%] md:rounded-[30px] bg-white md:p-[30px] md:me-[46px] md:mb-[19px]  p-[20px] transition-all ${
            !isModalOpen ? "opacity-0" : "opacity-100"
          }`}
          style={{
            bottom: viewportHeight ? window.innerHeight - viewportHeight : "auto",
          }}
        >
          {isSettings ? (
            <>
              <div className="md:h-[380px] h-[40vh] overflow-y-scroll">
                <div className="pb-[15px]">
                  <p className="text-[22px] font-bold mb-[5px]">
                    Настройка файлов cookie
                  </p>
                  <p className="text-[16px] font-medium">
                    Вы можете настроить удобные для вас файлы сооіе, кроме
                    необходимых. Отмена некоторых сооіе может повлиять на
                    работоспособность веб-сайта.
                  </p>
                </div>
                <div className="py-[15px] border-t-[1px] border-black_20">
                  <div className="flex flex-row justify-between items-center gap-[5px]">
                    <p className="text-[22px] font-bold mb-[5px]">
                      Необходимые файлы cookie
                    </p>
                    <div
                      onClick={handleToggleNecessary}
                      className={`min-w-[46px] h-[26px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        necessaryCookie ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          necessaryCookie
                            ? "translate-x-[18px]"
                            : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-[16px] font-medium">
                    Эти файлы cookie необходимы для функционирования веб-сайта и
                    не могут быть отключены в наших системах. Вы можете
                    настроить браузер таким образом, чтобы он блокировал эти
                    файлы cookie или уведомлял вас об их использовании, но в
                    таком случае возможно, что некоторые разделы сайта не будут
                    работать или будут работать некорректно.
                  </p>
                </div>
                <div className="py-[15px] border-t-[1px] border-black_20">
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-[22px] font-bold mb-[5px]">
                      Статистические файлы cookie
                    </p>
                    <div
                      onClick={handleToggleStatic}
                      className={`min-w-[46px] h-[26px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        staticCookie ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          staticCookie ? "translate-x-[18px]" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <p className="text-[16px] font-medium">
                    Эти могут использоваться для сбора данных о ваших интересах,
                    посещаемых страницах и источниках трафика, чтобы оценивать и
                    улучшать работу нашего веб-сайта. Нажимая на кнопку «Принять
                    настройки cookie», вы даёте согласие на обработку файлов
                    cookie в соответствии с 
                    <span className="text-blue_main">
                      Политикой обработки файлов cookie
                    </span>
                    .
                  </p>
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:gap-0 gap-[20px] justify-between">
                <button
                  className={`flex items-center justify-center bg-[#5D7DFF] text-center text-[18px] font-medium rounded-[30px] md:w-[184px] w-full text-white px-4 md:py-[15px] py-[12px] transition-all`}
                  // onClick={() => setIsSettings(false)}
                  disabled
                >
                  <IoSettingsOutline className="w-[24px] h-[24px] mr-[10px]" />
                  Настройки
                </button>
                <button
                  className="bg-black_5 text-center text-[18px] font-medium rounded-[30px] md:w-[184px] w-full text-black px-4 md:py-[15px] py-[12px] hover:text-blue-700 transition-all"
                  onClick={backReset}
                >
                  Назад
                </button>
                <button
                  className="bg-blue_main  text-center text-[18px] font-medium rounded-[30px] md:w-[184px] w-full text-white px-4 md:py-[15px] py-[12px] transition-all"
                  onClick={() =>
                    acceptCookieSettings(necessaryCookie, staticCookie)
                  }
                >
                  Принять
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[22px] font-bold mb-[5px]">
                Обработка файлов cookie
              </p>
              <p className="text-[16px] font-medium">
                Наш сайт использует файлы сооkіе для улучшения пользовательского
                опыта, сбора статистики и представления персонализированных
                рекомендаций. Нажав «Принять», вы даете согласие на обработку
                файлов cookie в соответствии с{" "}
                <span className="text-blue_main">
                  Политикой обработки файлов cookie
                </span>
                .
              </p>
              <div className="flex md:flex-row flex-col md:gap-0 gap-[20px] justify-between mt-[20px]">
                <button
                  className={`flex items-center justify-center bg-black_5 text-center text-[18px] font-medium rounded-[30px] md:w-[184px] w-full text-black px-4 md:py-[15px] py-[12px] hover:text-blue-700 transition-all`}
                  onClick={() => setIsSettings(true)}
                >
                  <IoSettingsOutline className="w-[24px] h-[24px] mr-[10px]" />
                  Настройки
                </button>
                <button
                  className="bg-black_5 text-center text-[18px] font-medium rounded-[30px] md:w-[184px] w-full text-black px-4 md:py-[15px] py-[12px] hover:text-blue-700 transition-all"
                  onClick={() => closeModal("cancel")}
                >
                  Отклонить
                </button>
                <button
                  className="bg-blue_main  text-center text-[18px] font-medium rounded-[30px] md:w-[184px] w-full text-white px-4 md:py-[15px] py-[12px] hover:text-blue-700 transition-all"
                  onClick={() => closeModal("agree")}
                >
                  Принять
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieModal;
