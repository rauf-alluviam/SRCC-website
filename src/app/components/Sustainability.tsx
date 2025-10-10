"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTruck, FaLeaf } from "react-icons/fa";
import { GiFuelTank } from "react-icons/gi";

const stats = [
  { label: "CNG Trips", value: 300, icon: GiFuelTank, color: "text-emerald-600", bg: "from-emerald-400/30 to-emerald-200/20", growth: "+12%" },
  { label: "CO₂ Saved (kg)", value: 54000, icon: FaLeaf, color: "text-emerald-700", bg: "from-emerald-500/30 to-emerald-300/20", growth: "+18%" },
  { label: "Digital Optimization", value: 100, icon: FaTruck, color: "text-blue-600", bg: "from-blue-400/30 to-blue-200/20", growth: "+9%" },
  { label: "Fleet Goal by 2027", value: 100, icon: FaTruck, color: "text-gray-800", bg: "from-gray-400/30 to-gray-200/20", growth: "On Track" },
];

export default function SustainabilityDashboard() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, i) => {
          const target = stats[i].value;
          if (c < target) {
            const increment = Math.ceil(target / 100);
            return c + increment > target ? target : c + increment;
          }
          return c;
        })
      );
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative w-full bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-visible pt-16 md:pt-20 pb-24"
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hanging Container - Desktop Only */}
      <motion.img
        src="/hangingcontainer.png"
        alt="Hanging Container"
        className="hidden md:block absolute top-1 right-16 w-72 opacity-90 pointer-events-none"
        animate={{ y: [0, 10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Heading + Mobile Hanging Container */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
        {/* Mobile Hanging Container */}
        <motion.img
          src="/hangingcontainer.png"
          alt="Hanging Container"
          className="block md:hidden mx-auto w-60 opacity-90 mb-6"
          animate={{ y: [0, 15, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />

        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sustainability Dashboard
        </motion.h2>

        <motion.div
          className="w-20 h-1 mx-auto rounded-full bg-emerald-500 mb-6 shadow-md"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8 }}
        />

        <motion.p
          className="text-black text-lg max-w-2xl mx-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tracking our eco-friendly initiatives and digital efficiency across the fleet.
        </motion.p>
      </div>

      {/* ✅ Stats Grid - Fixed bottom cut issue */}
      <motion.div
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 overflow-visible"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-lg p-10 flex flex-col items-center border border-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              {/* Icon Circle */}
              <motion.div
                className={`w-20 h-20 flex items-center justify-center rounded-full mb-6 bg-gradient-to-br ${stat.bg} shadow-lg`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <Icon className={`text-3xl ${stat.color} drop-shadow-md`} />
              </motion.div>

              {/* Counter */}
              <h3 className={`text-3xl font-extrabold ${stat.color} drop-shadow-sm`}>
                {counts[i].toLocaleString()}+
              </h3>
              <p className="text-gray-600 mt-2 text-center text-sm font-medium tracking-wide">
                {stat.label}
              </p>

              {/* Growth Indicator */}
              <span className="text-xs text-emerald-400 font-semibold mt-1">
                {stat.growth}
              </span>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-gray-200/30 mt-5 overflow-hidden shadow-inner">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.bg}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(counts[i] / stat.value) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
