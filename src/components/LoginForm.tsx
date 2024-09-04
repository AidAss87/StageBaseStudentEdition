"use client";
import { useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import type { FormEventHandler } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/hooks/use-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    const res = await signIn("credentials", {
      name: data.username,
      password: data.password,
      redirect: false,
    });

    if (res && !res.error) {
      console.log("Sign-in response:", res);
      const redirectUrl = callbackUrl;
      console.log("Redirect URL:", redirectUrl);

      window.location.href = redirectUrl;
    } else {
      // Обработка ошибки авторизации
      let errorMessage = "Authentication failed. Please try again.";
      if (res?.error === "user_not_verified") {
        errorMessage =
          "Your account is not verified. Please verify your email.";
      } else if (res?.error === "invalid_password") {
        errorMessage = "Invalid password. Please try again.";
      } else if (res?.error === "user_not_found") {
        errorMessage = "User not found.";
      }
      console.log(errorMessage);
      // Устанавливаем ошибку на уровне формы
      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmit(data);
    toast({
      title: "Добро пожаловать " + data.username,
    });
  }

  const { data: session, status } = useSession();

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-person-fill opacity-50"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="login" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-lock-fill opacity-50"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
