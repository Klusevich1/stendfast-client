import Image from 'next/image';
import React from 'react';
import StandardMarginsLayout from '@/layouts/StandardMarginsLayout';

const AboutBlockSecond = () => {
    return (
        <StandardMarginsLayout styles="" children={
            <>
                <h2 className="md:text-[40px] text-[28px] font-bold md:mb-[30px] mb-[20px]">
                    Мы — надежная IT-компания, специализирующаяся на полном цикле разработки программного обеспечения
                </h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-12 gap-5 place-items-center">
                    <span className="text-[22px] font-medium lg:col-start-1 lg:row-start-1">
                      Предлагаем комплексные решения, которые полностью соответствуют вашим бизнес-задачам и требованиям, обеспечивая эффективную реализацию проектов любой сложности
                    </span>
                    <Image
                        src={'/resources/graph.png'}
                        alt="Graph"
                        width={625}
                        height={625}
                        className="lg:col-start-2 lg:row-span-2"
                    />
                    <div className="lg:mt-[100px] mt-[50px] lg:col-start-1 lg:row-start-2 w-[100%]">
                        <h3 className="text-[32px] font-medium mb-[20px]">Немного о нас</h3>
                        <div
                            className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:gap-[30px] gap-[20px] w-[100%]">
                            <div className="bg-black_5 rounded-[30px] p-[20px]">
                                <p className="text-6xl font-bold p-o m-0">5+</p>
                                <span className="text-[16px] font-medium text-black_40">
                                    Лет создаем эффективные решения для вашего бизнеса
                                </span>
                            </div>
                            <div className="bg-black_5 rounded-[30px] p-[20px]">
                                <p className="text-6xl font-bold p-o m-0">ТОП 1</p>
                                <span className="text-[16px] font-medium text-black_40">
                               Наши сайты любят поисковые системы
                            </span>
                            </div>
                            <div className="bg-black_5 rounded-[30px] p-[20px]">
                                <p className="text-6xl font-bold p-o m-0">10 из 10</p>
                                <span className="text-[16px] font-medium text-black_40">
                                Наших проектов выполняются в оговорённый срок
                            </span>
                            </div>
                            <div className="bg-black_5 rounded-[30px] p-[20px]">
                                <p className="text-6xl font-bold p-o m-0">60+</p>
                                <span className="text-[16px] font-medium text-black_40">
                                    Разработанных проектов
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        } />
    );
};

export default AboutBlockSecond;
