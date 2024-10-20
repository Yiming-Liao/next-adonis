import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const useEmailVerifyResend = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const emailVerifyResend = async (email: string) => {
    await axios.post("/user/auth/email-verify-resend", { email });
  };

  return { emailVerifyResend };
};
