"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function GuestWaitingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Доступ ограничен</CardTitle>
          <CardDescription>
            Для доступа к странице нужно сообщить администратору.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>
            Пожалуйста, свяжитесь с администратором для предоставления доступа.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="loader" /> {/* Кастомный спиннер */}
          </div>
        </CardContent>
      </Card>
      <style jsx>{`
        .loader {
          border: 4px solid hsl(var(--muted-foreground));
          border-radius: 50%;
          border-top: 4px solid hsl(var(--card-foreground));
          width: 36px;
          height: 36px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
