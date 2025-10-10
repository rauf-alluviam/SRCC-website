'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Truck, MapPin, Leaf, Gauge, Shield, Globe, Package, TrendingUp, ChevronUp, ChevronDown, Zap, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import IndiaMap from '../components/PortMap';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PortMap from '../components/PortMap';

const AutoMoveWebsite: React.FC = () => {
 
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [counters, setCounters] = useState({ journeys: 0, years: 0 });
  const [overviewRef, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [countersStarted, setCountersStarted] = useState(false);

  

  const [isInteracting, setIsInteracting] = useState(false);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const features = [
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Green Logistics",
      desc: "India's first CNG-powered trailer in import-export logistics. Reduced emissions, lower fuel costs, extended engine life.",
      gradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Technology-Driven",
      desc: "E-Lock systems, GPS tracking, and real-time monitoring for complete visibility, transparency, and security.",
      gradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Automotive Expertise",
      desc: "Advanced fleet handling 35+ cars, trailers, and tippers from plants to ports, showrooms, and distribution centers.",
      gradient: "from-orange-50 to-amber-50"
    },
    {
      icon: <Gauge className="w-12 h-12" />,
      title: "Seamless Transport",
      desc: "Smooth, compliant, time-bound delivery with strong national network and first/last-mile connectivity.",
      gradient: "from-purple-50 to-pink-50"
    }
  ];

  const prev = () => {
    setCurrent((prev) => (prev - 1 + features.length) % features.length);
  };
  
  const next = () => {
    setCurrent((prev) => (prev + 1) % features.length);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isInteracting) return;


    const isAtStart = current === 0;
    const isAtEnd = current === features.length - 1;
    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    if ((isAtStart && isScrollingUp) || (isAtEnd && isScrollingDown)) {
      return;
    }
    e.preventDefault();

    
    if (scrollTimeout.current) return;

    if (isScrollingDown) {
      setCurrent((prev) => prev + 1);
    } else if (isScrollingUp) {
      setCurrent((prev) => prev - 1);
    }

    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 700); 
  }, [isInteracting, current, features.length]);

  useEffect(() => {
    const container = cardContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const journeyTarget = 55000;
    const yearsTarget = 12;
    const journeyIncrement = journeyTarget / steps;
    const yearsIncrement = yearsTarget / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        journeys: Math.min(Math.floor(journeyIncrement * currentStep), journeyTarget),
        years: Math.min(Math.floor(yearsIncrement * currentStep), yearsTarget)
      });
      if (currentStep >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);
  
 useEffect(() => {
  if (!inView || countersStarted) return;
  setCountersStarted(true);

  const duration = 2000;
  const steps = 60;
  const journeyTarget = 55000;
  const yearsTarget = 12;
  const journeyIncrement = journeyTarget / steps;
  const yearsIncrement = yearsTarget / steps;
  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    setCounters({
      journeys: Math.min(Math.floor(journeyIncrement * currentStep), journeyTarget),
      years: Math.min(Math.floor(yearsIncrement * currentStep), yearsTarget),
    });
    if (currentStep >= steps) clearInterval(timer);
  }, duration / steps);

  return () => clearInterval(timer);
}, [inView, countersStarted]);
  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
     
