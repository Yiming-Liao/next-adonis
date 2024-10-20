import { useAxios } from "@/contexts/AxiosContext";

export const useEmailVerify = () => {
  const axios = useAxios();

  const emailVerify = async (emailVerifyToken: string | null) => {
    const response = await axios.post("/user/auth/email-verify", {
      emailVerifyToken,
    });

    if (response) {
      return response.status === 200;
    }

    return false;
  };

  return { emailVerify };
};
