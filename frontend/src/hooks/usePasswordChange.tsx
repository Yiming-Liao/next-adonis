import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios

export const usePasswordChange = () => {
  const axios = useAxios(); // 獲取 Axios 實例

  const passwordChange = async (
    password: string,
    newPassword: string,
    newPasswordConfirm: string
  ) => {
    const response = await axios.post("/user/auth/password-change", {
      password,
      newPassword,
      newPasswordConfirm,
    });
    console.log(response);
  };

  return { passwordChange };
};
