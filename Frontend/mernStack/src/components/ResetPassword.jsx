import React, { useEffect, useState } from "react";
import { Loader, Lock } from "lucide-react";
import keyIcon from "../assets/image/keyIcon.png";
import PasswordStrengthMeter from "./PasswordStrenght";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../AuthStore/Store";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    resetpassword,
    error,
    isLoading,
    verifyresettoken,
    verifyLoading,
  } = useAuthStore();

  /* =======================
     VERIFY RESET TOKEN
  ======================= */
  useEffect(() => {
    if (token) {
      verifyresettoken(token);
    }
  }, [token, verifyresettoken]);

  /* =======================
     LOADING STATE
  ======================= */
  if (verifyLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loader className="h-10 w-10 animate-spin text-violet-500" />
      </div>
    );
  }

  /* =======================
     INVALID / EXPIRED TOKEN
  ======================= */
  if (error) {
    return (
      <div
        className="w-130 p-8 text-center
        rounded-2xl border border-purple-800/40
        bg-linear-to-br from-purple-950 to-gray-900
        shadow-[0_0_60px_rgba(147,51,234,0.25)]
        animate-fade-scale"
      >
        <h2 className="text-2xl font-bold text-red-400">
          Invalid or Expired Link
        </h2>

        <p className="text-gray-400 mt-2">{error}</p>

        <button
          onClick={() => navigate("/forgot-password")}
          className="flex gap-3 mt-6 w-full items-center justify-center
          p-4 rounded-2xl
          bg-linear-to-r from-purple-600 to-violet-600
          text-white font-semibold
          transition-transform duration-200
          hover:scale-[1.02] active:scale-[0.97]
          hover:from-purple-500 hover:to-violet-500"
        >
          Request New Link
        </button>
      </div>
    );
  }

  /* =======================
     SUBMIT NEW PASSWORD
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await resetpassword(token, password);
    if (success) {
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  /* =======================
     MAIN UI
  ======================= */
  return (
    <div
      className="w-130 flex flex-col p-6 gap-6
      rounded-2xl border border-purple-800/40
      bg-linear-to-br from-purple-950 to-gray-900
      shadow-[0_0_60px_rgba(147,51,234,0.25)]
      animate-fade-scale"
    >
      {/* Icon */}
      <div className="flex justify-center items-center">
        <img
          className="h-56 object-contain"
          src={keyIcon}
          alt="Reset Password"
        />
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-1">
        <h2
          className="text-4xl font-bold
          bg-linear-to-r from-purple-400 to-violet-400
          text-transparent bg-clip-text"
        >
          Reset Password
        </h2>
        <h3 className="text-gray-400 text-sm">
          Enter your new password to continue
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Password Input */}
        <div className="relative">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="peer w-full pl-10 pr-4 py-4 rounded-xl
            bg-gray-950/70 border border-purple-800/40
            text-gray-200 placeholder-transparent
            focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />

          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2
            text-gray-400 transition-colors duration-200
            peer-focus:text-purple-500
            peer-not-placeholder-shown:text-purple-500"
            size={22}
          />

          <label
            htmlFor="password"
            className="absolute left-10 top-1/2 -translate-y-1/2
            bg-gray-900 px-1 text-gray-400 text-[20px]
            transition-all duration-200 cursor-text
            peer-focus:top-px peer-focus:text-xs peer-focus:text-purple-500
            peer-not-placeholder-shown:top-px
            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-purple-500"
          >
            Enter new password
          </label>
        </div>

        <PasswordStrengthMeter password={password} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`flex gap-3 w-full items-center justify-center
          p-4 rounded-2xl text-lg
          bg-linear-to-r from-purple-600 to-violet-600
          text-white font-semibold
          transition-transform duration-200
          hover:scale-[1.02] active:scale-[0.97]
          hover:from-green-500 hover:to-emerald-700 cursor-pointer
          ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            "Set Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
