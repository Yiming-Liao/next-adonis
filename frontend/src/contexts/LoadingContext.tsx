"use client";

import Loading from "@/components/Loading";
import { createContext, useContext, useState, ReactNode, FC } from "react";

// 定義 LoadingContext 的型別
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// 創建 LoadingContext
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// LoadingProvider 組件
export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <Loading isLoading={isLoading} />
    </LoadingContext.Provider>
  );
};

// 自定義 Hook 用於使用 LoadingContext
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
