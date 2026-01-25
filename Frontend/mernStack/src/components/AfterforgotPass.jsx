import React from 'react'
import forgotEmail from '../assets/image/Email_New.png'
import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
const AfterforgotPass = () => {
  return (
      <div
    className="w-130 flex flex-col justify-around p-6 gap-8
    rounded-2xl border border-purple-800/40
    bg-linear-to-br from-purple-950 to-gray-900
    shadow-[0_0_60px_rgba(147,51,234,0.25)]
    animate-fade-scale"
  >
    {/* Image */}
    <div className="flex justify-center items-center">
      <img
        className="h-56 object-contain"
        src={forgotEmail}
        alt="Email Sent"
      />
    </div>

    {/* Text */}
    <div className="text-center flex flex-col gap-3">
      <h1
        className="text-4xl font-bold
        bg-linear-to-r from-purple-400 to-violet-400
        text-transparent bg-clip-text"
      >
        Reset link sent
      </h1>

      <div className="flex flex-col gap-1 text-gray-400 text-sm">
        <p>Please check your email.</p>
        <p>
          We’ve sent you a message with a password recovery link.
        </p>
      </div>
    </div>

    <button
      onClick={() => window.open("https://mail.google.com", "_blank")}
      className="flex gap-3 text-lg w-full items-center justify-center
      p-4 rounded-2xl
      bg-linear-to-r from-purple-600 to-violet-600
      text-white font-semibold
      transition-transform duration-200
      hover:scale-[1.02] active:scale-[0.97]
      hover:from-green-500 hover:to-emerald-700 cursor-pointer"
    >
      Open My Email <Mail size={20} />
    </button>

    <div className="flex flex-col justify-center items-center gap-1 text-sm text-gray-400">
      <p>Didn’t receive the email?</p>
      <p>
        Contact us at{" "}
        <Link
          className="text-violet-400 hover:text-violet-300 transition"
          to="https://mail.google.com/mail/?view=cm&fs=1&to=sayysatyam@gmail.com&su=Password%20Reset%20Help&body=Hi,%20I%20didn’t%20receive%20the%20password%20reset%20email."
          target="_blank"
          rel="noopener noreferrer"
        >
          sayysatyam@gmail.com
        </Link>
      </p>
    </div>
  </div>
  )
}

export default AfterforgotPass
