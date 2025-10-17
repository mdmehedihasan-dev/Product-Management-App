"use client";
import { useState } from "react";
import { useLoginMutation } from "../store/api";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email).unwrap();
      dispatch(setAuth({ token: res.token, email }));
      router.push("/products"); // redirect after login
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-[#0D1821] p-8 text-center rounded-md shadow-2xl flex flex-col gap-y-5 w-96">
        <h1 className="text-3xl mb-4 text-white"> Product Management App </h1>
        <input
          type="email"
          value={email}
          placeholder="enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded mb-4 bg-[#1A1F23] text-[#EFF1F3]"
          required
        />
        <button type="submit" className="w-full p-2 rounded bg-[#A44A3F] text-white">
          Login
        </button>
      </form>
    </div>
  );
}
