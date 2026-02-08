import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/auth"
    : "/api/auth";


export const useQuizStore = create((set) => ({
  isLoading: false,
  error: null,
  mcqs: [],
  attempt : [],
  quizId: null,
    score: 0,
  percentage: 0,
  totalCorrected: 0,
  totalQuizzesGenerated: 0,
  totalQuestionsGenerated: 0,
  recentActivity: [],
  recenttenActivity:[],
  quizhistory:[],
  easyLevelQuestion:0,
  mediumLevelQuestion:0,
  hardLevelQuestion:0,
  easyLevelCorrectedQuestion:0,
 mediumLevelCorrectedQuestion:0,
  hardLevelCorrectedQuestion:0,
previousAttempt: [],
Streak:0,
weeklyGoal: 0,
weeklyCompleted: 0,
  userAskQuiz: async ({ prompt, number ,level}) => {
    set({
      isLoading: true,
      error: null,
    
      mcqs: []
    });

    try {
      const response = await axios.post(`${API_URL}/gemini`, {
        prompt,
        number,
        level
      });

      set({
        mcqs: response.data.mcqs,
        isLoading: false,
        quizId: response.data.quizId,
     
      });
      return true;
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.msg ||
        "Something went wrong";

      set({
        error: msg,
        isLoading: false,
       
      });
    }
  },
  calculate : async({quizId,attempt})=>{
    set({
      isLoading: true,
      error: null,
    });
    try {
       const res = await axios.post(
  `${API_URL}/calculate`,
  { quizId, attempt },
);
      set({
        isLoading: false,
      score: res.data.score,
      percentage: res.data.percentage,
})
      return true;
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.msg ||
        "Something went wrong";

      set({
        error: msg,
        isLoading: false,
       
      });
    }
  },
  fetchStat : async()=>{
    set({
      isLoading: true,
      error: null,
    });
    try {
      const res = await axios.get(`${API_URL}/fetchStat`);
      set({
         totalCorrected: res.data.totalCorrectAnswer,
      totalQuizzesGenerated: res.data.totalQuizzesGenerated,
      totalQuestionsGenerated: res.data.totalQuestionsGenerated,
      easyLevelQuestion:res.data.questionByLevel.easy,
      mediumLevelQuestion:res.data.questionByLevel.medium,
      hardLevelQuestion:res.data.questionByLevel.hard,
      easyLevelCorrectedQuestion:res.data.correctByLevel.easy,
      mediumLevelCorrectedQuestion:res.data.correctByLevel.medium,
      hardLevelCorrectedQuestion:res.data.correctByLevel.hard,
      isLoading:false
      });
    } catch (error) {
    const msg =
        error.response?.data?.error ||
        error.response?.data?.msg ||
        "Something went wrong";

      set({
        error: msg,
        isLoading: false,
       
      });
    }
  },
  activity : async()=>{
    try {
    const res = await axios.get(`${API_URL}/recentActivity`);
    set({ recentActivity: res.data });
  } catch (error) {
    const msg =
        error.response?.data?.error ||
        error.response?.data?.msg ||
        "Something went wrong";

      set({
        error: msg,
        isLoading: false,
       
      });
  }
  },
  activityten : async()=>{
    try {
      const res = await axios.get(`${API_URL}/recenttenActivity`);
      set({recenttenActivity : res.data});
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.msg ||
        "Something went wrong";

      set({
        error: msg,
        isLoading: false,
       
      });
    }
  },
  getQuizHistory:async(quizId)=>{
      try {
        set({ isLoading: true });
        const res = await axios.get(`${API_URL}/quiz-history/${quizId}`);
        set({
        previousAttempt: res.data,
        isLoading: false,
      });
      } catch (error) {
        console.error(error);
      set({ isLoading: false });
      }
  },
  userStreak: async () => {
  try {
    const res = await axios.get(`${API_URL}/streak`);

    set({
      Streak: res.data.streak,
      isLoading: false,
    });

  } catch (error) {
    const msg =
      error.response?.data?.error ||
      error.response?.data?.msg ||
      "Something went wrong";

    set({
      error: msg,
      isLoading: false,
    });
  }
},
fetchWeeklyGoal: async () => {
  const res = await axios.get(`${API_URL}/weeklyGoal`);
  set({
    weeklyGoal: res.data.weeklyGoal,
    weeklyCompleted: res.data.weeklyCompleted,
  });
},

setWeeklyGoal: async (goal) => {
  await axios.post(`${API_URL}/weeklyGoal`, { goal });
  set({ weeklyGoal: goal });
},
history : async()=>{
    try {
    const res = await axios.get(`${API_URL}/history`);
    set({ quizhistory: res.data });
  } catch (error) {
    const msg =
        error.response?.data?.error ||
        error.response?.data?.msg ||
        "Something went wrong";

      set({
        error: msg,
        isLoading: false,
       
      });
  }
  },
}));