/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Upload, Plus, Loader } from "lucide-react";
import { useQuizStore } from "../AuthStore/quizStore";
import logo from "../assets/image/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardPreview from "../components/HomePage/DashboardPreview";
import { motion } from "framer-motion";
import { Brain, Target, Activity, Trophy, Clock } from 'lucide-react';
import Background from "../components/HomePage/Background";
import { useEffect } from "react";
import ActivityItem from "../utils/ActivityItem";

export default function Quiz() {
    const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [mcqCount, setMcqCount] = useState(10);
  const [quizLevel, setquizLevel] = useState("Medium");
  const { userAskQuiz, isLoading, error, recentActivity,activity } = useQuizStore();
  const fileInputRef = useRef(null);
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!prompt.trim()) return;

 const ok = await userAskQuiz({
     prompt,
  number: mcqCount,
  level:quizLevel,
  });
  if (ok) {
    navigate("/mcq");
  }
};
useEffect(()=>{
  activity();
},[]);

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
};
return (
    <div className="min-h-screen flex flex-col items-center justify-center w-screen relative  px-4">
      <img src={logo} className="w-20 h-20 animate-spin mt-10" />
      <div className=" max-w-3xl text-center relative py-10 w-screen px-4  ">
        
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-500 mb-4">
          AI Quiz Generator
        </h1>
         <p className="text-gray-400 mb-8">
          Paste your notes or topic and instantly generate MCQs using AI.
        </p>
     
        <form onSubmit={handleSubmit}  className="space-y-6">

          {/* TEXTAREA + ACTION BAR (GRID) */}
          <div
            className="
              grid grid-rows-[auto_52px]
              bg-gray-900/60 backdrop-blur-xl
              border border-gray-700
              rounded-2xl
              shadow-lg shadow-purple-900/30
              focus-within:ring-2 focus-within:ring-purple-600
            "
          >
            {/* TEXTAREA */}
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px";
              }}
              placeholder="Enter any topic to generate quiz..."
              rows={1}
              className="
                w-full
                min-h-15
                max-h-50
                px-4 pt-4 
                bg-transparent
                text-white text-base sm:text-lg
                resize-none
                outline-none
                rounded-t-2xl
              "
            />

            {/* ACTION BAR (SEPARATE ROW) */}
            <div className="flex items-center justify-between px-3">

              {/* PLUS – MOBILE ONLY */}
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="
                  flex sm:hidden
                  items-center justify-center
                  w-9 h-9
                  rounded-full
                  bg-gray-800 hover:bg-gray-700
                  text-white
                "
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* UPLOAD – PC ONLY */}
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
                  <select
                value={quizLevel}
                onChange={(e) => setquizLevel((e.target.value))}
                className="
                  bg-gray-800 text-white
                  text-sm px-3 py-1.5
                  rounded-lg border border-gray-600
                "
              >
                <option value={"Easy"}>Easy</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Hard"}>Hard</option>
              </select>
              {/* MCQ SELECT – BOTH */}
              <select
                value={mcqCount}
                onChange={(e) => setMcqCount(Number(e.target.value))}
                className="
                  bg-gray-800 text-white
                  text-sm px-3 py-1.5
                  rounded-lg border border-gray-600
                "
              >
                <option value={5}>5 MCQs</option>
                <option value={10}>10 MCQs</option>
                <option value={15}>15 MCQs</option>
                <option value={20}>20 MCQs</option>
                <option value={25}>25 MCQs</option>
                <option value={30}>30 MCQs</option>
                <option value={40}>40 MCQs</option>
                <option value={50}>50 MCQs</option>
              </select>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              className="hidden"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-linear-to-r from-purple-600 to-violet-600 text-white font-semibold cursor-pointer hover:opacity-80 hover:scale-104"
          >
            {isLoading ? "Generating..." : "Generate Quiz"}
          </button>
        </form>
                
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
                 
      </div>
      <div className="w-screen relative">
        <section className="py-12 relative  z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                     <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="glass rounded-2xl p-6 border border-white/10"
>
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl font-bold text-white flex items-center gap-2">
      <Activity className="w-5 h-5 text-purple-400" />
      Recent AI Quiz Activity
    </h3>
  </div>

  <div className="space-y-1">
    {recentActivity.length === 0 ? (
      <p className="text-gray-400 text-sm">No recent activity</p>
    ) : (
      recentActivity.map((quiz) => {
        const accuracy =
          quiz.totalQuestions > 0
            ? Math.round(
                (quiz.totalCorrected / quiz.totalQuestions) * 100
              )
            : 0;

        return (
          <ActivityItem
            key={quiz._id}
            quizId={quiz._id}
            title={quiz.title}
            time={timeAgo(quiz.createdAt)}
            level = {quiz.level}
            score={accuracy}
          />
        );
      })
    )}
  </div>
</motion.div>
</section>
               
      </div>
    </div>
  );
}
