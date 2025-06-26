import { useEffect, useRef } from "react";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import { CircularProgress } from "@/shared/ui/CircularProgress/CircularProgress";

// ✅ Удалил импорт Stage, так как stageData больше не используется
// ✅ Удалён SlideContent, потому что каждый слайд теперь кастомный и может быть передан снаружи

interface CubeProps {
  progress: number;
  slides: React.ReactNode[]; // ✅ Теперь вместо stageData — готовые компоненты
  setCurrentStageIndex: (index: number) => void;
  currentStageIndex: number;
}

export default function Cube({
  progress,
  slides,
  setCurrentStageIndex,
  currentStageIndex,
}: CubeProps) {
  const swiperRef = useRef<SwiperClass | null>(null);

  // ✅ При изменении currentStageIndex снаружи, двигаем слайдер
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.activeIndex !== currentStageIndex
    ) {
      swiperRef.current.slideTo(currentStageIndex);
    }
  }, [currentStageIndex]);

  return (
    <div id="swiper-area">
      <Swiper
        direction={"vertical"}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrentStageIndex(swiper.activeIndex); // ✅ Сохраняем индекс выбранного слайда
        }}
        className="w-[1196px] h-[839px]"
        modules={[Scrollbar, Mousewheel, EffectCube]}
        effect="cube"
        slidesPerView={1}
        loop={false}
        mousewheel={{
          invert: false,
          eventsTarget: "#swiper-area",
        }}
        cubeEffect={{
          shadow: false, // ✅ Отключаем тени
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
      >
        {/* ✅ Используем slides вместо stageData */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide} {/* ✅ Рендерим переданный React-компонент */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
