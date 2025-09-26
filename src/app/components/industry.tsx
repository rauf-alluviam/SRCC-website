"use client";
import React from 'react';

export default function IndustriesServed() {
  const industries = [
    { name: "Automotive", icon: "🚗" },
    { name: "Ceramics", icon: "🏺" },
    { name: "Packaging", icon: "📦" },
    { name: "Metal Scrap", icon: "♻️" },
    { name: "Pharma", icon: "💊" },
    { name: "Electronics", icon: "📱" },
  ];

  // Duplicate for seamless loop
  const loopIndustries = [...industries, ...industries];

  return (
    <section className="py-12 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Specialized Transport Solutions
            <br />
            <span className="text-red-400">Across Every Industry</span>
          </h2>
        </div>

        {/* Auto-scrolling Industries */}
        <div className="relative">
          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-800 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-800 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 animate-scroll"
              style={{
                width: 'fit-content',
                animation: 'scroll 25s linear infinite'
              }}
            >
              {loopIndustries.map((industry, index) => (
                <div
                  key={`${industry.name}-${index}`}
                  className="flex flex-col items-center justify-center min-w-[120px] group cursor-pointer"
                >
                  {/* Compact Industry Card */}
                  <div className="relative bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50 hover:border-red-400/50 hover:bg-slate-700/70 transition-all duration-300 group-hover:scale-105 w-full">
                    {/* Icon */}
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-600/50 group-hover:bg-red-500/20 flex items-center justify-center text-xl mb-2 transition-all duration-300">
                      {industry.icon}
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-xs font-medium text-slate-300 text-center group-hover:text-red-400 transition-colors">
                      {industry.name}
                    </h3>
                    
                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300 rounded-b-lg"></div>
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