import { useAuth } from "@/contexts/AuthContext";
import { useAxios } from "@/contexts/AxiosContext";
import { appConfig } from "@/config/appConfig";

export const useLogout = () => {
  const axios = useAxios();
  const { setUser } = useAuth();

  const logout = async () => {
    await axios.post("/user/auth/logout");

    // 清除 context 用戶狀態
    setUser(null);

    // 清除 localStorage 中的 accessToken, userData
    localStorage.removeItem(appConfig.STORAGE_KEY_ACCESS_TOKEN);
    localStorage.removeItem(appConfig.STORAGE_KEY_USER_DATA);
  };

  return { logout };
};
