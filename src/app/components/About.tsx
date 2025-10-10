"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaIndustry, FaTruck, FaEye, FaBullseye } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { GiFuelTank, GiRecycle } from "react-icons/gi";

const stats = [
  { label: "Factories Served", value: 1000, color: "#5A4A42", icon: FaIndustry },
  { label: "Fleet (by 2027)", value: 100, color: "#5A4A42", start: 36, icon: FaTruck },
  { label: "Trips Completed", value: 50000, color: "#5A4A42", icon: FiMapPin },
  { label: "CNG Trips", value: 300, color: "#22C55E", icon: GiFuelTank },
  { label: "CO₂ Saved (kg)", value: 54000, color: "#22C55E", icon: GiRecycle },
];

export default function AboutUs() {
  const [showVisionMission, setShowVisionMission] = useState(false);
  const [counts, setCounts] = useState(stats.map((s) => s.start || 0));
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const cardsRef = useRef<HTMLDivElement>(null);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = (): void => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
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
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.4 } },
  };

  const floatingAnimation = {
    y: [0, -5, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  };

  return (
    <section ref={sectionRef} className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {/* Image */}
        <motion.div
          className="flex-1 w-full"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/about.png"
            alt="SR Container Truck"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto h-auto object-cover rounded-xl sm:rounded-2xl shadow-xl"
          />
        </motion.div>

        <motion.div
          className="flex-1 w-full text-center lg:text-left"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#5A4A42] mb-4 sm:mb-5 md:mb-6 whitespace-nowrap">
          ABOUT <br/><span className="text-[#5A4A42]">SR&nbsp;Container&nbsp;Carriers</span>
        </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-base lg:text-lg mb-6 sm:mb-7 md:mb-8 leading-relaxed px-2 sm:px-0">
            Established in 2012 and part of the Suraj Group, SR Container Carriers is a Gujarat-based logistics company with a sharp focus on containerized, OEM, and air cargo transportation. We combine real-time visibility, in-house technology, sustainability, and fleet integrity to deliver peace of mind across every shipment.
          </p>
          <motion.button
            onClick={() => setShowVisionMission((prev) => !prev)}
            className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-white bg-[#F7941E] hover:bg-[#5A4A42] rounded-lg sm:rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto lg:mx-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <FaTruck className="text-white text-sm sm:text-base" />
          </motion.button>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-10 sm:mt-12 md:mt-14 lg:mt-16 px-4 sm:px-6 md:px-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl mb-2 sm:mb-2 md:mb-3" style={{ color: s.color }}>
                <Icon />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-1" style={{ color: s.color }}>
                {counts[i].toLocaleString()}+
              </h3>
              <p className="text-gray-600 text-xs sm:text-xs md:text-sm leading-tight">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Vision & Mission Cards */}
      <AnimatePresence>
        {showVisionMission && isInView && (
          <motion.div
            ref={cardsRef}
            className="
              fixed top-16 sm:top-20 md:top-24 left-1/2 transform -translate-x-1/2 
              z-50 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 
              w-[92%] sm:w-[85%] md:w-[90%] lg:w-full max-w-5xl px-3 sm:px-4 md:px-6
              overflow-y-auto md:overflow-y-visible max-h-[80vh] md:max-h-none
            "
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >

            {/* Vision */}
            <motion.div
              className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-2xl md:rounded-3xl shadow-xl border-l-4 border-[#F7941E] relative cursor-pointer overflow-hidden hover:scale-105 transition-transform"
              variants={cardVariants}
              animate={floatingAnimation}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#F7941E] mb-2 sm:mb-2 md:mb-3 flex items-center gap-2 sm:gap-2 md:gap-3">
                <FaEye className="text-[#5A4A42] text-xl sm:text-2xl md:text-3xl" /> Vision
              </h3>
              <p className="text-gray-700 text-sm sm:text-sm md:text-base leading-relaxed">
                To deliver technology-driven, real-time transport solutions for automotive and metal scrap industries by securing every container with SRE Lock, integrating tracking through Alvision EXIM, and building a green fleet.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-2xl md:rounded-3xl shadow-xl border-l-4 border-[#F7941E] relative cursor-pointer overflow-hidden hover:scale-105 transition-transform"
              variants={cardVariants}
              animate={floatingAnimation}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#F7941E] mb-2 sm:mb-2 md:mb-3 flex items-center gap-2 sm:gap-2 md:gap-3">
                <FaBullseye className="text-[#5A4A42] text-xl sm:text-2xl md:text-3xl" /> Mission
              </h3>
              <p className="text-gray-700 text-sm sm:text-sm md:text-base leading-relaxed">
                To grow a fleet of 100 by 2027 with 10%+ eco-friendly vehicles, build customer trust through transparency, and continuously innovate with digital tools that increase uptime, reduce carbon, and enhance decision-making.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}