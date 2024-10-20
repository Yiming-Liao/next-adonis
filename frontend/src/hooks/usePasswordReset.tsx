import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const usePasswordReset = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const passwordReset = async (
    passwordResetToken: string | null,
    password: string,
    passwordConfirm: string
  ) => {
    await axios.post("/user/auth/password-reset", {
      passwordResetToken,
      password,
      passwordConfirm,
    });
  };

  return { passwordReset };
};
