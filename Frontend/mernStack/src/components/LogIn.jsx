import React, { useEffect } from 'react'
import { Eye, EyeClosed, Loader, Lock, LogIn, Mail } from "lucide-react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../AuthStore/Store';
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
const Formm = () => {
  const { clearError } = useAuthStore();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { login, Logingerror, isLoading,googleLogin,isAuthenticated, user } = useAuthStore();
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();


    useEffect(() => {
  if (isAuthenticated && user?.isVerified) {
    navigate("/");
  }
}, [isAuthenticated, user, navigate]);
const handleGoogleSuccess = async (credentialResponse) => {
  const success = await googleLogin(credentialResponse.credential);

  if (success) {
    toast.success("Signed in with Google 🎉");
  }
};
  useEffect(() => {
    clearError();
  }, []);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const res = await login(Email, Password);
    if (res) {
      navigate("/");
    }
  };
   const revielPassword = () => {
  setshowpassword(prev => !prev);
};
  return (
    <div
      className="
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        flex flex-col gap-6 sm:gap-8
        p-5 sm:p-6
        rounded-2xl border border-purple-800/40
        bg-linear-to-br from-purple-950 to-gray-900
        shadow-[0_0_60px_rgba(147,51,234,0.25)]
        animate-fade-scale
      "
    >
      {/* Header */}
      <div className="flex items-center justify-center flex-col gap-2">
        <div
          className="
            w-20 h-20 sm:w-24 sm:h-24
            rounded-full flex justify-center items-center
            bg-linear-to-r from-purple-600 to-violet-600 shadow-lg
          "
        >
          <LogIn size={40} className="sm:hidden text-white" />
          <LogIn size={60} className="hidden sm:block text-white" />
        </div>

        <h2
          className="
            bg-linear-to-r from-purple-400 to-violet-400
            bg-clip-text text-transparent
            text-2xl sm:text-3xl font-bold
          "
        >
          Welcome Back
        </h2>

        <h3 className="text-gray-400 text-sm sm:text-base text-center">
          Sign in to your account to continue
        </h3>
      </div>
      <div className="flex justify-center">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => toast.error("Google login failed")}
  />
</div>

      {/* Form */}
      <form onSubmit={handleLogIn} className="flex flex-col gap-4 sm:gap-5">
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
              className="
                w-full pl-10 pr-4 py-3 sm:py-3.5
                rounded-xl
                bg-gray-950/70 border border-purple-800/40
                text-gray-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-purple-600
              "
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
              type={showpassword  ? "text" : "password"}
              placeholder="••••••••"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full pl-10 pr-12 py-3 sm:py-3.5
                rounded-xl
                bg-gray-950/70 border border-purple-800/40
                text-gray-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-purple-600
              "
              required
            />
            <button type="button" className='cursor-pointer' onClick={revielPassword}>{showpassword ? (<Eye
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />) : (<EyeClosed
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />)}</button>
          </div>
        </div>

        {/* Error */}
        {Logingerror && (
          <p className="text-red-500 font-medium text-sm">
            {Logingerror}
          </p>
        )}

        {/* Remember / Forgot */}
       <div className="flex items-center justify-between gap-2 text-sm">
      <label className="flex gap-2 items-center text-gray-400">
        <input type="checkbox" className="accent-purple-600" />
        Remember me
     </label>

  <Link
       to="/forgot-password"
    className="text-violet-400 hover:text-violet-300 transition whitespace-nowrap"
  >
       Forgot password?
    </Link>
      </div>


        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`flex gap-2 sm:gap-3 text-base sm:text-lg w-full items-center justify-center
            py-3 sm:p-4 rounded-2xl
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
              Log In
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="flex justify-center items-center gap-1 text-sm text-center">
        <span className="text-gray-400">Don’t have an account?</span>
        <Link
          to="/signup"
          className="text-violet-400 hover:text-violet-300 transition"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Formm;
