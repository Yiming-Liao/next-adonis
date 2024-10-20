import { useAuth } from "@/contexts/AuthContext";
import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios
import { appConfig } from "@/config/appConfig";

export const useRegister = () => {
  const axios = useAxios(); // 獲取 Axios 實例
  const { setUser } = useAuth();

  const register = async (
    fullName: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    const response = await axios.post("/user/auth/register", {
      fullName,
      email,
      password,
      passwordConfirm,
    });

    if (response) {
      const { userData } = response.data;

      // 設置 context 用戶狀態
      setUser(userData);

      // 設置 localStorage 儲存 userDATA
      localStorage.setItem(
        appConfig.STORAGE_KEY_USER_DATA,
        JSON.stringify(userData)
      );
    }
  };

  return { register };
};