{/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-16">
  {/* Parallax Background */}
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-100 scale-105"
      style={{
        backgroundImage: "url('/AutoMove(hero).png')",
        transform: `translateY(${scrollY * (window.innerWidth < 768 ? 0.2 : 0.5)}px)`,
        backgroundPosition: window.innerWidth < 640 ? 'center' : 'center',
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
  </div>

  {/* Overlay Gradient - Enhanced for mobile readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 sm:from-black/70 sm:via-black/50 sm:to-black/30" />

  {/* Hero Content */}
  <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
    <h1 className="text-4xl min-[375px]:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-4 md:mb-6 animate-fade-in leading-tight">
      AutoMove
    </h1>
    <p className="text-xl min-[375px]:text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-orange-400 font-semibold mb-4 sm:mb-4 md:mb-6 px-2 leading-snug">
      Seamless Mobility for the Automotive Future
    </p>
    <p className="text-base min-[375px]:text-lg sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-8 md:mb-12 max-w-3xl mx-auto px-2 leading-relaxed">
      A Sustainable Initiative by S R Container Carriers (SRCC)
    </p>

    {/* Explore Button with Smooth Scroll */}
    <button
      onClick={() => {
        const target = document.getElementById("overview");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="px-8 min-[375px]:px-10 sm:px-12 py-3 min-[375px]:py-3.5 sm:py-4 text-base min-[375px]:text-lg sm:text-lg font-bold text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50 active:scale-105"
      style={{ background: "linear-gradient(135deg, #F7941E 0%, #ff8800 100%)" }}
    >
      Explore AutoMove
    </button>
  </div>

  {/* Scroll Indicator - Hidden on mobile, visible on tablet+ */}
  <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex">
    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
      <div className="w-1 h-3 bg-white/70 rounded-full animate-scroll" />
    </div>
  </div>
</section>
      {/* Overview Section */}
<section
  id="overview"
  ref={overviewRef}
  className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
>
  {/* Subtle Background Pattern for Premium Feel */}
  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #5a4a42 1px, transparent 0)', backgroundSize: '40px 40px' }} />
  </div>

  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-12 items-center">
      {/* Text and Counters */}
      <div className="space-y-6 sm:space-y-7 order-2 lg:order-1">
        {/* Heading with subtle accent */}
        <div className="space-y-3">
          <div className="w-16 h-1 rounded-full mb-4" style={{ background: 'linear-gradient(90deg, #F7941E 0%, #ff8800 100%)' }} />
          <h2 className="text-[28px] leading-[1.2] min-[375px]:text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: '#5a4a42' }}>
            Powering India's Automotive Logistics
          </h2>
        </div>
        
        <p className="text-[15px] min-[375px]:text-base sm:text-lg text-gray-700 leading-relaxed">
          AutoMove is a specialized division of S R Container Carriers (SRCC), created to redefine automotive logistics with seamless, sustainable, and smart mobility solutions. As part of the Suraj Group of Companies, AutoMove carries forward SRCC's decade-long legacy of operational excellence.
        </p>

        {/* Stats Cards - Enhanced Design */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 pt-2 sm:pt-4">
          <div 
            className="bg-gradient-to-br from-white to-orange-50/30 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 group hover:-translate-y-1" 
            style={{ borderColor: '#F7941E' }}
          >
            <div className="text-3xl min-[375px]:text-4xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {counters.journeys.toLocaleString()}+
            </div>
            <div className="text-xs min-[375px]:text-sm sm:text-base text-gray-600 font-medium leading-tight">Successful Journeys</div>
            <div className="mt-2 pt-2 border-t border-orange-100">
              <span className="text-[10px] min-[375px]:text-xs text-orange-600 font-semibold">EXCELLENCE IN MOTION</span>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-white to-gray-50 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 group hover:-translate-y-1" 
            style={{ borderColor: '#5a4a42' }}
          >
            <div className="text-3xl min-[375px]:text-4xl sm:text-4xl lg:text-5xl font-bold mb-2" style={{ color: '#5a4a42' }}>
              {counters.years}+
            </div>
            <div className="text-xs min-[375px]:text-sm sm:text-base text-gray-600 font-medium leading-tight">Years of Excellence</div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <span className="text-[10px] min-[375px]:text-xs font-semibold" style={{ color: '#5a4a42' }}>TRUSTED LEGACY</span>
            </div>
          </div>
        </div>

        {/* Service Tags - Premium Design */}
        {/* <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-3">
          <div className="group flex items-center space-x-2.5 sm:space-x-3 bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-orange-100/50 hover:border-orange-200">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#F7941E' }} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Containers</span>
          </div>
          
          <div className="group flex items-center space-x-2.5 sm:space-x-3 bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-orange-100/50 hover:border-orange-200">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#F7941E' }} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Fleet & Trailers</span>
          </div>
          
          <div className="group flex items-center space-x-2.5 sm:space-x-3 bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-orange-100/50 hover:border-orange-200">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#F7941E' }} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Tippers</span>
          </div>
        </div> */}
      </div>

      {/* Truck Image / Flip Card - Enhanced */}
      <motion.div
        className="relative order-1 lg:order-2"
        initial={{ x: -200, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <div className="flip-card-container w-full h-[340px] min-[375px]:h-[380px] sm:h-96 lg:h-[420px] xl:h-96">
          <div className="flip-card-inner">
            {/* Front Side - Enhanced */}
            <div className="flip-card-face flip-card-front relative">
              <img
                src="/AutoMove(copy).png"
                alt="Fleet and Warehouse"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />
              
              {/* Premium Info Card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="bg-white/98 backdrop-blur-md p-4 sm:p-5 rounded-xl shadow-2xl border border-white/20">
                  <div className="flex items-start space-x-3 sm:space-x-3.5">
                    <div className="p-2 sm:p-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base mb-1.5" style={{ color: '#5a4a42' }}>
                        Pan-India Network
                      </h3>
                      <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                        Delivering seamless logistics across India with a strong presence in major industrial and port hubs, ensuring efficiency, reliability, and timely operations.
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle divider with pulse effect */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-semibold" style={{ color: '#F7941E' }}>NATIONWIDE REACH</span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Back Side - Enhanced */}
            <div className="flip-card-face flip-card-back rounded-2xl overflow-hidden relative">
              <PortMap/> 
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5">
                <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-2xl border border-white/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#F7941E' }} />
                    <h3 className="text-sm sm:text-base font-bold" style={{ color: '#5a4a42' }}>Port Locations</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                    ICD Sanand · Mundra · Varnama · Pipavav · Hazira · Cochin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</section>


      {/* Mission & Vision */}
<section className="relative w-full overflow-hidden py-8 sm:py-12 lg:py-0">
  {/* Desktop & Tablet Version */}
  <div className="hidden sm:flex w-full min-h-[380px] lg:h-[400px] relative">
    {/* Hourglass Background */}
    <div className="absolute inset-0">
      <div
        className="w-full h-full bg-gradient-to-br from-[#5a4a42] to-[#4a3a32]"
        style={{
          clipPath: "path('M0,0 C300,100 1240,100 1540,0 L1600,380 C1240,300 300,300 0,380 Z')",

        }}
      ></div>
    </div>

    {/* Cards */}
    <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-4 sm:gap-6">
        {/* Mission */}
        <div className="relative w-full lg:w-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-500 rounded-full shadow-md flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">Our Mission</h3>
          </div>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
            Move the automotive world efficiently, responsibly, and sustainably. Seamless, reliable logistics for every journey.
          </p>
          <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-orange-500/20 rounded-full blur-2xl"></div>
        </div>

        {/* Vision */}
        <div className="relative w-full lg:w-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row-reverse items-start sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-500 rounded-full shadow-md flex-shrink-0">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white sm:text-right">Our Vision</h3>
          </div>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed sm:text-right">
            Lead India's logistics transformation with eco-friendly transport and cutting-edge technology — every vehicle moves fast, safe, and sustainable.
          </p>
          <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-yellow-500/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  </div>

  {/* Mobile Version */}

<div className="sm:hidden relative overflow-hidden">

  {/* Top Curve */}
  <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[#5a4a42] via-[#4a3a32] to-[#3b2f28] rounded-b-full z-0" />

  {/* Soft Gradient Background */}
  <div className="relative z-10 py-12 px-4 bg-gradient-to-br from-[#4a3a32] via-[#5a4a42] to-[#3b2f28] rounded-2xl">

    <div className="max-w-md mx-auto flex flex-col gap-6">

      {/* Mission Card */}
      <div className="relative w-full bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-inner shadow-black/20 border border-white/10 transition-transform duration-300 active:scale-105 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl animate-slow-float"></div>
        <div className="flex items-center mb-4 gap-4 relative z-10">
          <div className="w-12 h-12 flex items-center justify-center bg-orange-500 rounded-full shadow-md">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white tracking-wide">Our Mission</h3>
        </div>
        <p className="text-gray-200 text-sm leading-relaxed relative z-10">
          Move the automotive world efficiently, responsibly, and sustainably. Seamless, reliable logistics for every journey.
        </p>
      </div>

      {/* Vision Card */}
      <div className="relative w-full bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-inner shadow-black/20 border border-white/10 transition-transform duration-300 active:scale-105 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-slow-float"></div>
        <div className="flex items-center mb-4 gap-4 relative z-10">
          <div className="w-12 h-12 flex items-center justify-center bg-yellow-500 rounded-full shadow-md">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white tracking-wide">Our Vision</h3>
        </div>
        <p className="text-gray-200 text-sm leading-relaxed relative z-10">
          Lead India's logistics transformation with eco-friendly transport and cutting-edge technology — every vehicle moves fast, safe, and sustainable.
        </p>
      </div>

    </div>
  </div>

  {/* Bottom Curve */}
  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#5a4a42] via-[#4a3a32] to-[#3b2f28] rounded-t-full z-0" />
</div>


</section>



{/* Why Choose AutoMove Section */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
  {/* Decorative blobs */}
  <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
  <div
    className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse-slow"
    style={{ animationDelay: '1s' }}
  />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-block"
      >
        <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2 block">
          Our Advantages
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#5a4a42' }}>
          Why Choose AutoMove?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full" />
      </motion.div>
    </div>

    {/* Desktop / Tablet Carousel */}
    <div className="hidden sm:block relative max-w-1xl mx-auto h-[450px] cursor-grab active:cursor-grabbing"
      ref={cardContainerRef}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {features.map((feature, idx) => {
        const offset = idx - current;
        const isActive = offset === 0;

        const x = isActive ? 0 : offset * 300;
        const y = isActive ? 0 : Math.abs(offset) * 60;
        const scale = isActive ? 1 : 0.85;
        const opacity = isActive ? 1 : 0.5;
        const rotate = isActive ? 0 : offset * 3;
        const zIndex = features.length - Math.abs(offset);

        return (
          <motion.div
            key={idx}
            animate={{ x, y, scale, opacity, rotate, boxShadow: isActive ? "0 25px 50px rgba(247,148,30,0.25)" : "0 10px 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="absolute w-[500px] rounded-2xl overflow-hidden cursor-pointer"
            style={{ zIndex }}
          >
            <div className="relative bg-white p-10 rounded-2xl border border-gray-100 hover:border-orange-400 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden ${isActive ? "bg-gradient-to-tr from-orange-400 to-orange-600" : "bg-gray-200"}`}>
                  <div className="text-white">
                    {React.cloneElement(feature.icon, { className: "w-12 h-12 sm:w-14 sm:h-14" })}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-base sm:text-lg">{feature.desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

{/* Mobile Version */}


<div className="sm:hidden relative py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
  {/* Subtle top curve */}
  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#5a4a42] to-[#4a3a32] rounded-b-full z-0" />

  <div className="relative z-10 max-w-full px-4">
    {/* Horizontal scroll container with snapping */}
    <div className="flex gap-4 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-hide">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          className="flex-shrink-0 w-64 bg-white p-5 rounded-2xl shadow-lg border border-gray-100 snap-start"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-400 to-orange-600 shadow-lg animate-float">
              {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>




    {/* Navigation dots and buttons (Desktop only) */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="hidden sm:flex justify-center items-center gap-6 mt-12"
    >
      <button
        onClick={() => setCurrent(prev => Math.max(prev - 1, 0))}
        className="group p-4 bg-white rounded-full hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center border border-gray-200 hover:border-orange-500"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
      </button>

      <div className="flex gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`relative h-2.5 rounded-full transition-all duration-500 ${idx === current ? 'w-10 bg-gradient-to-r from-orange-400 to-orange-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrent(prev => Math.min(prev + 1, features.length - 1))}
        className="group p-4 bg-white rounded-full hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center border border-gray-200 hover:border-orange-500"
      >
        <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
      </button>
    </motion.div>
  </div>
</section>



      {/* Sustainability Section */}
    <section id="sustainability" className="relative overflow-hidden">

  {/* ===========================
       🌍 MOBILE VERSION
  ============================ */}
  <div className="sm:hidden relative py-12 bg-gradient-to-b from-[#5a4a42] to-[#3b2f28] text-white overflow-hidden">
    
    {/* Soft top curve */}
    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/20 to-transparent rounded-b-full" />

    <div className="relative z-10 px-5 flex flex-col items-center text-center">
      {/* Tag */}
      <div className="inline-block px-5 py-2 bg-orange-500 rounded-full text-sm font-semibold mb-5 shadow-md">
        Sustainability at the Core
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold leading-snug mb-3">
        Steering Logistics Toward a Greener Tomorrow
      </h2>

      {/* Description */}
      <p className="text-gray-200 text-sm leading-relaxed mb-8">
        At AutoMove, we’re pioneering India’s clean-fuel vision with CNG-powered fleets, reducing carbon emissions for a more sustainable logistics ecosystem.
      </p>

      {/* Image */}
      <div className="relative w-full mb-10">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
            alt="CNG Trucks"
            className="w-full h-60 object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Highlights */}
      <div className="space-y-5 w-full">
        {[
          {
            icon: <Leaf className="w-5 h-5 text-white" />,
            title: "First CNG Trailer in IE Logistics",
            desc: "Pioneering sustainable transport in India's import-export sector",
          },
          {
            icon: <TrendingUp className="w-5 h-5 text-white" />,
            title: "Reduced Carbon Footprint",
            desc: "Significantly lower emissions compared to diesel fleets",
          },
          {
            icon: <Globe className="w-5 h-5 text-white" />,
            title: "Sustainable Ecosystem",
            desc: "Building a greener future for businesses and communities",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start bg-white/10 backdrop-blur-md rounded-xl p-4 gap-4 shadow-md"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-lg mb-1 text-white">{item.title}</h4>
              <p className="text-gray-200 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ===========================
       💻 DESKTOP + TABLET VERSION
  ============================ */}
  <div className="hidden sm:block relative py-16 sm:py-20 lg:py-24 overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1600&q=80')",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(90, 74, 66, 0.95) 0%, rgba(74, 58, 50, 0.95) 100%)",
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-white">
          <div className="inline-block px-6 py-2 bg-orange-500 rounded-full text-sm font-semibold mb-4 shadow-md">
            Sustainability at the Core
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Steering Logistics Toward a Greener Tomorrow
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            At AutoMove, we're pioneering India's clean-fuel vision by adopting
            CNG-powered fleets. Every journey contributes to reducing carbon emissions
            and building a sustainable logistics ecosystem.
          </p>

          <div className="space-y-5 pt-4">
            {[
              {
                icon: <Leaf className="w-5 h-5 text-white" />,
                title: "First CNG Trailer in IE Logistics",
                desc: "Pioneering sustainable transport in India's import-export sector",
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-white" />,
                title: "Reduced Carbon Footprint",
                desc: "Significantly lower emissions compared to traditional diesel fleets",
              },
              {
                icon: <Globe className="w-5 h-5 text-white" />,
                title: "Sustainable Ecosystem",
                desc: "Building a greener future for businesses and communities alike",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
              alt="CNG Trucks"
              className="w-full h-80 lg:h-96 object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500 rounded-full opacity-20 blur-3xl" />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Journey Ahead / CTA */}
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105 hover:scale-110"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')",
    }}
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent backdrop-blur-[2px]" />

  {/* ===== Desktop / Tablet Version ===== */}
  <div className="hidden sm:block relative z-10 text-center px-6 sm:px-8 lg:px-10 max-w-5xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-tight tracking-tight drop-shadow-lg"
    >
      Ready to Move the Future?
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
    >
      Be part of India's Green Logistics Revolution with AutoMove — where
      efficiency meets sustainability on every mile.
    </motion.p>

    {/* Clickable Button with Glow Animation */}
    <motion.a
      href="automove"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-block px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white rounded-full shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-500"
      style={{
        background:
          "linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(5,150,105,0.9) 100%)",
      }}
    >
      Want to know how AutoMove is powering the green logistics revolution?{" "}
      <span className="text-green-300 font-bold underline underline-offset-4 hover:text-green-400 transition-colors duration-300">
        Visit our website
      </span>

      {/* Soft Glow Animation */}
      <span className="absolute inset-0 rounded-full animate-pulse-glow"></span>
    </motion.a>
  </div>

  {/* ===== Mobile Version ===== */}
  <div className="sm:hidden relative z-10 text-center px-6 max-w-md mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-3xl font-bold text-white mb-4 leading-snug"
    >
      Ready to Move the Future?
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-base text-gray-300 mb-8 leading-relaxed"
    >
      Join India's Green Logistics Revolution with AutoMove — where
      sustainability meets performance.
    </motion.p>

    {/* Mobile Button with Glow Animation */}
    <motion.a
      href="automove"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-block px-6 py-3 text-sm font-semibold text-white rounded-full shadow-lg border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10"
      style={{
        background:
          "linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(5,150,105,0.9) 100%)",
      }}
    >
      Know how we’re powering the green revolution 👉
      <span className="absolute inset-0 rounded-full animate-pulse-glow"></span>
    </motion.a>
  </div>
</section>





      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
        .flip-card-container { perspective: 1000px; }
        .flip-card-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d; transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        .flip-card-container:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-face {
          position: absolute; width: 100%; height: 100%;
          backface-visibility: hidden; border-radius: 1rem; overflow: hidden;
        }
        .flip-card-front { transform: rotateY(0deg); }
        .flip-card-back { transform: rotateY(180deg); }
        .animate-pulse-slow { animation: pulse 6s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { transform: scale(1) translateY(0); opacity: 0.5; }
          50% { transform: scale(1.1) translateY(-10px); opacity: 0.7; }
        }
          @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
          @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(16,185,129,0.7), 0 0 20px rgba(16,185,129,0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(16,185,129,1), 0 0 40px rgba(16,185,129,0.7);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
          pointer-events: none;
        }

      `}</style>
    </div>
  );
};

export default AutoMoveWebsite;