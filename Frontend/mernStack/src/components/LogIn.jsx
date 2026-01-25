import React, { useEffect } from 'react'
import { Loader, Lock, LogIn, Mail } from "lucide-react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../AuthStore/Store';
const Formm = () => {
  const {clearError} = useAuthStore();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const {login,Logingerror,isLoading} = useAuthStore();
  const navigate = useNavigate();

   useEffect(()=>{
      clearError();
    },[])

  const handleLogIn = async(e)=>{
      e.preventDefault();
      const res = await login(Email,Password);
      if(res){
        navigate("/");
      }
  };
  return (
     <div
    className="w-130 flex flex-col gap-8 p-6
    rounded-2xl border border-purple-800/40
    bg-linear-to-br from-purple-950 to-gray-900
    shadow-[0_0_60px_rgba(147,51,234,0.25)]
    animate-fade-scale"
  >
    {/* Header */}
    <div className="flex items-center justify-center flex-col gap-2">
      <div
        className="w-24 h-24 rounded-full flex justify-center items-center
        bg-linear-to-r from-purple-600 to-violet-600 shadow-lg"
      >
        <LogIn size={60} color="#ffffff" strokeWidth={2.5} />
      </div>

      <h2
        className="bg-linear-to-r from-purple-400 to-violet-400
        bg-clip-text text-transparent text-3xl font-bold"
      >
        Welcome Back
      </h2>

      <h3 className="text-gray-400 text-base">
        Sign in to your account to continue
      </h3>
    </div>

    {/* Form */}
    <form onSubmit={handleLogIn} className="flex flex-col gap-5">
      {/* Email */}
      <div>
        <label className="text-gray-300 font-semibold mb-1 block">
          Email
        </label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            type="email"
            placeholder="you@example.com"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl
              bg-gray-950/70 border border-purple-800/40
              text-gray-200 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-gray-300 font-semibold mb-1 block">
          Password
        </label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            type="password"
            placeholder="••••••••"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 rounded-xl
              bg-gray-950/70 border border-purple-800/40
              text-gray-200 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
      </div>

      {/* Error */}
      {Logingerror && (
        <p className="text-red-500 font-medium text-sm">
          {Logingerror}
        </p>
      )}

      {/* Remember / Forgot */}
      <div className="flex justify-between items-center text-sm">
        <label className="flex gap-2 items-center text-gray-400">
          <input type="checkbox" className="accent-purple-600" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="text-violet-400 hover:text-violet-300 transition"
        >
          Forgot password?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`flex gap-3 text-lg w-full items-center justify-center
        p-4 rounded-2xl
        bg-linear-to-r from-purple-600 to-violet-600
        text-white font-semibold
        transition-transform duration-200
        hover:scale-[1.02] active:scale-[0.97]
        hover:from-green-500 hover:to-emerald-700 cursor-pointer
        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isLoading ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : (
          <>
            <LogIn size={22} />
            Sign In
          </>
        )}
      </button>
    </form>

    {/* Footer */}
    <div className="flex justify-center items-center gap-1 text-sm">
      <span className="text-gray-400">Don’t have an account?</span>
      <Link
        to="/signup"
        className="text-violet-400 hover:text-violet-300 transition"
      >
        Sign up
      </Link>
    </div>
  </div>
  )
}

export default Formm;
