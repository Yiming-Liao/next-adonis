"use client";

import { usePasswordForgot } from "@/hooks/usePasswordForgot";
import { FormEventHandler, useState } from "react";

const PasswordForgotPage = () => {
  const [email, setEmail] = useState("");
  const { passwordForgot } = usePasswordForgot();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await passwordForgot(email);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">PasswordForgotPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        {/* email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">email</label>
          <input
            type="email"
            className="border-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};
export default PasswordForgotPage;
