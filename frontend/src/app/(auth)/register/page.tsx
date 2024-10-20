"use client";

import { useRegister } from "@/hooks/useRegister";
import { FormEventHandler, useState } from "react";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { register } = useRegister();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await register(fullName, email, password, passwordConfirm);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">RegisterPage</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4 ">
        {/* fullName */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">FullName</label>
          <input
            type="text"
            className="border-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

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

        {/* confirm password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">confirm password</label>
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
export default RegisterPage;
