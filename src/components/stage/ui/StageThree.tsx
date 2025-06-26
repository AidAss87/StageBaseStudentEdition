export const StageThree = () => (
  <div className=" w-full h-full">
    <div className="flex flex-col pt-[43px] pl-[51px] pr-[39px] gap-[50px]">
      <div className="flex items-center gap-[201px] bg-[#595858] w-[1106px] h-[130px] rounded-[20px] pt-[29px] pl-[27px] pb-[29px]">
        <div className="flex flex-col w-[494px] h-[72px] text-[25px] text-white font-manrope font-normal ">
          <p>ТРЕТИЙ ЭТАП -</p>
          <p>САМЫЙ ИНТЕНСИВНЫЙ</p>
        </div>
        <div className="flex gap-[8px] bg-[#FFFFFF] w-[216px] h-[49px] rounded-[15px] items-center justify-center text-[20px] font-manrope font-normal">
          начать изучение{" "}
          <img src="/Arrow.svg" alt="Стрелочка" width={15} height={15} />
        </div>
      </div>
      <div className="flex gap-[40px]">
        <div
          className="flex flex-col gap-[282px] w-[269px] h-[553px] pt-[31px] rounded-[20px] "
          style={{
            background:
              "linear-gradient(to right, rgba(255, 60, 82, 0.1), rgba(255, 60, 82, 0.1))",
          }}
        >
          <div className="flex flex-col w-[269px] h-[64px] pl-[31px] text-[20px]">
            <p>Попробовать </p>
            <p> изучать с ментором</p>
          </div>
          <div
            style={{
              backgroundImage: "url('/second-student-pic.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "100%", // задайте ширину
              height: "200px",
            }}
          ></div>
        </div>{" "}
        <div className="flex flex-col space-y-4 font-manrope">
          <div className="flex space-x-4 ">
            {" "}
            <div className=" flex flex-col w-[389px] h-[265px] pt-[32px] pl-[27px] gap-[80px] pr-[12px] bg-[#FFFFFF5E] rounded-[20px] flex-1 ">
              <p className="font-medium">Комроненты и структура</p>
              <p className="font-light text-[16px]">
                Cоберешь интерфейс из переиспользуемых компонентов, как
                конструктор. Начинаем с баз: JSX, пропсы и файловая структура
              </p>
            </div>
            <div className="flex flex-col w-[389px] h-[265px] pt-[32px] pl-[27px] gap-[80px] bg-[#FFFFFF5E] pr-[12px] rounded-[20px] flex-1">
              <p className="font-medium">Состояние и взаимодействие</p>
              <p className="font-light text-[16px]">
                Научишься управлять состоянием, отслеживать ввод, переключать
                режимы и обновлять интерфейс без перезагрузки
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col w-[389px] h-[265px] pt-[32px] pl-[27px] gap-[80px] bg-[#FFFFFF5E] pr-[12px] rounded-[20px] flex-1">
              <p className="font-medium">Практика и архитектура</p>
              <p className="font-light text-[16px]">
                Освоишь модули CSS, Tailwind, разделение логики и представления,
                приёмы компонентной архитектуры
              </p>
            </div>{" "}
            <div className="flex flex-col w-[389px] h-[265px] pt-[32px] pl-[27px] gap-[80px] bg-[#FFFFFF5E] pr-[12px] rounded-[20px] flex-1">
              {" "}
              <p className="font-medium">Инструменты и организация </p>
              <p className="font-light text-[16px]">
                Настроишь сборку с Webpack, подключишь ESLint, Prettier.
                Научишься использовать devtools React, изолировать UI-кейсы
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
