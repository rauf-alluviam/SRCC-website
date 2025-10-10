"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Smartphone, Shield, Lock, Bell, BarChart3, Package, Truck } from "lucide-react";
import Form from "../components/form";

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSource, setQuoteSource] = useState("");

  const images = ["/e_lock1.jpg", "/e_lock2.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

{mounted && (
  <motion.div
    className="absolute w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-[#F7941E]/10 to-transparent rounded-full blur-3xl"
    animate={{
      x: mousePosition.x / 20,
      y: mousePosition.y / 20,
    }}
  />
)}

  const features = [
    {
      icon: MapPin,
      title: "Live GPS Tracking",
      desc: "Monitor your cargo's location 24/7 with real-time updates and route visibility.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Shield,
      title: "Tamper Alerts",
      desc: "Get instant notifications for any unauthorized access attempts or security breaches.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Smartphone,
      title: "Mobile-Authorized Unlocking",
      desc: "Securely unlock your cargo using your smartphone with military-grade encryption.",
      color: "from-orange-600 to-amber-600"
    },
    {
      icon: BarChart3,
      title: "TMS Integration",
      desc: "Seamlessly connects with your transport management system for unified operations.",
      color: "from-amber-600 to-orange-500"
    },
    {
      icon: Lock,
      title: "Enhanced Cargo Security",
      desc: "Reduce pilferage and theft losses with advanced multi-layer security features.",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: Truck,
      title: "Fleet Management",
      desc: "Comprehensive fleet oversight with analytics and performance tracking.",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const steps = [
    { num: "01", title: "Install SR E-Lock", desc: "Quick installation on containers or trailers", icon: Package },
    { num: "02", title: "Track in Real-Time", desc: "Monitor GPS location 24/7", icon: MapPin },
    { num: "03", title: "Receive Alerts", desc: "Instant tampering notifications", icon: Bell },
    { num: "04", title: "Mobile Control", desc: "Authorize unlocking securely", icon: Smartphone },
    { num: "05", title: "Monitor Dashboard", desc: "Unified control center", icon: BarChart3 }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-orange-50/30 overflow-hidden">
      
      <div className="hidden md:block fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-[#F7941E]/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 20,
            y: mousePosition.y / 20,
          }}
          transition={{ type: "spring", damping: 30 }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-[#5A4A42]/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x / 30,
            y: -mousePosition.y / 30,
          }}
          transition={{ type: "spring", damping: 30 }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

     
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto w-full">
         
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20"
          >
            <div className="text-2xl sm:text-3xl font-bold">
              <span className="text-[#F7941E]">SR</span>
              <span className="text-[#5A4A42]"> E-LOCK</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-16 sm:mt-0">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 z-10 order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block"
              >
                <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#F7941E]/20 to-[#5A4A42]/20 rounded-full border border-[#F7941E]/30 backdrop-blur-sm">
                  <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#F7941E] to-[#5A4A42] bg-clip-text text-transparent">
                    Smart GPS Lock for Cargo Safety
                  </span>
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="text-gray-900">Your Cargo.</span>
                <br />
                <span className="bg-gradient-to-r from-[#F7941E] to-[#5A4A42] bg-clip-text text-transparent">
                  Your Control.
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                A smart, GPS-enabled lock designed to <span className="font-semibold text-[#5A4A42]">prevent theft, unauthorized access, and cargo tampering</span>. 
                With real-time tracking and mobile control, you get complete visibility and peace of mind.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  { icon: MapPin, text: "Real-Time GPS" },
                  { icon: Smartphone, text: "Mobile Control" },
                  { icon: Shield, text: "Tamper Alerts" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#F7941E]/50 transition-all"
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#F7941E]" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#F7941E] to-[#5A4A42] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-sm sm:text-base"
                >
                  Get Started →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#5A4A42] font-bold rounded-2xl shadow-lg border-2 border-[#F7941E]/30 hover:border-[#F7941E] transition-all text-sm sm:text-base"
                >
                  Learn More
                </motion.button>
              </div> */}
            </motion.div>

            {/* Right - Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative w-full aspect-square max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 sm:border-4 border-dashed border-[#F7941E]/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 sm:inset-8 rounded-full border-2 sm:border-4 border-dashed border-[#5A4A42]/20"
                />

                {/* Image Container */}
                <div className="absolute inset-8 sm:inset-12 lg:inset-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-gradient-to-br from-gray-50 to-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.7 }}
                      className="w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
                    >
                      <img 
                        src={images[currentIndex]} 
                        alt={`SR E-Lock ${currentIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Floating Stats */}
                {[
                  { label: "Secure", value: "100%", pos: "top-2 -right-2 sm:top-4 sm:-right-4" },
                  { label: "Active", value: "24/7", pos: "bottom-2 -left-2 sm:bottom-4 sm:-left-4" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + idx * 0.2 }}
                    className={`absolute ${stat.pos} bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 z-10`}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-[#F7941E]">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

 {/* Features Section */}
<section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-8 sm:mb-10 lg:mb-12"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-[#F7941E] via-[#e08a1d] to-[#5A4A42] bg-clip-text text-transparent">
          Key Features & Benefits
        </span>
      </h2>
      <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#F7941E] to-[#5A4A42] mx-auto mb-4 sm:mb-5 rounded-full"></div>
      <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed font-medium">
        Advanced security technology that gives you complete control over your cargo
      </p>
    </motion.div>

    {/* 🖥️ Desktop & Tablet Grid */}
    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -8 }}
          className="group relative"
          
        >
          <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#F7941E] h-full">
            {/* Icon */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}
            >
              <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>

            {/* Content */}
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {feature.desc}
            </p>

            {/* Hover Accent */}
<div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-[#F7941E]/10 to-transparent rounded-bl-[90%] rounded-tr-[30%] opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-[#F7941E]/10 to-transparent rounded-tr-2xl sm:rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" */}

          </div>
        </motion.div>
      ))}
    </div>

    {/* 📱 Mobile Swipe Version */}
    <div className="sm:hidden relative mt-6">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 w-64 bg-white p-5 rounded-2xl shadow-lg border border-gray-100 snap-start transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
            >
              <feature.icon className="w-7 h-7 text-white" />
            </div>

            {/* Text */}
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* How It Works */}
  <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">

    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 sm:mb-16 lg:mb-20"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
        <span className="bg-gradient-to-r from-[#F7941E] to-[#5A4A42] bg-clip-text text-transparent">
          How It Works
        </span>
      </h2>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
        Get started in 5 simple steps
      </p>
    </motion.div>

    {/* Desktop Version */}
    <div className="hidden lg:block relative">
      {/* Animated Curved Wave Line */}
      <div className="absolute top-32 left-0 right-0 h-40 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="none">
          <motion.path
            d="M 0 80 Q 150 20, 300 80 T 600 80 T 900 80 T 1200 80"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="12 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <circle r="6" fill="#F7941E">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M 0 80 Q 150 20, 300 80 T 600 80 T 900 80 T 1200 80"
            />
          </circle>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F7941E" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#F7941E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5A4A42" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Number Badge */}
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative z-10 mb-4 sm:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#F7941E] to-[#5A4A42] flex items-center justify-center shadow-xl">
                <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#F7941E]">
                <span className="text-xs sm:text-sm font-bold text-[#F7941E]">{step.num}</span>
              </div>
            </motion.div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 px-2">{step.desc}</p>

            {/* Connecting dots for mobile/tablet */}
            {idx < steps.length - 1 && (
              <div className="lg:hidden w-1 h-8 bg-gradient-to-b from-[#F7941E]/50 to-transparent mt-4" />
            )}
          </motion.div>
        ))}
      </div>
    </div>

{/* Mobile Version */}
<div className="sm:hidden relative mt-4">
  {/* Horizontal Scrollable Steps */}
  <div className="relative">
    {/* Curved Glow Line Behind Cards */}
    <svg className="absolute top-12 left-0 w-full h-12 pointer-events-none">
      <path
        d="M16 20 C120 0, 260 40, 400 20 C540 0, 680 40, 800 20" 
        stroke="url(#gradient)"
        strokeWidth="4"
        fill="transparent"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F7941E" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#F7941E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5A4A42" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>

    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide px-2 relative z-10">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15, duration: 0.6 }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 w-64 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-[#F7941E]/10 snap-start text-center relative p-5"
        >
          {/* Icon with Number */}
          <div className="relative flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F7941E] to-[#5A4A42] flex items-center justify-center shadow-lg">
              <step.icon className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#F7941E] font-bold text-[#F7941E] text-xs">
              {step.num}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</div>


  </div>
</section>


      {/* Who Can Benefit Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[#F7941E] to-[#5A4A42] bg-clip-text text-transparent">
                Who Can Benefit?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              Trusted by industry leaders across sectors
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Exporters & Importers",
                desc: "Secure global shipments with real-time tracking across borders.",
                icon: "🌍",
                gradient: "from-orange-500 to-amber-600"
              },
              {
                title: "Logistics Companies",
                desc: "Deliver cargo safely and build lasting customer trust.",
                icon: "🚛",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                title: "Manufacturers",
                desc: "Protect raw materials and high-value finished goods in transit.",
                icon: "🏭",
                gradient: "from-orange-600 to-amber-500"
              },
              {
                title: "Fleet Operators",
                desc: "Ensure accountability and reduce operational risks.",
                icon: "📦",
                gradient: "from-amber-600 to-orange-600"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-[#F7941E]/5 to-transparent rounded-bl-full" />
                
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {item.icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#F7941E]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#5A4A42]/10 rounded-full blur-3xl"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[#F7941E] to-[#5A4A42] bg-clip-text text-transparent">
                Why Choose SR E-Lock?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              The complete security solution for modern logistics
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { text: "Complete Cargo Protection", icon: Shield },
              { text: "24/7 Visibility & Control", icon: MapPin },
              { text: "Plug & Play, Easy to Use", icon: Smartphone },
              { text: "Boosts Supply Chain Security", icon: Lock },
              { text: "Saves Time & Reduces Costs", icon: BarChart3 }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#F7941E]/30"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#F7941E] to-[#5A4A42] flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-base sm:text-lg font-bold text-gray-900">{item.text}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extra highlight box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-12 bg-gradient-to-r from-[#F7941E] to-[#5A4A42] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
            >
              {/* Supporting line */}
              <p className="text-base sm:text-lg lg:text-2xl text-white/95 font-medium px-4">
                500+ businesses securing their cargo with confidence
              </p>

              {/* Big Question */}
              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatDelay: 2 }}
                className="mt-3 sm:mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight"
              >
                ARE YOU?
              </motion.h2>
            </motion.div>

        </div>
      </section>

      {/* Connect With Us CTA Section */}
<section className="relative overflow-hidden bg-gradient-to-br from-[#5A4A42] via-[#5A4A42] to-[#F7941E] py-14 sm:py-16 px-6">
  {/* Subtle moving glow accents */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    className="absolute top-10 right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl"
  />
  <motion.div
    animate={{ rotate: -360 }}
    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
    className="absolute bottom-10 left-10 w-56 h-56 bg-[#F7941E]/10 rounded-full blur-3xl"
  />

  <div className="max-w-4xl mx-auto relative z-10 text-center space-y-5">
    <motion.h2
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
    >
      Ready to Secure Your Cargo?
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
    >
      Join <span className="font-semibold text-white">500+ businesses</span> protecting their shipments with{" "}
      <span className="font-bold text-white">SR E-Lock</span>. Experience total visibility and control.
    </motion.p>

    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="mt-6 px-8 sm:px-12 py-3 sm:py-4 bg-white text-[#5A4A42] font-semibold text-base sm:text-lg rounded-full shadow-lg hover:shadow-white/30 transition-all"
      onClick={() => {
        setQuoteSource("Schedule a Demo →");
        setQuoteModalOpen(true);
      }}
    >
      Schedule a Demo 
    </motion.button>
  </div>
  
</section>
       <style jsx>{` 
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
              
             
      `}</style>
      <Form
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        source={quoteSource}
      />
    </div>

   
  );
}