"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTruck, FaLeaf } from "react-icons/fa";
import { GiFuelTank } from "react-icons/gi";

// Stats + Growth Data
const stats = [
  { label: "CNG Trips", value: 300, icon: GiFuelTank, color: "text-emerald-600", bg: "from-emerald-100/50 to-emerald-200/30", growth: "+12%" },
  { label: "CO₂ Saved (kg)", value: 54000, icon: FaLeaf, color: "text-emerald-700", bg: "from-emerald-100/50 to-emerald-200/30", growth: "+18%" },
  { label: "Digital Optimization", value: 100, icon: FaTruck, color: "text-blue-700", bg: "from-blue-100/50 to-blue-200/30", growth: "+9%" },
  { label: "Fleet Goal by 2027", value: 100, icon: FaTruck, color: "text-gray-800", bg: "from-gray-100/50 to-gray-200/30", growth: "On Track" },
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
    <section className="relative w-full py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Floating Container Image */}
      <motion.img
        src="/hangingcontainer.png" // replace with your actual image path
        alt="Hanging Container"
        className="absolute top-10 right-16 w-72 opacity-80 pointer-events-none"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sustainability Dashboard
        </motion.h2>

        {/* Animated Divider */}
        <motion.div
          className="w-16 h-1 mx-auto bg-emerald-500 rounded-full mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.8 }}
        />

        <motion.p
          className="text-gray-600 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tracking our eco-friendly initiatives and digital efficiency across the fleet.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              className="relative backdrop-blur-lg bg-white/70 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
              p-8 flex flex-col items-center border border-gray-200
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Icon Circle */}
              <motion.div
                className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 bg-gradient-to-br ${stat.bg}`}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <Icon className={`text-2xl ${stat.color}`} />
              </motion.div>

              {/* Counter */}
              <h3 className={`text-3xl font-bold ${stat.color}`}>
                {counts[i].toLocaleString()}+
              </h3>
              <p className="text-gray-600 mt-2 text-center text-sm font-medium">
                {stat.label}
              </p>

              {/* Growth Indicator */}
              <span className="text-xs text-emerald-600 font-medium mt-1">
                {stat.growth}
              </span>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-gray-200 mt-5 overflow-hidden">
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
      </div>
    </section>
  );
}
