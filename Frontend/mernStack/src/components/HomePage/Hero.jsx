/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative w-screen  pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pb-20 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-purple-500/30 text-purple-300 text-sm mb-6"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Next-Gen Learning Experience</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    <span className="block text-white">Unlock Your Potential with</span>
                    <span className="block text-gradient mt-2">AI-Powered Quiz Verification</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    Generate smart quizzes, track your progress, and master any subject with our advanced AI learning platform. Personalized insights for faster growth.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <button
                        onClick={()=>{
                            navigate("/ai-quiz")
                        }}
                        className="px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        Start AI Quiz
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button onClick={()=>{
                            navigate("/feature")
                        }}  className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer">
                        Explore Features
                    </button>
                </motion.div>
            </div>

            {/* Background decoration elements could go here if inline, keeping clean for now */}
        </section>
    );
};

export default Hero;
