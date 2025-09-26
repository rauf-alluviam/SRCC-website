"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaIndustry, FaTruck, FaEye, FaBullseye } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { GiFuelTank, GiRecycle } from "react-icons/gi";

const stats = [
  { label: "Factories Served", value: 1000, color: "text-red-600", icon: FaIndustry },
  { label: "Fleet (by 2027)", value: 100, color: "text-red-600", start: 36, icon: FaTruck },
  { label: "Trips Completed", value: 50000, color: "text-red-600", icon: FiMapPin },
  { label: "CNG Trips", value: 300, color: "text-green-600", icon: GiFuelTank },
  { label: "CO₂ Saved (kg)", value: 54000, color: "text-green-600", icon: GiRecycle },
];

export default function AboutUs() {
  const [showVisionMission, setShowVisionMission] = useState(false);
  const [counts, setCounts] = useState(stats.map((s) => s.start || 0));
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, i) => {
          const target = stats[i].value;
          if (c < target) {
            const increment = Math.ceil(target / 200);
            return c + increment > target ? target : c + increment;
          }
          return c;
        })
      );
    }, 20);
    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardsRef.current && !cardsRef.current.contains(event.target as Node)) {
        setShowVisionMission(false);
      }
    }
    if (showVisionMission) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showVisionMission]);

  const cardVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
    exit: { y: 200, opacity: 0, transition: { duration: 0.5 } },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-14 sm:py-20 overflow-hidden bg-gray-200"
    >
      {/* Animated background particles */}
      {windowSize.width > 0 &&
        [...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full bg-red-400/30 w-${i % 2 === 0 ? "1" : "2"} h-${
              i % 2 === 0 ? "1" : "2"
            }`}
            initial={{ x: Math.random() * windowSize.width, y: Math.random() * windowSize.height }}
            animate={{ y: ["0%", "-30%", "0%"], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 8 + Math.random() * 4, delay: i * 0.15 }}
          />
        ))}

      {/* Intro Section */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 gap-10 lg:gap-14">
        {/* Image */}
        <motion.div
          className="flex-1 w-full"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/about.png"
            alt="SR Container Truck"
            className="w-full max-w-lg mx-auto h-auto object-contain rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex-1 w-full text-center lg:text-left"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            ABOUT SR CONTAINER CARRIERS
          </h2>
          <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
            Established in 2012 and part of the Suraj Group, SR Container Carriers is a Gujarat-based logistics company with a sharp focus on containerized, OEM, and air cargo transportation. We combine real-time visibility, in-house technology, sustainability, and fleet integrity to deliver peace of mind across every shipment.
          </p>
          <motion.button
            onClick={() => setShowVisionMission((prev) => !prev)}
            className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-red-800 hover:bg-gray-900 rounded-xl shadow-md transition flex items-center justify-center gap-2 mx-auto lg:mx-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaTruck className="text-white" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Snapshot Stats */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-12 sm:mt-16 px-4 sm:px-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <Icon className={`text-3xl sm:text-4xl mb-2 ${s.color}`} />
              <h3 className={`text-lg sm:text-2xl font-bold ${s.color}`}>
                {counts[i].toLocaleString()}+
              </h3>
              <p className="text-gray-700 mt-1 text-center text-xs sm:text-sm">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Vision & Mission Cards */}
      <AnimatePresence>
        {showVisionMission && isInView && (
          <motion.div
            ref={cardsRef}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-6 w-full max-w-5xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {/* Vision */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 sm:p-6 rounded-xl shadow-lg relative cursor-pointer overflow-hidden"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              animate={floatingAnimation}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-red-700 mb-3 flex items-center gap-2">
                <FaEye className="text-red-700 text-2xl sm:text-3xl" />
                Vision
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                To deliver technology-driven, real-time transport solutions for automotive
                and metal scrap industries by securing every container with SRE Lock,
                integrating tracking through Alvision EXIM, and building a green fleet.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 sm:p-6 rounded-xl shadow-lg relative cursor-pointer overflow-hidden"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              animate={floatingAnimation}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-red-700 mb-3 flex items-center gap-2">
                <FaBullseye className="text-red-700 text-2xl sm:text-3xl" />
                Mission
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                To grow a fleet of 100 by 2027 with 10%+ eco-friendly vehicles, build
                customer trust through transparency, and continuously innovate with digital
                tools that increase uptime, reduce carbon, and enhance decision-making.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
