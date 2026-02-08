/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, title, value, subtext, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)",
      }}
      className="glass p-4 rounded-2xl relative overflow-hidden group border border-white/10"
    >
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-15 h-15 rounded-lg bg-white/10 flex items-center justify-center mb-4 text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-colors duration-300">
          {Icon && <Icon className="w-6 h-6" />}
        </div>

        <h3 className="text-gray-400 lg:text-sm font-medium mb-1 text-[10px]">
          {title}
        </h3>

        <div className="lg:text-3xl text-[25px] font-bold text-white mb-2">
          {value}
        </div>

        <p className="text-xs text-purple-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {subtext}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;