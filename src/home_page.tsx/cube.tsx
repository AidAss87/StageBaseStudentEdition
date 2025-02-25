"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { Pagination, Scrollbar, Mousewheel, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import { SlideContent } from "./slideContent";

const stageData = [
  {
    id: 0,
    color: "bg-green-500 dark:bg-green-700",
    text: "Stage 1",
    code: "console.log('Stage 1');",
    description: "Первый этап",
  },
  {
    id: 1,
    color: "bg-yellow-500 dark:bg-yellow-700",
    text: "Stage 2",
    code: "console.log('Stage 2');",
    description: "Второй этап",
  },
  {
    id: 2,
    color: "bg-orange-500 dark:bg-orange-700",
    text: "Stage 3",
    code: "console.log('Stage 3');",
    description: "Третий этап",
  },
  {
    id: 3,
    color: "bg-red-500 dark:bg-red-700",
    text: "Stage 4",
    code: "console.log('Stage 4');",
    description: "Четвертый этап",
  },
];

export default function Cube() {
  const [stagePage, setStagePage] = useState("Stage 4");

  return (
    <div className="px-5 py-3 max-h-[60vh]">
      <Swiper
        className="rotate-90 max-w-[60vh] h-[40vw] ml-0 mr-0"
        modules={[Scrollbar, Mousewheel, EffectCube]}
        effect="cube"
        spaceBetween={0}
        slidesPerView={1}
        loop={false}
        scrollbar={{
          draggable: true,
          hide: false,
        }}
        mousewheel={{
          invert: false,
          eventsTarget: "#swiper-area",
        }}
        onSlideChange={(swiper) =>
          setStagePage(stageData[swiper.activeIndex].text)
        }
        onSwiper={(swiper) => console.log(swiper)}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
      >
        {stageData.map((stage, index) => (
          <SwiperSlide
            key={index}
            className={`${stage.color}flex items-center justify-center`}
          >
            <SlideContent
              code={stage.code}
              description={stage.description}
              text={stage.text}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="flex items-center justify-center text-center pt-5">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-500">
          {stagePage}
        </p>
      </div> */}
    </div>
  );
}

/* <SwiperSlide>
          <div className="flex items-center justify-center rounded-xl w-64 h-64 bg-slate-600">
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center rounded-xl w-64 h-64 bg-red-600">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center rounded-xl w-64 h-64 bg-green-600">
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center rounded-xl w-64 h-64 bg-blue-600">
            Slide 4
          </div>
        </SwiperSlide> */

//СКРОЛИЛАСЬ КОЛЕСОМ.добавить id и сделать стабильной субстанцией
//  2)const stageData = [
// { color: "green", text: "Stage 1" },
// { color: "yellow", text: "Stage 2" },
// { color: "orange", text: "Stage 3" },
// { color: "red", text: "Stage 4" },
//Убрать скролл, сделать на весь экран.Чтобы при добавление оставался на весь экран. 2)Попробовать сделать чтобы приветствие печатолось, а не сразу появлялось.
