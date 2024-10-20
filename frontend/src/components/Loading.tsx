import { FC } from "react";

const Loading: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <div
      className={`fixed top-0 w-screen h-screen ${
        isLoading ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`fixed left-8 bottom-8 size-16 border-4 border-slate-600 animate-spin ${
          isLoading ? "" : "opacity-0"
        } duration-150`}
      ></div>
    </div>
  );
};
export default Loading;
