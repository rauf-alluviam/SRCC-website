"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Prakash R.",
    role: "Exporter, Mundra",
    review:
      "“The best part is seeing my truck’s live status and documents on Alvision. No more calls.”",
    rating: 5,
  },
  {
    name: "Neha M.",
    role: "Metal Trader, Morbi",
    review:
      "“SRCC’s tipper saved my unloading crew hours every week. Simple but powerful.”",
    rating: 5,
  },
  {
    name: "Rohan S.",
    role: "Logistics Head, Tier 1 Supplier",
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
  }, []);

 
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (cardRefs.current.length) {
      const heights = cardRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    }
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-20 bg-gradient-to-b from-[#FFF9F5] to-[#FDFDFD] overflow-hidden">
 
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#5A4A42]">
          Customer Reviews
        </h2>
        <div className="mt-2 w-24 h-1 bg-[#F7941E] mx-auto rounded-full"></div>
        <p className="text-[#5A4A42]/80 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Hear from our clients who trust us for their logistics and cargo solutions.
        </p>
      </div>

     
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="relative overflow-hidden"
          style={{ minHeight: `${maxHeight}px` }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-10 border-l-4 border-[#F7941E]"
             ref={(el: HTMLDivElement | null) => {
              if (el) cardRefs.current[current] = el;
            }}
            >
              
              <p className="text-lg sm:text-xl text-[#5A4A42] italic leading-relaxed mb-6">
                {testimonials[current].review}
              </p>

              
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#5A4A42]">
                  {testimonials[current].name}
                </h3>
                <p className="text-sm text-[#5A4A42]/70">
                  {testimonials[current].role}
                </p>

                
                <div className="flex mt-2">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <span key={i} className="text-[#F7941E] text-base sm:text-lg">
                        ★
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 sm:-left-10 top-1/2 -translate-y-1/2 
                      bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center 
                      text-[#5A4A42] text-2xl sm:text-3xl z-20 hover:text-[#F7941E] hover:scale-110 transition"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-0 sm:-right-10 top-1/2 -translate-y-1/2 
                      bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center 
                      text-[#5A4A42] text-2xl sm:text-3xl z-20 hover:text-[#F7941E] hover:scale-110 transition"
          >
            →
          </button>
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-[#F7941E]" : "bg-gray-300"
              } cursor-pointer`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
