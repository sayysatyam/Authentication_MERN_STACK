/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/purity */
import React, {  useEffect } from 'react'
import { Activity } from "lucide-react";
import { useQuizStore } from '../AuthStore/quizStore'
import ActivityItem from '../utils/ActivityItem';
import { motion } from "framer-motion";
const History = () => {
    const{history,quizhistory,}=useQuizStore();

    useEffect(()=>{
        history();
    },[]);

    const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
};
  return (
    <div className='py-20 w-full relative bottom-10  '>
      <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="glass rounded-2xl p-6 border border-white/10 h-200 overflow-auto"
>
  <div className="flex items-center justify-between ">
    <h3 className="text-xl font-bold text-white flex items-center gap-2">
      <Activity className="w-5 h-5 text-purple-400" />
      AI Quiz Activity
    </h3>
  </div>

  <div className="space-y-1">
  {!Array.isArray(quizhistory) || quizhistory.length === 0 ? (
    <p className="text-gray-400 text-sm">No recent activity</p>
  ) : (
    quizhistory.map((quiz) => {
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
          level={quiz.level}
          score={accuracy}
        />
      );
    })
  )}
</div>
</motion.div>

    </div>
  )
}

export default History
