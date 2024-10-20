"use client";

import { FormEventHandler, useState } from "react";
import { useSearchParams } from "next/navigation"; // 使用useSearchParams
import { usePasswordReset } from "@/hooks/usePasswordReset";

const PasswordResetPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { passwordReset } = usePasswordReset();

  const searchParams = useSearchParams();
  const passwordResetToken = searchParams.get("passwordResetToken"); // 獲取 URL 中的 passwordResetToken

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await passwordReset(passwordResetToken, password, passwordConfirm);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">PasswordResetPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        {/* password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">password</label>
          <input
            type="password"
            className="border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* passwordConfirm */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">passwordConfirm</label>
          <input
            type="password"
            className="border-2"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};
export default PasswordResetPage;
