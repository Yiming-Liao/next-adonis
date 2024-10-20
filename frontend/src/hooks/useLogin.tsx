import { useAuth } from "@/contexts/AuthContext";
import { useAxios } from "@/contexts/AxiosContext"; // 使用 useAxios
import { appConfig } from "@/config/appConfig";

export const useLogin = () => {
  const axios = useAxios(); // 獲取 Axios 實例
  const { setUser } = useAuth();

  const login = async (email: string, password: string) => {
    const response = await axios.post("/user/auth/login", {
      email,
      password,
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

  return { login };
};
