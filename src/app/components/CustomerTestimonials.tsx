"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Prakash R.",
    role: "Exporter, Mundra",
    photo: "/user.png",
    review:
      "“The best part is seeing my truck’s live status and documents on Alvision. No more calls.”",
    rating: 5,
  },
  {
    name: "Neha M.",
    role: "Metal Trader, Morbi",
    photo: "/user.png",
    review:
      "“SRCC’s tipper saved my unloading crew hours every week. Simple but powerful.”",
    rating: 5,
  },
  {
    name: "Rohan S.",
    role: "Logistics Head, Tier 1 Supplier",
    photo: "/user.png",
    review:
      "“Their Garuda team gives real-time support when my team needs it. Reliable team.”",
    rating: 5,
  },
];

export default function TestimonialsFloating() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="relative w-full py-16 sm:py-20 bg-gray-50 overflow-hidden">
      {/* Floating Background Text */}
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden z-0">
        <motion.h1
          className="absolute text-gray-200 font-bold uppercase text-[100px] sm:text-[150px] md:text-[200px] select-none pointer-events-none"
          animate={{ y: [-30, 30, -30], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        >
          SR Container Carriers
        </motion.h1>
      </div>

      {/* Section Heading */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-10 sm:mb-14 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900">
          Customer Reviews!
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Logistics company specializes in managing the transportation, storage, and
          distribution of goods.
        </p>
      </div>

      {/* Testimonials Slider */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center border-l-4 border-red-600"
            >
              {/* Profile */}
              <img
                src={testimonials[current].photo}
                alt={`${testimonials[current].name} profile`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-red-600"
              />

              {/* Content */}
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-navy-900">
                  {testimonials[current].name}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-2">
                  {testimonials[current].role}
                </p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {testimonials[current].review}
                </p>
                {/* Star rating */}
                <div className="flex justify-center sm:justify-start mt-2 sm:mt-3">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm sm:text-base">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 text-red-600 text-xl sm:text-2xl z-20"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 text-red-600 text-xl sm:text-2xl z-20"
        >
          →
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-4 sm:mt-6 gap-2">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-red-600" : "bg-gray-300"
              } cursor-pointer`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-6 sm:mt-10">
          <button className="px-5 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
            Get Solution
          </button>
        </div>
      </div>
    </section>
  );
}
