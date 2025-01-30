"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="max-w-max w-full">
        <CardHeader>
          <CardTitle className="text-center text-4xl">
            Верификация Email
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Подтверждение вашего email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {token ? (
            <p className="text-center text-sm text-gray-700">Token: {token}</p>
          ) : (
            <Alert className="bg-yellow-100 text-yellow-800">
              <AlertDescription>Токен не найден.</AlertDescription>
            </Alert>
          )}

          {verified && (
            <div className="text-center space-y-2">
              <Alert className="bg-green-100 text-green-800">
                <AlertDescription>Email успешно подтвержден!</AlertDescription>
              </Alert>
              <Link href="/signin">
                <Button variant="default" className="w-full">
                  Перейти к входу
                </Button>
              </Link>
            </div>
          )}

          {error && (
            <div className="text-center space-y-2">
              <Alert className="bg-red-100 text-red-800">
                <AlertDescription>Произошла ошибка: {error}</AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
