import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface SuccessSubmitModalProps {
  congratulations: boolean;
  isDataSend: boolean;
  setIsDataSend: (isDataSend: boolean) => void;
  setAnswers?: (answers: { [key: number]: string }) => void;
  setActiveQuestion?: (activeQuestion: number) => void
}

const SuccessSubmitModal: React.FC<SuccessSubmitModalProps> = ({
  congratulations,
  isDataSend,
  setIsDataSend,
  setAnswers,
  setActiveQuestion
}) => {
  const router = useRouter();

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsDataSend(false);
    setAnswers && setAnswers({})
    setActiveQuestion && setActiveQuestion(1)
    // router.reload();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all ${
          !isDataSend ? "opacite-0 hidden" : "opacity-100 visible"
        }`}
      >
        <div
          className={`success-submit md:w-[450px] sm:w-full bg-white p-[20px] md:m-0 m-[20px] transition-all ${
            !isDataSend ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-end">
            <RxCross2
              onClick={closeModal}
              size={24}
              className="text-black_80 cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center ">
            {congratulations ? (
              <>
                <img
                  src="/success.png"
                  alt="Успешно!"
                  className="mb-[20px]"
                />
                <p className="text-[18px] font-medium text-center">
                  Спасибо за обращение!
                </p>
                <p className="text-[18px] font-medium text-center">
                  Мы ответим на вашу заявку в течение нескольких рабочих часов
                </p>
              </>
            ) : (
              <>
                <img src="/failure.png" alt="Ошибка." />
                <p className="text-[18px] font-medium text-center">
                  Произошла ошибка!
                </p>
                <p className="text-[18px] font-medium text-center">
                  Заполните заявку еще раз Извините за временные неудобства
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessSubmitModal;
