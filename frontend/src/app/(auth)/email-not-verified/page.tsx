"use client";

import { useEmailVerifyResend } from "@/hooks/useEmailVerifyResend";
import { FormEventHandler } from "react";

const EmailNotVerifiedPage = () => {
  const { emailVerifyResend } = useEmailVerifyResend();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await emailVerifyResend("/user/auth/email-verify-resend");
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">EmailNotVerifiedPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        <h1>Send Again</h1>
        <button>Resend Verification Email</button>
      </form>
    </div>
  );
};
export default EmailNotVerifiedPage;
