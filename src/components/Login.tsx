import React from "react";
import { LoginForm } from "./LoginForm";
// import background from "../../public/assets/images/signIn/background.gif";

export const Login = () => {
  return (
    <section
      className={`pixel-q relative max-h-[580px] h-full max-w-[580px] w-full bg-accent bg-login-bg bg-cover bg-center animate-login overflow-hidden `}
    >
      <img
        className="pixel-q absolute animate-truck bottom-[90px] left-[-191px] w-[192px] h-[98px]"
        src="/assets/images/signIn/track.png"
        alt="truck"
      />
      <img
        className="pixel-q absolute w-[580px] bottom-0"
        src="/assets/images/signIn/front.png"
        alt="road"
      />
      <div className="max-w-[380px] h-full bg-accent py-16 px-11 animate-card z-10 relative">
        <h2 className="text-3xl font-bold">БИТ КЭМП</h2>
        <p className="mt-6 text-base">
          Добро пожаловать! Войдите в свой <br />
          аккаунт, чтобы получить <br />
          новые знания
        </p>
        <div className="h-52 mt-14 ">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};
