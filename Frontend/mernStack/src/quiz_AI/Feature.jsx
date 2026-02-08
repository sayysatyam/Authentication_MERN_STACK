/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Brain, Target, Activity, Trophy, Clock,BadgeQuestionMark} from 'lucide-react';
import { useQuizStore } from "../AuthStore/quizStore";
import { useEffect } from "react";
import StatCard from '../utils/StatCard';
import ActivityItem from '../utils/ActivityItem';
import PerformanceGraph from '../utils/PerformanceGraph';
import AccuracyByLevel from '../utils/AccuracyByLevel';
import UserSnapshot from './Preview';

const Feature = () => {
  const {totalCorrected,
      totalQuizzesGenerated, 
      totalQuestionsGenerated, fetchStat,activity,recentActivity,activityten,recenttenActivity, setWeeklyGoal,
  weeklyGoal,          
  fetchWeeklyGoal  }=useQuizStore();


const [showGoalEditor, setShowGoalEditor] = useState(false);
const [goalInput, setGoalInput] = useState(0);
const [maxInputError, setmaxInputError] = useState("");

      const data = Array.isArray(recenttenActivity)
  ? recenttenActivity.map((quiz,index) => {
      const accuracy =
        quiz.totalQuestions > 0
          ? Math.round(
              (quiz.totalCorrected / quiz.totalQuestions) * 100
            )
          : 0;
           
      return {
        date: new Date(quiz.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        score: accuracy,
        xIndex : index+1,
      };
    })
  : [];

const accuracy =
  totalQuestionsGenerated > 0
    ? Math.round((totalCorrected / totalQuestionsGenerated) * 100)
    : 0;
             useEffect(() => {
   fetchStat();
}, []);
useEffect(()=>{
    activity();
},[]);
useEffect(() => {
  activityten();
}, []);
useEffect(() => {
  fetchWeeklyGoal();
}, []);
const openGoalEditor = () => {
  setGoalInput(weeklyGoal);   // ✅ preload
  setShowGoalEditor(true);
};
useEffect(() => {
  if (goalInput > 50) {
    setmaxInputError("Max 50");
  } else if (goalInput < 10 && goalInput !== "") {
    setmaxInputError("Minimum goal is 10");
  } else {
    setmaxInputError("");
  }
}, [goalInput]);

const timeAgo = (date) => {
  // eslint-disable-next-line react-hooks/purity
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
};
const accuracyRemarks = () => {
  if (accuracy < 30) return "keep going 💡 ";
  if (accuracy < 50) return "Stay consistent 🔁";
  if (accuracy < 70) return "Nice progress!";
  if (accuracy < 85) return "Strong performance🔥";
  return "Outstanding! You're mastering this 🏆";
};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1.7fr_0.9fr] gap-10 h-screen px-5 w-full py-20">
  {/* Column 1 */}
  <div className="flex flex-col gap-4 ">
    <div className=" rounded-xl flex-1">
      <UserSnapshot onChangeGoal={openGoalEditor}/>
    </div>
    <div className=" glass rounded-xl  flex-1 ">
      <div className='p-5'>
        <div className='flex items-center relative gap-3'>
        <div className="w-15 h-15 rounded-lg bg-white/10 flex items-center justify-center mb-4 text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-colors duration-300">
          { <Target className="w-6 h-6" />} 
        </div>
        <div className='text-3xl font-bold relative bottom-2'>Accuracy By Level</div>
      </div>
      <div>
        <AccuracyByLevel/>
      </div>
      </div>
    </div>
  </div>


  {/* Column 2 */}
  <div className="flex flex-col gap-4">
    <div className=" rounded-xl flex-1">
      <div className='h-full w-full  '>
        <PerformanceGraph data ={data}/>
      </div>
    </div>
    <div className=" recentActivity rounded-xl flex-1  overflow-auto">
      <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-5 border border-white/10"
    >
      <div className="flex items-center justify-between ">
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
                title={quiz.title}
                 quizId={quiz._id}
                time={timeAgo(quiz.createdAt)}
                level={quiz.level}
                score={accuracy}
              />
            );
          })
        )}
      </div>
    </motion.div>
    </div>
  </div>
 {/* Column 3 */}
  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 mb-20 lg:mb-0 ">
    <div className='rounded-xl flex-1'>
                      <StatCard
                      icon={Trophy}
                      title= "Performance Level"
                      value={accuracy >= 80
                ? "Elite"
                : accuracy >= 60
                ? "Growing"
                : "Beginner"}
                subtext="Based on accuracy"
                delay={0.4}
                      />

                    </div>
    <div className=" rounded-xl flex-1">
      <StatCard
                        icon={Brain}
                        title="Total Quizzes Generated"
                        value={totalQuizzesGenerated}
                        subtext="Keep Grind Hard 🔥"
                        delay={0.2}
                    /></div>
    <div className=" rounded-xl flex-1"><StatCard
                        icon={Target}
                        title="Average Accuracy"
                        value={`${accuracy} %`}
                        subtext={accuracyRemarks()}
                        delay={0.3}
                    /></div>
    <div className=" rounded-xl flex-1"><StatCard
                        icon={BadgeQuestionMark}
                        title="Total Question Asked"
                        value={totalQuestionsGenerated}
                        subtext="Keep it up!"
                        delay={0.4}
                    /></div>
  </div>
  {showGoalEditor && (
  <div onClick={() => setShowGoalEditor(false)} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <div onClick={(e) => e.stopPropagation()}   className="bg-purple-950 border border-white/10 rounded-xl p-6 w-70 lg:w-130 shadow-xl">
      
      <h3 className="text-white text-lg font-semibold mb-4">
        Set Weekly Goal
      </h3>

      <input
        type="number"
        min="10"
        max="50"
        value={goalInput}
        onChange={(e) => setGoalInput(e.target.value)}
        className="w-full p-3 rounded-lg bg-black/40 text-white outline-none border border-white/10 focus:border-purple-500"
      />
        {maxInputError && <p className='text-red-500 '>{maxInputError}</p>}
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setShowGoalEditor(false)}
          className="text-gray-400 hover:text-white"
        >
          Cancel
        </button>

        <button
  disabled={!!maxInputError}
  onClick={async () => {
    if (maxInputError) return;
    await setWeeklyGoal(Number(goalInput));
    setShowGoalEditor(false);
  }}
  className={`
    px-4 py-2 rounded-lg
    ${maxInputError
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-purple-600 hover:bg-purple-700 cursor-pointer"}
    text-white
  `}
>
  Save
</button>
      </div>
    </div>
    
  </div>
)}
</div>
  )
}

export default Feature
