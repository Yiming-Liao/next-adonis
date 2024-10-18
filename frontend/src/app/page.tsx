"use client";
import axios from "axios";

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3333/user/login", {
      email: "max@ime.test",
      password: "123456789123",
    });
    console.log(response);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleSubmit}>
        <button>Click</button>
      </form>
    </div>
  );
}
