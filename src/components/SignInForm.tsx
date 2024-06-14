"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";



const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      name: formData.get("name"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      console.log("Sign-in response:", res);
      const redirectUrl = callbackUrl;
      console.log("Redirect URL:", redirectUrl);

      window.location.href = redirectUrl;
    } else {
      console.log("Sign-in error:", res);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="border-blue-600 border-2 w-6/12"
        type="text"
        name="name"
        required
      />
      <input
        type="password"
        name="password"
        required
        className="border-blue-600 border-2 w-6/12"
      />
      <button type="submit" className="border-blue-600 border-2 w-6/12">
        Sign In
      </button>
    </form>
  );
};
export { SignInForm };
