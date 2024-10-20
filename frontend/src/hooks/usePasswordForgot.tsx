import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const usePasswordForgot = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const passwordForgot = async (email: string) => {
    await axios.post("/user/auth/password-forgot", { email });
  };

  return { passwordForgot };
};
