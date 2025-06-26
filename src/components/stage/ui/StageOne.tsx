export const StageOne = () => (
  <div>
    <div className="flex pt-[66px] rounded-[20px] pl-[32px] pr-[32px] items-center">
      <div className="flex flex-col gap-[58px]">
        <div className="text-black flex flex-col font-raleway gap-[14px]">
          <p className="font-normal text-[32px]">ЧТО ТЕБЯ ЖДЕТ</p>
          <p className="w-[311px] h-[64px] bg-[#745DCD] flex justify-center items-center rounded-[20px] font-medium text-[28px] text-white">
            НА ПЕРВОМ ЭТАПЕ?
          </p>
        </div>
        <div>
          <div className="flex items-center gap-[55px]">
            <p className="text-[128px] font-manrope font-lightn">1</p>{" "}
            <div className="flex flex-col gap-[30px] w-[409px] h-[108px] ">
              <p className="font-manrope font-bold">ВВЕДЕНИЕ В КУРС</p>{" "}
              <p className="text-[20px] font-manrope font-light ">
                Ты разберёшься, что такое вёрстка, и как веб-продукты попадают в
                браузер
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[38px]">
            <p className="text-[128px] font-manrope font-light">2</p>{" "}
            <div className="flex flex-col gap-[30px] w-[409px] h-[108px]">
              <p className="font-manrope font-bold">HTML-СТРУКТУРА, CSS</p>
              <p className="text-[20px] font-manrope font-light">
                Освоишь инструменты для создания живых и интерактивных страниц
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[38px]">
            <p className="text-[128px] font-manrope font-light">3</p>{" "}
            <div className="flex flex-col gap-[30px] w-[409px] h-[108px]">
              <p className="font-manrope font-bold">ФОРМЫ И ИНПУТЫ</p>
              <p className="text-[20px] font-manrope font-light  ">
                Создашь свою первую работающую форму (например, для авторизации)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[598px] h-[481px] pr-[38px] pl-[79px] pb-[61px] bg-[#FFFFFF5E] rounded-[20px] items-center justify-center">
        <div className="w-[481px] h-[247px] flex flex-col gap-[53px]">
          <p className="font-manrope font-bold text-[20px]">
            ПОСЛЕ ЭТОГО ЭТАПА ТЫ СМОЖЕШЬ:
          </p>
          <ul className=" flex flex-col gap-[10px] font-manrope font-light text-[20px]">
            <li>- Верстать простые, но качественные страницы</li>
            <li>
              - Понимать, как устроен любой сайт (и находить в них ошибки)
            </li>
            <li>
              - Будешь готов к продвинутым темам — адаптивам, анимациям,
              JavaScript
            </li>
          </ul>
          <div>
            <button className="flex rounded-[20px] items-center justify-center gap-[5px] w-[245px] h-[60px] bg-[#745DCD] text-white">
              начать обучение
              <img
                src="/white-arrow.svg"
                alt="Стрелочка"
                width={10}
                height={10}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
