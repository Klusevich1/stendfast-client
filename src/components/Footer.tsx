import React, { useState } from "react";
import Image from "next/image";
import FooterLogo from "@/components/FooterLogo";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPaperclip } from "react-icons/fa6";
import { IMaskInput } from "react-imask";
import { RxCross2 } from "react-icons/rx";
import SuccessSubmitModal from "./SuccessSubmitModal";
import SmoothScrollLink from "./SmoothScollLink";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать хотя бы 2 символа")
    .max(50, "Имя слишком длинное"),
  phone: z.string().min(1, "Поле с номером телефона должно быть заполнено"),
  // .regex(
  //   /^\+375 \([1-9][1-9]\) \d{3}-\d{2}-\d{2}$/,
  //   "Введите номер телефона в формате: +375 (29) 333-33-33"
  // ),
  email: z.string().email("Введите правильный E-mail"),
  company: z
    .string()
    .min(2, "Название должно содержать хотя бы 2 символа")
    .max(50, "Название слишком длинное"),
  services: z
    .array(
      z.enum([
        "Веб-разработка",
        "Мобильное приложение",
        "Дизайн",
        "Motion",
        "SEO",
      ])
    )
    .nonempty("Выберите хотя бы одну услугу"),
  help: z.string().optional(),
  file: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Footer: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      services: [],
      help: "",
    },
  });

  const services: Array<
    "Веб-разработка" | "Мобильное приложение" | "Дизайн" | "Motion" | "SEO"
  > = ["Веб-разработка", "Мобильное приложение", "Дизайн", "Motion", "SEO"];

  const [congratulations, setCongratulations] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDataSend, setIsDataSend] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [agreeForMailing, setAgreeForMailing] = useState<boolean>(true);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(true);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]); // Устанавливаем файл в состояние
    }
  };

  const removeFile = () => {
    setSelectedFile(null); // Удаляем файл из состояния
  };

  const onSubmit = async (data: FormData) => {
    if (loading) return;
    setLoading(true);

    const formData = new FormData();

    formData.append("name", data.name || "");
    formData.append("phone", data.phone || "");
    formData.append("email", data.email || "");
    if (data.company) formData.append("company", data.company);
    formData.append("help", data.help || "");

    data.services.forEach((service) => formData.append("services[]", service));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append("agreePolicy", agreePolicy ? "Согласен" : "Не согласен");
    formData.append(
      "agreeForMailing",
      agreeForMailing ? "Согласен" : "Не согласен"
    );
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/application`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        setCongratulations(false);
        throw new Error(`Ошибка: ${response.statusText}`);
      } else {
        setCongratulations(true);

        if (typeof window !== "undefined") {
          if (!window.__formSubmitPushed) {
            window.__formSubmitPushed = true;
            window.dataLayer?.push({ event: "form_submit" });
          }

          if (typeof window.ym === "function") {
            window.ym(99204054, "reachGoal", "form");
          }
        }
      }

      reset({
        name: "",
        phone: "",
        email: "",
        company: "",
        services: [],
        help: "",
      });
      setSelectedFile(null);
      setCongratulations(true);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      setCongratulations(false);
      if (typeof window !== "undefined") {
        window.__formSubmitPushed = false;
      }
    } finally {
      setIsDataSend(true);
      setLoading(false);
    }
  };

  const handlePolicyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreePolicy(event.target.checked);
  };

  const handleMailingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeForMailing(event.target.checked);
  };

  return (
    <>
      <section className="text-white flex flex-col justify-center items-center self-stretch bg-neutral-900">
        <div className="flex flex-col lg:flex-row gap-10 justify-between items-start max-w-[1440px] custom_container min-h-[358px] w-full md:py-[60px] py-[40px]">
          <div className="max-w-[530px]">
            <h2 className="font-bold text-[28px] md:text-[32px] lg:text-[48px] xl:text-[60px]">
              Есть идея для проекта?
            </h2>
            <p className="md:text-[18px] text-[16px] mt-[20px] mb-[30px]">
              Расскажите нам о своем проекте и мы воплотим его в жизнь.
              Заполните форму или отправьте письмо на адрес:
            </p>
            <p className="font-bold text-[22px] md:text-[24px]">
              <a href="mailto:info@digitaldevils.by">info@digitaldevils.by</a>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:gap-[30px] gap-[20px] font-medium min-w-[240px] lg:w-[641px] max-w-none w-full md:max-w-full"
          >
            <div className="md:grid flex flex-col md:grid-cols-2 gap-4">
              <div className="relative lg:max-w-[300px] w-full">
                <label htmlFor="name" className="block text-[18px] font-medium">
                  Имя
                  <span> *</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="h-[43px] mt-1 block w-full p-2 border-b border-black_10 bg-transparent outline-none rounded-none focus:border-b-2 focus:border-white transition-all"
                />
                {errors.name && (
                  <p className="absolute bottom-[-18px] left-0 text-red text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="relative lg:max-w-[300px] w-full">
                <label
                  htmlFor="phone"
                  className="block text-[18px] font-medium"
                >
                  Телефон
                  <span> *</span>
                </label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <IMaskInput
                      mask="+375 (00) 000-00-00"
                      onBlur={onBlur}
                      onAccept={onChange}
                      value={value}
                      inputRef={ref}
                      defaultValue="+375"
                      placeholder="+375 (29) 333-33-33"
                      className="h-[43px] mt-1 block w-full p-2 border-b outline-none bg-transparent focus:border-white focus:border-b-2 transition-all rounded-none"
                    />
                  )}
                />
                {errors.phone && !congratulations && (
                  <p className="absolute bottom-[-18px] left-0 text-red text-xs">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="relative lg:max-w-[300px] w-full">
                <label
                  htmlFor="email"
                  className="block text-[18px] font-medium"
                >
                  E-mail
                  <span> *</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="h-[43px] mt-1 block w-full p-2 border-b border-black_10 bg-transparent outline-none rounded-none focus:border-b-2 focus:border-white transition-all"
                />
                {errors.email && (
                  <p className="absolute bottom-[-18px] left-0 text-red text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="relative lg:max-w-[300px] w-full">
                <label
                  htmlFor="company"
                  className="block text-[18px] font-medium"
                >
                  Компания
                  <span> *</span>
                </label>
                <input
                  id="company"
                  type="text"
                  {...register("company")}
                  className="h-[43px] mt-1 block w-full p-2 border-b border-black_10 bg-transparent outline-none rounded-none focus:border-b-2 focus:border-white transition-all"
                />
                {errors.company && (
                  <p className="absolute bottom-[-18px] left-0 text-red text-xs">
                    {errors.company.message}
                  </p>
                )}
              </div>
              <div className="relative col-span-2  mt-4">
                <label
                  htmlFor="services"
                  className="block text-[18px] font-medium mb-[15px]"
                >
                  Выберите услуги
                  <span> *</span>
                </label>
                <div className="mt-2 flex flex-wrap gap-[15px] text-black">
                  {services.map((service) => {
                    const selectedServices = watch("services") || [];
                    const isChecked = selectedServices.includes(service);
                    return (
                      <label
                        key={service}
                        className={`transition-all duration-300 flex items-center gap-2 ${
                          isChecked ? "bg-blue_main text-white" : "bg-black_5"
                        } px-[10px] py-[10.5px] rounded-full cursor-pointer`}
                      >
                        <input
                          type="checkbox"
                          value={service}
                          {...register("services")}
                          className="form-checkbox hidden"
                        />
                        <span>{service}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.services && (
                  <p className="absolute bottom-[-18px] left-0 text-red text-xs">
                    {errors.services.message ==
                    "Expected array, received boolean"
                      ? "Выберите хотя бы одну услугу"
                      : errors.services.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-between sm:flex-row col-span-2 w-full">
                <div className="relative w-full lg:max-w-[400px] pe-3">
                  <label
                    htmlFor="help"
                    className="block text-[18px] font-medium"
                  >
                    Чем мы можем вам помочь?
                  </label>
                  <textarea
                    id="help"
                    {...register("help")}
                    className="h-[43px] mt-1 block w-full p-2 border-b border-black_10 bg-transparent outline-none rounded-none focus:border-b-2 focus:border-white transition-all"
                    rows={1}
                  />
                  {errors.help && (
                    <p className="absolute bottom-[-18px] left-0 text-red text-xs">
                      {errors.help.message}
                    </p>
                  )}
                </div>

                <div className="w-full md:mt-0 mt-[30px] h-full text-center sm:text-left items-end flex max-w-full sm:max-w-[218px]">
                  {!selectedFile ? (
                    <label
                      htmlFor="file"
                      className="group max-h-[50px] md:w-[218px] w-full inline-flex justify-center sm:justify-start items-center gap-2 cursor-pointer border border-white rounded-full px-5 py-[12px] text-white hover:bg-white hover:text-black"
                    >
                      <FaPaperclip className="group-hover:text-black text-white" />
                      <span className="text-[18px] w-full">
                        Прикрепить файл
                      </span>
                      <input
                        id="file"
                        type="file"
                        onChange={onFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="w-full flex items-center gap-2 border border-white rounded-full px-5 py-[12px] text-white">
                      <span className="text-[18px] w-full">
                        {selectedFile.name}
                      </span>
                      <RxCross2
                        type="button"
                        onClick={removeFile}
                        size={20}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <h4 className="text-[16px] font-medium">
                Согласие на обработку персональных данных
              </h4>
              <div className="flex flex-row items-start">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id="agreePolicy"
                  name="agreePolicy"
                  checked={agreePolicy}
                  onChange={handlePolicyChange}
                />
                <label
                  htmlFor="agreePolicy"
                  className="text-[14px] font-medium"
                >
                  <p>
                    Я уведомлен(а), что мои персональные данные, указанные в
                    настоящей анкете, будут обработаны оператором в соответствии
                    с{" "}
                    <span
                      className="underline"
                    >
                      Политикой оператора в отношении обработки персональных
                      данных.
                    </span>
                  </p>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id="agreeForMailing"
                  name="agreeForMailing"
                  value="yes"
                  checked={agreeForMailing}
                  onChange={handleMailingChange}
                />
                <label
                  htmlFor="agreeForMailing"
                  className="text-[14px] font-medium"
                >
                  Даю согласие на получение рассылок и рекламных материалов
                </label>
              </div>
            </div>
            <button
              type="submit"
              className={`submit-button ${loading ? "loading" : ""} ${
                !agreeForMailing || !agreePolicy
                  ? "bg-gray-300"
                  : "bg-blue_main"
              } mt-2 px-[36px] py-[12px] md:w-[204px] w-full text-center text-[16px]  h-fit min-h-[50px] rounded-full text-white`}
              disabled={!agreeForMailing || !agreePolicy}
            >
              {loading ? "Отправка..." : "Обсудить проект"}
            </button>
          </form>
        </div>
        <div className="w-full flex flex-col md:py-[60px] py-[50px] sm:gap-[60px] gap-[40px] max-w-[1440px] custom_container">
          <div className="max-w-[700px] flex justify-between gap-[20px] flex-wrap flex-row ">
            <FooterLogo />
            <nav className="flex space-x-8 items-center">
              <SmoothScrollLink
                href="#services"
                className={`text-white font-medium transition-all duration-300 hover:text-blue-600 whitespace-nowrap`}
              >
                <span>Услуги</span>
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#about"
                className={`text-white font-medium transition-all duration-300 hover:text-blue-600 whitespace-nowrap`}
              >
                О нас
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#portfolio"
                className={`text-white font-medium transition-all duration-300 hover:text-blue-600`}
              >
                Портфолио
              </SmoothScrollLink>
            </nav>
          </div>
        </div>
        <div className="w-full text-[14px] text-black_40 pb-[50px] max-w-[1440px] custom_container">
          <p>
            Наши сайты можно встретить во всех городах Беларуси: Барановичи,
            Барань, Белоозерск, Белыничи, Береза, Березино, Березовка,
            Бешенковичи, Бобруйск, Большое Стиклево, Борисов, Боровляны,
            Браслав, Брест, Буда-Кошелево, Быхов, Верхнедвинск, Ветка, Вилейка,
            Витебск, Волковыск, Воложин, Ганцевичи, Глубокое, Глуск, Гомель,
            Горки, Городея, Городок, Гродно, Дзержинск, Добруш, Докшицы,
            Дрогичин, Дружный, Дятлово, Ельск, Жабинка, Житковичи, Жлобин,
            Жодино, Заславль, Иваново, Ивацевичи, Ивье, Ипуть-3, Калинковичи,
            Каменец, Клецк, Климовичи, Кличев, Кобрин, Колодищи, Копыль,
            Кореличи, Костюковичи, Кричев, Круглое, Крупки, Лельчицы, Лепель,
            Лесной, Лида, Логойск, Лоев, Лунинец, Любань, Ляховичи, Малорита,
            Марьина Горка, Микашевичи, Минск, Миоры, Михановичи, Могилев,
            Мозырь, Молодечно, Мосты, Мстиславль, Мядель, Наровля, Несвиж,
            Новогрудок, Новолукомль, Новополоцк, Орша, Осиповичи, Островец,
            Ошмяны, Петриков, Пинск, Полоцк, Поставы, Пружаны, Раков, Ратомка,
            Речица, Рогачев, Светлогорск, Свислочь, Сенно, Скидель, Славгород,
            Слоним, Слуцк, Смиловичи, Смолевичи, Сморгонь, Солигорск, Старые
            дороги, Столбцы, Столин, Толочин, Узда, Фаниполь, Хойники, Хотимск,
            Чаусы, Чашники, Червень, Чериков, Чечерск, Чисть, Шклов, Шумилино,
            Щучин.
          </p>
        </div>
        <div className="w-full text-[14px] font-medium text-white pb-[60px] max-w-[1440px] custom_container">
          ООО «Цифровая Волна» УНП 193881479 Зарегистрировано МинГорИсполкомом
          Адес: 220065, г. Минск, улица Братская, д. 11, помещение 380
        </div>
      </section>
      {isDataSend && (
        <SuccessSubmitModal
          congratulations={congratulations}
          isDataSend={isDataSend}
          setIsDataSend={setIsDataSend}
        />
      )}
    </>
  );
};

export default Footer;
