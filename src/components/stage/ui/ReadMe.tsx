export const ReadMe = () => (
  <div>
    <div className="flex flex-col pl-[44px] gap-[39px]">
      <div className="flex flex-col gap-[58px] ">
        <div>
          <div className="flex gap-[70px] w-[1150px] h-[222px] pr-[40px] bg-[#595858] rounded-[20px] text-white text-2xl font-light  pl-[30px]">
            <div className=" flex flex-col justify-center w-[396px] h-[222px] pt-[38px] text-[55px]  pb-[45px] pl-[47px] font-manrope font-bold gap-[20px]">
              <p>FRONTEND</p>
              <p>разработка</p>
            </div>
            <div className="flex flex-col justify-center  w-[538px] font-raleway font-light">
              <p>Добро пожаловать</p> <p>на интерактивный учебник от БИТКЭМП</p>
            </div>
          </div>
        </div>
        <div className="flex gap-[35px] ">
          <div className="flex flex-col bg-opacity-50 pt-[37px] pl-[29px] gap-[44px] w-[393px] h-[283px] bg-[#F6F6F6] rounded-[20px] font-raleway">
            <div className="flex gap-[50px] ">
              <p className=" text-[28px] font-medium text-[#272727]">
                ЧТО ВНУТРИ
              </p>
              <div>
                <img src="/Arrow.svg" alt="Стрелочка" width={25} height={25} />
              </div>
            </div>

            <div className="w-[311px] h-[150px] flex items-center">
              <ul className="text-[24px] text-[#595858]">
                <li>- интерактивные задания</li>
                <li>- домашки и лекции</li>
                <li>- личный кабинет</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col bg-opacity-50 pt-[37px] pl-[29px] gap-[44px] w-[520px] h-[283px] bg-[#F6F6F6] rounded-[20px] font-raleway">
            <div className="flex gap-[180px] ">
              <p className=" text-[28px] font-medium text-[#272727]">
                ИСПОЛЬЗУЙ
              </p>
              <div>
                <img src="/Arrow.svg" alt="Стрелочка" width={25} height={25} />
              </div>
            </div>

            <div className="h-[150px] flex items-center">
              <ul className="text-[24px] text-[#595858]">
                <li>- для самостоятельнгого изучения</li>
                <li>- в качестве дополнения к текущему</li>
                <li>- как гайдлайн для преподавания</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex pl-[44px] gap-[100px]">
        <div className="flex pt-[30px] bg-opacity-50  w-[663px] h-[215px]  rounded-[20px] font-raleway">
          <div className="flex flex-col gap-[20px]">
            <p className="font-raleway text-[24px]">
              Доступ к лекциям, заданиям и сообществу{" "}
            </p>
            <div className="flex w-[275px] h-[62px] border-[2px] bg-[#745DCD]  justify-center items-center rounded-[20px] text-white text-[24px]">
              всё в одном месте
            </div>
            <p className="text-[#8F8E8E]">
              листай вниз чтобы узнать об обучении
            </p>{" "}
          </div>{" "}
        </div>
        <div className="absolute top-[525px] right-10 z-10">
          <img src="/bc-man.svg" width="250" height="250" alt="" />
        </div>
      </div>
    </div>
  </div>
);
