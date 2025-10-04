"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import QuoteModal from "./form";
import CaseStudiesModal from "./CaseStudiesModal";

const navItems = [
  { name: "Home", href: "/" },
  { name: "SR E-LOCK", href: "/srelock" },
  { name: "AutoMove", href: "/automove" },
  {
    name: "Resources",
    children: [
      { name: "Case Studies", href: "/resources/case-studies" },
      { name: "Customer Learning Center", href: "/learning" },
    ],
  },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSource, setQuoteSource] = useState("");
  const [caseStudiesModalOpen, setCaseStudiesModalOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 md:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="SR Container Carriers"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm sm:text-base md:text-base font-medium">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href || "#"}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center gap-1 transition-colors ${
                    active === item.name
                      ? "text-[#F7941E]"
                      : "text-[#5A4A42] hover:text-[#F7941E]"
                  }`}
                >
                  {item.name}
                  {item.children && <ChevronDown size={16} />}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-[#F7941E] transition-all ${
                      active === item.name ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>

                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-56 border border-gray-100">
                    {item.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        onClick={(e) => {
                          if (child.name === "Case Studies") {
                            e.preventDefault();
                            setCaseStudiesModalOpen(true);
                          }
                        }}
                        className="block px-4 py-2 text-sm sm:text-base text-[#5A4A42] hover:bg-orange-50 hover:text-[#F7941E] transition-colors"
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
           
            <button
              onClick={() => {
                setQuoteSource("Get Quote - Header");
                setQuoteModalOpen(true);
              }}
            >
              Get Quote
            </button>

           
            <button
              onClick={() => {
                setQuoteSource("Get Quote - Mobile Menu");
                setQuoteModalOpen(true);
                setMenuOpen(false);
              }}
            >
              Get Quote
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[90vh] overflow-y-auto">
            <nav className="px-4 py-4 space-y-2 text-sm sm:text-base font-medium">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                    className={`w-full flex items-center justify-between py-2 transition-colors ${
                      active === item.name ? "text-[#F7941E]" : "text-[#5A4A42]"
                    }`}
                  >
                    {item.name}
                    {item.children && <ChevronDown size={16} />}
                  </button>

                  {item.children && openDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.name}
                          onClick={() => {
                            if (child.name === "Case Studies") {
                              setCaseStudiesModalOpen(true);
                            }
                            setMenuOpen(false);
                          }}
                          className="w-full text-left block py-2 text-sm sm:text-base text-[#5A4A42] hover:text-[#F7941E] transition-colors"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  setQuoteSource("Header");
                  setQuoteModalOpen(true);
                  setMenuOpen(false);
                }}
                className="w-full mt-4 px-4 sm:px-5 py-3 bg-[#F7941E] text-white text-sm sm:text-base font-semibold rounded-md hover:bg-[#E8850D] transition-colors"
              >
                Get Quote
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Quote Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 z-10">
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <QuoteModal
              isOpen={quoteModalOpen}
              onClose={() => setQuoteModalOpen(false)}
              source={quoteSource}
            />
          </div>
        </div>
      )}

      {/* Case Studies Modal */}
      <CaseStudiesModal
        isOpen={caseStudiesModalOpen}
        onClose={() => setCaseStudiesModalOpen(false)}
      />
    </>
  );
}
