import React, { useEffect, useState } from "react";
import lock_main from "../assets/image/lock_main.png";
import { Loader, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../AuthStore/Store";
import toast from "react-hot-toast";
const ForgotPassword = () => {
  const { forgetPassword, forgotPasserror, isLoading, clearError } = useAuthStore();
  const [forgotEmail, setForgotEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, []);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!forgotEmail) {
      setLocalError("Please enter a valid email");
      return;
    }

    setLocalError("");
    const response = await forgetPassword(forgotEmail);
    if (response) {
      toast.success("Reset Link Sent Successfully 🎉")
      navigate("/after-forgotpass");
    }
  };

  return (
    <div
      className="
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        flex flex-col
        p-5 sm:p-6
        gap-6 sm:gap-8
        rounded-2xl border border-purple-800/40
        bg-linear-to-br from-purple-950 to-gray-900
        shadow-[0_0_60px_rgba(147,51,234,0.25)]
        animate-fade-scale
      "
    >
      <div className="flex justify-center items-center">
        <img
          className="h-40 sm:h-64 md:h-80 object-contain"
          src={lock_main}
          alt="Forgot Password"
        />
      </div>

      <div className="text-center flex flex-col gap-2">
        <h1
          className="
            text-2xl sm:text-3xl md:text-4xl font-bold
            bg-linear-to-r from-purple-400 to-violet-400
            text-transparent bg-clip-text
          "
        >
          Forgot Password
        </h1>

        <h3 className="text-gray-400 text-xs sm:text-sm">
          Enter your email address to receive a reset link
        </h3>
      </div>

      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 sm:gap-5">
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            type="email"
            placeholder="you@example.com"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
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

        {(localError || forgotPasserror) && (
          <p className="text-red-400 font-medium text-sm text-center">
            {localError || forgotPasserror}
          </p>
        )}

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
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
