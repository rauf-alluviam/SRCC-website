
"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for 3 seconds (or until your data/assets are loaded)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; // Hide preloader after loading

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      {/* Truck Animation */}
      <motion.img
        src="/truck.png" // Replace with your truck image path
        alt="Loading Truck"
        className="w-32 md:w-48"
        initial={{ x: "-100vw" }}
        animate={{ x: "100vw" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      {/* Optional: Loading Text */}
      <motion.p
        className="absolute bottom-20 text-lg md:text-2xl font-semibold text-gray-700"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        SR Container Carriers 
      </motion.p>
    </div>
  );
}
