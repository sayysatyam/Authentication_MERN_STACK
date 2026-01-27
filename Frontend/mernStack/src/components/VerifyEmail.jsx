import React, { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../AuthStore/Store";
import verifyemail from "../assets/image/newVerifyEmail.png";
import toast from "react-hot-toast";
const OTP_LENGTH = 6;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const { verifyEmail, error, isLoading, clearError } = useAuthStore();

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newCode = pasted.split("");
    setCode((prev) => prev.map((_, i) => newCode[i] || ""));

    const focusIndex =
      pasted.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pasted.length;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const otp = code.join("");
    const success = await verifyEmail(otp);

    if (success) {
      toast.success("Email verified successfully ✅");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  return (
    <div
      className="
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        flex flex-col items-center
         px-10 py-10 sm:p-6
        gap-6 sm:gap-8
        rounded-2xl border border-purple-800/40
        bg-linear-to-br from-purple-950 to-gray-900
        shadow-[0_0_60px_rgba(147,51,234,0.25)]
      "
    >
      <div className="flex flex-col items-center text-center gap-2">
        <img
          src={verifyemail}
          alt="Verify Email"
          className="h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64 object-contain"
        />

        <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
          Verify your Email
        </h2>

        <p className="text-gray-400 text-sm sm:text-base">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="flex justify-between gap-2 sm:gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="
                w-10 h-10 sm:w-12 sm:h-12
                text-center text-xl sm:text-2xl font-bold
                bg-gray-950/70 text-gray-200
                border border-purple-800/40 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-purple-600
              "
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex gap-3 w-full items-center justify-center
            py-3 sm:p-4 rounded-2xl
            bg-linear-to-r from-purple-600 to-violet-600
            text-white font-semibold text-base sm:text-lg
            transition hover:scale-[1.02]
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? (
            <Loader className="animate-spin w-6 h-6" />
          ) : (
            "Verify"
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-400 font-medium text-sm text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
