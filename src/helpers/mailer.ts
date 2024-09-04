"use server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const sendEmail = async ({ email, emailType, id }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcrypt.hash(id.toString(), 10);

    if (emailType === "VERIFY") {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      auth: {
        user: "info@bit-camp.ru",
        pass: "yAHuxUJFtiex3iykmrXj",
        //TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
      from: "info@bit-camp.ru",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333333;
        }
        .content {
            text-align: center;
            font-size: 16px;
            line-height: 1.6;
            color: #666666;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #999999;
        }
    </style>
    <div class="container">
        <div class="header">
            <h1>Подтвердите вашу почту</h1>
        </div>
        <div class="content">
            <p>Спасибо за регистрацию! Пожалуйста, нажмите на кнопку ниже, чтобы подтвердить ваш адрес электронной почты.</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="button">Подтвердить почту</a>
            <p>Или вставьте ссылку в браузере <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>
        </div>
        <div class="footer">
            <p>Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>
        </div>
    </div>`
          : `<style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333333;
        }
        .content {
            text-align: center;
            font-size: 16px;
            line-height: 1.6;
            color: #666666;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #FF5733;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #999999;
        }
    </style>
    <div class="container">
        <div class="header">
            <h1>Восстановление пароля</h1>
        </div>
        <div class="content">
            <p>Вы запросили восстановление пароля. Пожалуйста, нажмите на кнопку ниже, чтобы установить новый пароль.</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="button">Сбросить пароль</a>
        </div>
        <div class="footer">
            <p>Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.</p>
        </div>
    </div>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
