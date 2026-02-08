/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Brain, Target, Activity, Trophy, Clock,BadgeQuestionMark} from 'lucide-react';
import { useQuizStore } from "../../AuthStore/quizStore";
import { useEffect } from "react";
import StatCard from "../../utils/StatCard";
import ActivityItem from "../../utils/ActivityItem";

const DashboardPreview = () => {
    const {totalCorrected,
      totalQuizzesGenerated, 
      totalQuestionsGenerated, fetchStat,activity,recentActivity }=useQuizStore();
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

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
};
const accuracyRemarks = () => {
  if (accuracy < 30) return "Every expert starts somewhere 🚀";
  if (accuracy < 50) return "You're learning — keep going 💡";
  if (accuracy < 70) return "Nice progress! Stay consistent 🔁";
  if (accuracy < 85) return "Strong performance! You're leveling up 🔥";
  return "Outstanding! You're mastering this 🏆";
};

    return (
        <section className="py-12 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    icon={Brain}
                    title="Total Quizzes Generated"
                    value={totalQuizzesGenerated}
                    subtext="Keep Grind Hard 🔥"
                    delay={0.2}
                />
                <StatCard
                    icon={Target}
                    title="Average Accuracy"
                    value={`${accuracy} %`}
                    subtext={accuracyRemarks()}
                    delay={0.3}
                />
                <StatCard
                    icon={BadgeQuestionMark}
                    title="Total Question Asked"
                    value={totalQuestionsGenerated}
                    subtext="Keep it up!"
                    delay={0.4}
                />
            </div>

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
            title={quiz.title}
             quizId={quiz._id}
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
    );
};

export default DashboardPreview;
