export const StageBegin = () => (
  <div>
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-[165px] pl-[64px]">
        <div className="flex flex-col w-[274px] h-[200px] pt-[70px]">
          <p className="text-[35px]">
            Начни <br /> обучение уже сегодня!
          </p>
        </div>

        <div className="flex flex-col w-[696px] gap-[20px] h-[222px] bg-[#595858] text-[24px] font-raleway font-light rounded-[20px] pl-[45px] pt-[48px] pb-[30px] ">
          <div>
            <p className="text-white">
              Бесплатная регистрация и доступ <br /> к свежайшей базе по
              фронтенд-разработке
            </p>
          </div>
          <div className="flex justify-between pl-[64px] pr-[64px] gap-[8px] bg-[#FFFFFF] w-[357px] h-[62px] rounded-[15px] items-center justify-center text-[20px] font-manrope ">
            <p>начать изучение</p>
            <img src="/Arrow.svg" alt="Стрелочка" width={15} height={15} />
          </div>
        </div>
      </div>
      <div className="h-[139px]" />
      <div className="flex items-center pl-[53px]">
        <div className="flex w-[519px] h-[62px] bg-[#745DCD] justify-center items-center rounded-[20px] text-white text-[24px] font-manrope font-light">
          <p>Понравилось? Изучи курс с ментором </p>{" "}
          <img src="/white-arrow.svg" alt="Стрелочка" width={10} height={10} />
        </div>
      </div>
      <div className="h-[125px]" />
      {/* Три дивa с расстоянием по 28px между ними */}
      <div className="flex items-center space-x-4  ">
        <div className="flex flex-col gap-[74px] w-[364px] h-[286px] bg-[#FFFFFF66] rounded-[20px] pt-[29px] pl-[33px] pr-[33px]">
          <img src="/icons8-clock-48 1.svg" alt="Часы" width={50} height={10} />
          <div>
            <p className="font-manrope font-bold text-[24px]">
              ЕЖЕ
              <span className="text-[#745DCD]">МЕСЯЧНЫЕ</span> <br />
              ОБНОВЛЕНИЯ
            </p>
            <p className="font-manrope font-light text-[16px]">
              Новые фичи, технологии и инструменты, мы постим свежак
            </p>
          </div>
        </div>
        <div className="h-[28px]" />
        <div className="flex flex-col gap-[73px] w-[364px] h-[286px] bg-[#FFFFFF66] rounded-[20px] pt-[29px] pl-[33px]">
          <img src="/operator.svg" alt="Часы" width={50} height={10} />{" "}
          <div>
            <p className="font-manrope font-bold text-[24px]">
              ПОДДЕРЖКА <br />
              ОТ КОММЬЮНИТИ
            </p>
            <p className="font-manrope font-light text-[16px]">
              В случае возникновения сложностей ментор будет рад вам помочь
            </p>
          </div>
        </div>
        <div className="h-[28px]" />
        <div className="flex flex-col gap-[73px] w-[419px] h-[286px] bg-[#FFFFFF66] rounded-[20px] pt-[29px] pl-[33px]">
          <img src="/bag.svg" alt="Часы" width={50} height={10} />
          <div>
            <p className="font-manrope font-bold text-[24px]">
              УНИКАЛЬНЫЕ <br /> КЕЙСЫ
            </p>
            <p className="font-manrope font-light text-[16px]">
              Практические задания, которые <br /> подбираются специально для
              вас
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
