'use client';
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import QuoteModal from "./form";
import CaseStudiesModal from "./CaseStudiesModal";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "SR E-LOCK", href: "/srelock" },
  { name: "AutoMove", href: "/AutoMove" },
  { name: "FAQ's", href: "/learning" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const pathname = usePathname();
  const currentPath = pathname === "/" ? "/" : pathname?.toLowerCase().replace(/\/$/, "") || "/";
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSource, setQuoteSource] = useState("");
  const [caseStudiesModalOpen, setCaseStudiesModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.href) {
      const itemPath = item.href.toLowerCase().replace(/\/$/, "");
      return itemPath === currentPath.replace(/\/$/, "");
    }
    if (item.children) {
      return item.children.some(
        (child) =>
          child.href &&
          child.href.toLowerCase().replace(/\/$/, "") === currentPath.replace(/\/$/, "")
      );
    }
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-500 ${
          scrolled ? "bg-white/90 shadow-md" : "bg-white/70 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center z-50 transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/logo.png"
              alt="SR Container Carriers"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 text-sm lg:text-base font-medium">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href || "#"}
                  className={`flex items-center gap-1 px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive(item)
                      ? "text-[#F7941E] bg-orange-50 shadow-inner"
                      : "text-gray-700 hover:text-[#F7941E] hover:bg-orange-50/70"
                  }`}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                setQuoteSource("Get Quote");
                setQuoteModalOpen(true);
              }}
              className="hidden lg:block px-6 py-2.5 bg-gradient-to-r from-[#F7941E] to-[#E8850D] text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-orange-400/40 transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:text-[#F7941E] hover:bg-orange-50 rounded-lg transition-all duration-300"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-5 py-4 space-y-2 text-base font-medium">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col">
                <a
                  href={item.href || "#"}
                  onClick={(e) => {
                    if (item.children?.length) {
                      e.preventDefault();
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name
                      );
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                  className={`flex justify-between items-center py-3 px-5 rounded-xl transition-all duration-300 ${
                    isActive(item)
                      ? "bg-orange-50 text-[#F7941E]"
                      : "text-gray-700 hover:text-[#F7941E] hover:bg-orange-50"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.children && (
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                {/* Child Links */}
                {item.children && (
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openDropdown === item.name
                        ? "max-h-60 opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 flex flex-col space-y-1">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          onClick={(e) => {
                            if (child.name === "Case Studies") {
                              e.preventDefault();
                              setCaseStudiesModalOpen(true);
                            }
                            setMenuOpen(false);
                          }}
                          className="py-2.5 px-5 rounded-lg text-gray-600 hover:text-[#F7941E] hover:bg-orange-50 transition-all duration-300"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => {
                setQuoteSource("Get Quote");
                setQuoteModalOpen(true);
                setMenuOpen(false);
              }}
              className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-[#F7941E] to-[#E8850D] text-white font-semibold rounded-full hover:shadow-md hover:shadow-orange-400/40 transition-all duration-300"
            >
              Get Quote
            </button>
          </nav>
        </div>
      </header>

      {/* Quote Modal */}
      {quoteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setQuoteModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 z-10 transform scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-300"
            >
              <X size={20} />
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
