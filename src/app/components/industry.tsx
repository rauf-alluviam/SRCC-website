"use client";
import React from "react";

export default function IndustriesServed() {
  const industries = [
    { name: "Automotive", icon: "🚗" },
    { name: "Ceramics", icon: "🏺" },
    { name: "Packaging", icon: "📦" },
    { name: "Metal Scrap", icon: "♻️" },
    { name: "Pharma", icon: "💊" },
    { name: "Electronics", icon: "📱" },
  ];

  const loopIndustries = [...industries, ...industries];

  return (
    <section className="relative py-16 bg-[#10192D] overflow-hidden">
      {/* Decorative radial glow */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#F7941E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#5A4A42]/20 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide leading-snug">
            Specialized Transport Solutions
            <br />
            <span className="text-[#F7941E]">Across Every Industry</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-[#F7941E] to-[#5A4A42] mx-auto rounded-full shadow-lg" />
        </div>

        {/* Auto-scrolling Industries */}
        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#10192D] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#10192D] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Row */}
          <div className="overflow-hidden">
            <div
              className="flex gap-8 animate-scroll"
              style={{ width: "fit-content", animation: "scroll 25s linear infinite" }}
            >
              {loopIndustries.map((industry, index) => (
                <div
                  key={`${industry.name}-${index}`}
                  className="flex flex-col items-center justify-center min-w-[140px] group cursor-pointer"
                >
                  {/* Industry Card */}
                  <div className="relative bg-[#1A2236]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#F7941E]/60 transition-all duration-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(247,148,30,0.3)] w-full">
                    {/* Icon Circle */}
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#5A4A42]/40 to-[#F7941E]/20 flex items-center justify-center text-2xl mb-3 transition-all duration-300 group-hover:from-[#F7941E]/40 group-hover:to-[#5A4A42]/40">
                      {industry.icon}
                    </div>

                    {/* Name */}
                    <h3 className="text-sm font-semibold text-slate-300 text-center group-hover:text-[#F7941E] transition-colors tracking-wide">
                      {industry.name}
                    </h3>

                    {/* Animated Accent Bar */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#F7941E] to-[#5A4A42] group-hover:w-full transition-all duration-500 rounded-b-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for smooth scrolling */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
