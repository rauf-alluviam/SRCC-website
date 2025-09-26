"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import AboutSection from "./components/About";
import CapabilitiesPage from "./components/capabilities";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

import SustainabilityDashboard from "./components/Sustainability";
import Footer from "./components/Footer";
// import Preloader from "./components/preloader";
import Testimonials from "./components/CustomerTestimonials";
import SreLockSection from "./components/SRELockSystem";
import IndustriesServed from "./components/industry";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSection() {
  const words = ["Transport.", "Secured.", "Visible.", "Sustainable."];
  const [currentWord, setCurrentWord] = useState(0);
  const [truckStopped, setTruckStopped] = useState(false);

  const slides = [
    { src: "/heroslider.png", alt: "Hero Slide" },
    { src: "/1758259196copy.png", alt: "Control Room" },
    { src: "/heroslider.png", alt: "Hero Slide 2" },
    { src: "/team.png", alt: "Our Team" },
  ];

  useEffect(() => {
    if (truckStopped && currentWord < words.length) {
      const timer = setTimeout(() => setCurrentWord((prev) => prev + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [currentWord, truckStopped]);

  return (
    <>
      {/* <Preloader/> */}
      {/* ================= Hero Section ================= */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Slider */}
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="absolute inset-0 w-full h-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5, ease: "easeOut" }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0} 
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />
        {!truckStopped && (
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: "100vw" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            onAnimationComplete={() => setTruckStopped(true)}
            className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-0 z-20 text-white text-4xl sm:text-5xl md:text-6xl"
          >
            <FaTruck />
          </motion.div>
        )}

        {/* Text Overlay */}
        {truckStopped && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4 sm:px-6 md:px-8">
            {/* Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                duration: 1,
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              }}
            >
              Transport. Secured. Visible. Sustainable.
            </motion.h1>
            <motion.p
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl max-w-2xl sm:max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                delay: 0.5,
                duration: 1,
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              }}
            >
              Serving India’s industries since 2012 with{" "}
              <span className="font-bold text-red-400">
                <CountUp end={50000} duration={3} separator="," />+
              </span>{" "}
              trips, real-time tracking, and a digitally integrated fleet.
            </motion.p>
            <motion.div
              className="mt-6 sm:mt-10 flex flex-wrap gap-4 sm:gap-6 justify-center"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.3 } },
              }}
            >
              {[
                "Track Shipment",
                "Try SRE Lock Free",
                "Download Case Study",
                "Get a Quote",
              ].map((label, i) => (
                <motion.button
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg text-white bg-red-600 hover:bg-red-700 transition shadow-lg"
                >
                  {label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}
      </section>

      {/*Fleet Showcase*/}
      <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-gray-100">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our Fleet
          </motion.h2>

      
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            className="px-2 sm:px-4"
          >
            {[
              {
                title: "20ft & 40ft Trailers",
                fuel: "Diesel / CNG",
                feature:
                  "Reliable container transport with ISO-certified chassis, GPS tracking, and safety systems.",
                img: "/container.png",
              },
              {
                title: "20ft & 40ft Tippers",
                fuel: "Diesel / CNG",
                feature:
                  "Hydraulic tilt unloading up to 39° for bulk cargo, fast turnaround in under 6 minutes.",
                img: "/1758262116.png",
              },
              {
                title: "ICERs & Boleros",
                fuel: "Diesel / CNG",
                feature:
                  "Light-duty & air cargo transport vehicles designed for agility, speed, and cost efficiency.",
                img: "/1758261849.png",
              },
              {
                title: "20ft CNG Trailers",
                fuel: "CNG",
                feature:
                  "Eco-friendly transport with zero emissions, clean energy fleet for sustainable logistics.",
                img: "/1758262287.png",
              },
            ].map((truck, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md group cursor-pointer"
                >
                  {/* Image */}
                  <div className="w-full h-48 sm:h-56 md:h-64 relative">
                    <Image
                      src={truck.img}
                      alt={truck.title}
                      fill
                      className="object-cover object-center"
                      loading="lazy"
                    />
                  </div>

                  
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 sm:p-3 text-white">
                    <h3 className="text-sm sm:text-base font-semibold">
                      {truck.title}
                    </h3>
                  </div>

                 
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white p-4 sm:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-2">
                      {truck.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {truck.feature}
                    </p>
                    <p className="text-xs sm:text-sm mt-2 italic">
                      Fuel: {truck.fuel}
                    </p>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <AboutSection />
      <CapabilitiesPage />
      <SreLockSection />
      <SustainabilityDashboard />
      <IndustriesServed />
      <Testimonials />
      <Footer />
    </>
  );
}




