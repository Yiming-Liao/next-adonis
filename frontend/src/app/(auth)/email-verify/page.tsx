/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useEmailVerify } from "@/hooks/useEmailVerify";
import { useRouter } from "next/navigation";

const EmailVerifyPage = () => {
  const { emailVerify } = useEmailVerify();

  const searchParams = useSearchParams();
  const emailVerifyToken = searchParams.get("emailVerifyToken"); // 獲取 URL 中的 emailVerifyToken
  const router = useRouter();

  const verifyEmailImmediately = async () => {
    const isEmailVerified = await emailVerify(emailVerifyToken);

    if (isEmailVerified) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    verifyEmailImmediately();
  }, []);

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">EmailVerifyPage</h1>
    </div>
  );
};
export default EmailVerifyPage;
