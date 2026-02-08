/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Target, User } from "lucide-react";
import { useQuizStore } from "../AuthStore/quizStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../AuthStore/Store";

const UserSnapshot = ({ onChangeGoal }) => {
  const navigate = useNavigate();
  const {
    userStreak,
    Streak,
    totalCorrected,
    totalQuestionsGenerated,
    fetchStat,
    weeklyGoal,
    fetchWeeklyGoal,
    weeklyCompleted,
  } = useQuizStore();

  const { user,profilePic,isLoading } = useAuthStore();

  const averageAccuracy =
    totalQuestionsGenerated > 0
      ? Math.round((totalCorrected / totalQuestionsGenerated) * 100)
      : 0;

  useEffect(() => {
    userStreak();
  }, []);

  useEffect(() => {
    fetchStat();
  }, []);

  useEffect(() => {
    fetchWeeklyGoal();
  }, []);
  useEffect(()=>{
    profilePic();
  },[]);

  const getSkillLevel = (accuracy) => {
    if (accuracy >= 75) return "Pro";
    if (accuracy >= 45) return "Intermediate";
    return "Beginner";
  };

  const skill = getSkillLevel(averageAccuracy);

  const cappedWeeklyCompleted = Math.min(weeklyCompleted, weeklyGoal);
  const progress = Math.min(
    (cappedWeeklyCompleted / weeklyGoal) * 100,
    100
  );

  const skillColor = {
    Beginner: "bg-red-500/20 text-red-400",
    Intermediate: "bg-yellow-500/20 text-yellow-400",
    Pro: "bg-green-500/20 text-green-400",
  };

 const isGoalCompleted =
  weeklyGoal > 0 && weeklyCompleted >= weeklyGoal;
  const { width, height } = useWindowSize();

  // ✅ TOAST STATE
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isGoalCompleted) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isGoalCompleted]);

  return (
    <div className="
      h-full w-full p-6 rounded-2xl
      glass
      border border-white/10 shadow-xl
      flex flex-col gap-10
    ">

      {/* 🎊 CONFETTI */}
      <AnimatePresence>
        {isGoalCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <Confetti
              width={width}
              height={height}
              numberOfPieces={250}
              gravity={0.35}
              recycle={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟢 TOAST */}
      <AnimatePresence>
        {(showToast &&  isGoalCompleted)&&(
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 z-50 px-4 py-2 rounded-xl bg-green-600/90 text-white font-semibold shadow-lg"
          >
            🎉 Weekly goal completed! Set a new one
          </motion.div>
        )}
      </AnimatePresence>

      {/* User */}
      <div className="flex items-center gap-4">
        <div className="w-15 h-15 rounded-full overflow-hidden bg-purple-700/40 cursor-pointer hover:opacity-90">
  <img
    src={
      user?.profilePic ||
      user?.avatar ||
     "/defaultAvatar.png"
    }
    alt="profile"
    className="w-full h-full object-cover"
  />
</div>
        <div>
          <p className="text-lg font-semibold text-white">{user.name}</p>
          <span className={`text-xs px-3 py-1 rounded-full ${skillColor[skill]}`}>
            {skill}
          </span>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-3">
        <Flame className="text-orange-400" />
        <p className="text-white">
          <span className="font-semibold">{Streak} day streak</span>
        </p>
      </div>

      {/* Goal */}
      <div>
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Weekly Goal</span>
          <span>{cappedWeeklyCompleted}/{weeklyGoal}</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-linear-to-r from-violet-500 to-purple-600"
          />
        </div>
        <div className="flex flex-col items-end mt-2">
          <button
            onClick={onChangeGoal}
            className="py-2 px-2 border border-violet-400 rounded-xl font-bold cursor-pointer"
          >
            {isGoalCompleted ? "Set New Goal" : "Change"}
          </button>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate("/ai-quiz")}
        className="
        mt-auto py-3 rounded-xl
        bg-linear-to-r from-violet-600 to-purple-700
        text-white font-semibold
        hover:opacity-80 transition
        cursor-pointer
      "
      >
        Continue Learning 🚀
      </button>
    </div>
  );
};

export default UserSnapshot;