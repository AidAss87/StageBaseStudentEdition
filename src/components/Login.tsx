"use client";
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm"; // Import your Register form component
import { sendEmail } from "@/helpers/mailer";

export const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

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

        <div className="mt-6  overflow-hidden">
          <div
            className={`${
              showRegister ? "hidden" : "block"
            } animate-switch-form`}
          >
            <p className="text-base">
              Добро пожаловать!
              <br /> Войдите в свой аккаунт, чтобы получить новые знания
            </p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
          <div
            className={`${
              showRegister ? "block" : "hidden"
            } animate-switch-form`}
          >
            <p className="text-base">Регистрация в системе</p>
            <div className="mt-6">
              <RegisterForm setShowRegister={setShowRegister} />
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm">
          {showRegister ? (
            <p>
              Уже есть аккаунт?{" "}
              <button
                onClick={() => setShowRegister(false)}
                className="text-blue-500 underline"
              >
                Войти
              </button>
            </p>
          ) : (
            <p>
              Нет аккаунта?{" "}
              <button
                onClick={() => setShowRegister(true)}
                className="text-blue-500 underline"
              >
                Зарегистрируйтесь
              </button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
