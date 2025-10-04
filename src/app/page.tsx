"use client";
import Image from "next/image";
import { useState } from "react";
import CountUp from "react-countup";
import AboutSection from "./components/About";
import CapabilitiesPage from "./components/capabilities";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import SustainabilityDashboard from "./components/Sustainability";
// import Footer from "./components/Footer";
import Testimonials from "./components/CustomerTestimonials";
import SreLockSection from "./components/SRELockSystem";
import IndustriesServed from "./components/industry";
import QuoteModal from "./components/form";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CaseStudiesModal from "./components/CaseStudiesModal";


export default function HeroSection() {
  const [truckStopped, setTruckStopped] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSource, setQuoteSource] = useState(""); 
  const [caseStudiesModalOpen, setCaseStudiesModalOpen] = useState(false);

const slides = [
  { src: "/heroslider.png", alt: "Hero Slide", position: "center" },
  { src: "/1758259196copy.png", alt: "Control Room", position: "top" },
  { src: "/heroslider.png", alt: "Hero Slide 2", position: "center" },
  { src: "/team.png", alt: "Our Team", position: "center" },
];
  return (
    <>
      <CustomCursor/>
      
            {/* ================= Hero Section ================= */}
      <section className="relative w-full h-screen overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="absolute inset-0 w-full h-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: slide.position, 
                  }}
                  priority={idx === 0}
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
        
        {/* Truck Animation */}
        {!truckStopped && (
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: "50vw" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            onAnimationComplete={() => setTruckStopped(true)}
            className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-0 z-20 text-[#F7941E] text-4xl sm:text-5xl md:text-6xl"
          >
            <FaTruck />
          </motion.div>
        )}

        {/* Content Overlay */}
        {truckStopped && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4 sm:px-6 md:px-8">
            {/* Main Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Transport. Secured. <br />Visible. Sustainable.
            </motion.h1>
            
            {/* Subheading */}
            <motion.p
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-2xl max-w-xs sm:max-w-xl md:max-w-2xl leading-relaxed text-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Serving India's industries since 2012 with{" "}
              <span className="font-bold text-[#F7941E]">
                <CountUp end={ 50000 } duration={2.5} separator="," />+
              </span>{" "}
              trips, real-time tracking, and a digitally integrated fleet.
            </motion.p>
            
            
            {/* CTA Buttons */}
            <motion.div
            className="mt-6 sm:mt-10 grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
         {["Track Shipment", "Try SRE Lock Free", "Download Case Study", "Get a Quote"].map((label, i) => (
              <button
                key={i}
               className={`jsx-9d33d801249b9885 w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-3
                          rounded-full font-semibold text-sm sm:text-base text-white
                          bg-[#F7941E] hover:bg-[#E8850D]`}

                onClick={() => {
                  if (label === "Download Case Study") {
                    setCaseStudiesModalOpen(true); 
                  } else {
                    setQuoteSource(label);
                    setQuoteModalOpen(true); 
                  }
                }}
              >
                {label}
              </button>
            ))}

          </motion.div>


            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 sm:bottom-12 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              onClick={() => {
                document.getElementById("fleet-section")?.scrollIntoView({ 
                  behavior: "smooth" 
                });
              }}
            >
              <div className="animate-bounce">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* ================= Fleet Showcase ================= */}
      <section id="fleet-section" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5A4A42] mb-4">
              Our Fleet
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#F7941E] mx-auto rounded-full"></div>
          </motion.div>

          {/* Fleet Slider */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
            className="fleet-swiper px-2 sm:px-4 pb-12"
          >
            {[
              {
                title: "20ft & 40ft Trailers",
                fuel: "Diesel / CNG",
                feature: "Reliable container transport with ISO-certified chassis, GPS tracking, and safety systems.",
                img: "/container.png",
              },
              {
                title: "20ft & 40ft Tippers",
                fuel: "Diesel / CNG",
                feature: "Hydraulic tilt unloading up to 39° for bulk cargo, fast turnaround in under 6 minutes.",
                img: "/1758262116.png",
              },
              {
                title: "ICERs & Boleros",
                fuel: "Diesel / CNG",
                feature: "Light-duty & air cargo transport vehicles designed for agility, speed, and cost efficiency.",
                img: "/1758261849.png",
              },
              {
                title: "20ft CNG Trailers",
                fuel: "CNG",
                feature: "Eco-friendly transport with zero emissions, clean energy fleet for sustainable logistics.",
                img: "/1758262287.png",
              },
            ].map((truck, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full">
                  {/* Image Container */}
                  <div className="w-full h-52 sm:h-60 md:h-72 relative overflow-hidden">
                    <Image
                      src={truck.img}
                      alt={truck.title}
                      fill
                      className="object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Gradient Overlay on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 bg-white">
                    <h3 className="text-lg sm:text-xl font-bold text-[#5A4A42] mb-2">
                      {truck.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      <span className="inline-block px-3 py-1 bg-orange-50 text-[#F7941E] rounded-full font-medium">
                        {truck.fuel}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {truck.feature}
                    </p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-[#F7941E] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
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
      {/* <Footer /> */}
      
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        source={quoteSource}
      />
      <CaseStudiesModal
      isOpen={caseStudiesModalOpen}
      onClose={() => setCaseStudiesModalOpen(false)}
    />


      <style jsx global>{`
        .fleet-swiper .swiper-button-next,
        .fleet-swiper .swiper-button-prev {
          color: #F7941E;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .fleet-swiper .swiper-button-next:hover,
        .fleet-swiper .swiper-button-prev:hover {
          background: #F7941E;
          color: white;
          transform: scale(1.1);
        }

        .fleet-swiper .swiper-button-next::after,
        .fleet-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }

        .fleet-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #5A4A42;
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .fleet-swiper .swiper-pagination-bullet-active {
          background: #F7941E;
          opacity: 1;
          width: 28px;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}
