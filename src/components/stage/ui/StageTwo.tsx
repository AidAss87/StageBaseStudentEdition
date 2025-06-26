export const StageTwo = () => (
  <div>
    <div className="flex w-[430px] pt-[43px] pl-[66px] pb-[58px] gap-[154px] ">
      <div className="flex flex-col gap-[103px]">
        <div className="flex flex-col w-[467] h-[130px] text-[32px] font-manrope font-medium pt-[30px]">
          <p>НА ВТОРОМ ЭТАПЕ</p>
          <p>РАЗВИТИЯ НАВЫКОВ</p>
        </div>

        <div
          className="relative w-64 h-64 bg-cover bg-center"
          style={{
            backgroundImage: "url('/student-pic.svg')",
            backgroundSize: "cover", // или 'contain', или конкретные размеры
            width: "470px", // задайте ширину
            height: "513px",
          }}
        ></div>
      </div>

      <div className="flex flex-col gap-[120px]">
        <div className="flex w-[457px] gap-[20px] h-[130px] bg-[#595858] text-[24px] text-white font-raleway font-light rounded-[20px] pl-[45px] pt-[48px] pb-[46px] items-center">
          начать изучение
          <img src="/white-arrow.svg" alt="Стрелочка" width={15} height={10} />
        </div>
        <div className="flex flex-col gap-[30px] w-[467px] font-manrope text-[18px]">
          <div className="flex flex-col gap-[30px]">
            <p className="font-bold">Основы JavaScript</p>
            <p className="font-manrope font-light">
              Научишься писать код, добавлять интерактивность и работать с
              DOM-структурой страницы. Наченшь разбирать TypeScript
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <p className="font-bold">Асинхронность</p>
            <p className="font-manrope font-light">
              Важный элемент! Это как заказ в кофейне: ты заказываешь,
              продолжаешь заниматься своими делами, а когда заказ готов — тебе
              сообщают
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <p className="font-bold">Первые шаги в тестировании и отладке</p>
            <p className="font-manrope font-light">
              Создашь свою первую работающую форму (например, для авторизации)
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
