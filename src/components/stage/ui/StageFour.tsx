export const StageFour = () => (
  <div>
    <div className="flex justify-center items-start space-x-[71px] pt-[43px] pl-[60px] pr-[39px]">
      {/* Первый див */}
      <div className="w-[606px] pt-[24px]">
        {/* Первый текст */}
        <p className="text-[32px]">
          ЗАКЛЮЧИТЕЛЬНЫЙ ЭТАП - <br />
          СЕРЬЕЗНЫЙ УРОВЕНЬ{" "}
        </p>
        {/* Расстояние 90px */}
        <div className="h-[90px]" />
        {/* Второй текст */}
        <p className="">
          Настоящая фронтенд-кухня: работа с данными,
          <br /> маршрутизация безопасность, <br /> и многое многое другое!
        </p>
        {/* Расстояние 9px */}
        <div className="h-[9px]" />
        {/* Див внутри первого блока */}
        <div className="absolute top-[334px] left-1 z-10">
          <img src="/third-student-pic.svg" width="100%" height="100%" alt="" />
        </div>
      </div>

      {/* Второй див */}
      <div className="w-[467px] gap-[66px] flex flex-col">
        {/* Дивы внутри второго блока */}
        <div className="flex w-[457px] gap-[20px] h-[130px] bg-[#595858] text-[24px] text-white font-raleway font-light rounded-[20px] pl-[45px] pt-[48px] pb-[46px] items-center">
          начать изучение
          <img src="/white-arrow.svg" alt="Стрелочка" width={15} height={10} />
        </div>
        {/* расстояние 60px снизу до следующего или просто отступ снизу */}
        <div className="flex flex-col gap-[40px] p-2 font-manrope">
          <div className="flex flex-col gap-[38px]">
            <p className="font-bold">Управление данными и состоянием</p>{" "}
            <p>
              Погрузимся в Redux Toolkit, Zustand и TanStack Query — научишься
              хранить, передавать и синхронизировать данные между компонентами
            </p>
          </div>
          <div className="flex flex-col gap-[38px]">
            {" "}
            <p className="font-bold">Next.js и архитектура</p>{" "}
            <p>
              Next.js и архитектура Разберёшься, как устроен Next.js: роутинг,
              серверный рендеринг, работа с базами и авторизация. Это уровень
              production-ready приложений
            </p>
          </div>
          <div className="flex flex-col gap-[38px]">
            {" "}
            <p className="font-bold">
              Производительность и реальные кейсы
            </p>{" "}
            <p>
              Lazy load, оптимизация, кастомные хуки, рефакторинг. Прокачаешь
              код до уровня, с которым не стыдно выйти в прод
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
