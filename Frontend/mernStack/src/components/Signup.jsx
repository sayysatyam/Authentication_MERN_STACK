import { useEffect, useState } from "react";
import { CircleUserRound, Lock, LogIn, Mail, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrenght";
import { useAuthStore } from "../AuthStore/Store";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, signupError, isLoading, clearError } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const success = await signup(name, email, password);
    if (success) {
      navigate("/verify-email");
    }
  };

  return (
    <div
      className="
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        flex flex-col gap-6
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
          Get started
        </h2>

        <h3 className="text-gray-400 text-sm sm:text-base text-center">
          Create an account to continue
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 sm:gap-5 mt-2 sm:mt-4">
        {/* Name */}
        <div className="relative">
          <CircleUserRound
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        {/* Email */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
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

        {/* Password */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Error */}
        {signupError && (
          <p className="text-red-400 font-medium text-sm">
            {signupError}
          </p>
        )}

        <PasswordStrengthMeter password={password} />

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
              <LogIn size={20} />
              Sign Up
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="flex justify-center items-center gap-1 mt-4 text-sm text-center">
        <span className="text-gray-400">Already have an account?</span>
        <Link
          to="/login"
          className="text-violet-400 hover:text-violet-300 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
