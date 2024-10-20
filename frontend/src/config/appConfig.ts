export const appConfig = {
  BACKEND_URL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "MyNextApp",
  STORAGE_KEY_USER_DATA:
    process.env.NEXT_PUBLIC_STORAGE_KEY_USER_DATA || "MyNextApp-USER-DATA", //  local storage 儲存用戶資料的 名稱  key
  STORAGE_KEY_ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_STORAGE_KEY_ACCESS_TOKEN || "MyNextApp-API-TOKEN", //  local storage 儲存用戶資料的 名稱  key
};
