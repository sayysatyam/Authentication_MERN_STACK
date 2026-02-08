import React from "react";
import { Brain, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
  
const ActivityItem = ({ quizId,title, time, level, score }) => {
    const navigate = useNavigate();
  const getColor = (level) => {
  if (level==="Easy") return "text-green-500";
  if (level==="Medium") return "text-yellow-500";
  return "text-red-500";
};
const getScoreColor = (score) => {
  if (score<40) return "text-red-500";
  if (score<70) return "text-yellow-500";
  return "text-green-500";
};
  return (
    <div onClick={() => navigate(`/quiz-review/${quizId}`)}
     className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer ">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Brain className="w-4 h-4 text-blue-400" />
        </div>

        <div>
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {time} <span className={`${getColor(level)}`}>{level}</span>
          </p>
          
        </div>
      </div>

      <div className="text-right">
        <span className={`text-sm font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>
    </div>
  );
};

export default ActivityItem;

