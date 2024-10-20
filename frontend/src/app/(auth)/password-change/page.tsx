"use client";

import { usePasswordChange } from "@/hooks/usePasswordChange";
import { FormEventHandler, useState } from "react";

const PassworChangedPage = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { passwordChange } = usePasswordChange();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await passwordChange(password, newPassword, passwordConfirm);
  };

  return (
    <div className="flex flex-col items-center gap-16 p-16">
      <h1 className="text-4xl">PassworChangedPage</h1>

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
        {/* newPassword */}
        <div className="flex flex-col gap-1">
          <label htmlFor="">newPassword</label>
          <input
            type="password"
            className="border-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
export default PassworChangedPage;
