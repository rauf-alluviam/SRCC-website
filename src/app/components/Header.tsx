"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    children: [
      { name: "Container Transport", href: "/Services",  },
      { name: "OEM & AutoMove Transport", href: "/Services" },
      { name: "Tipper Movement", href: "/Services" },
      { name: "Air Cargo Movement", href: "/Services" },
    ],
  },
  {
    name: "Fleet",
    children: [
      { name: "Our Vehicles", href: "/fleet/vehicles" },
      { name: "Maintenance Center", href: "/fleet/maintenance" },
      { name: "Sustainability Dashboard", href: "/fleet/sustainability" },
    ],
  },
  {
    name: "Technology",
    children: [
      { name: "Alvision EXIM™ Platform", href: "/technology" },
      { name: "SRE Lock System", href: "/technology" },
      { name: "Request Free Demo", href: "/technology" },
    ],
  },
  {
    name: "Resources",
    children: [
      { name: "Case Studies", href: "/resources/case-studies" },
      { name: "Customer Learning Center", href: "/resources/learning" },
      { name: "Industries We Serve", href: "/resources/industries" },
    ],
  },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load saved theme or system preference
  // useEffect(() => {
  //   const saved = localStorage.getItem('theme');
  //   if (saved === 'dark') {
  //     document.documentElement.classList.add('dark');
  //     setTheme('dark');
  //   } else if (saved === 'light') {
  //     document.documentElement.classList.remove('dark');
  //     setTheme('light');
  //   } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     document.documentElement.classList.add('dark');
  //     setTheme('dark');
  //   }
  // }, []);

  // const toggleTheme = () => {
  //   if (theme === 'light') {
  //     document.documentElement.classList.add('dark');
  //     setTheme('dark');
  //     localStorage.setItem('theme', 'dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //     setTheme('light');
  //     localStorage.setItem('theme', 'light');
  //   }
  // };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-md"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setActive("Home")}
            className="flex items-center space-x-2"
          >
            <Image
              src="/truck.png"
              alt="SRCC Truck"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                SRCC
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 font-medium">
                Logistics & Transportation
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-gray-700 dark:text-gray-300">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href || "#"}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center gap-1 text-sm lg:text-base font-medium transition-colors ${
                    active === item.name
                      ? "text-red-600"
                      : "hover:text-red-600"
                  }`}
                >
                  {item.name}
                  {item.children && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 w-48 lg:w-56"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow"
            >
              {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
            </button> */}

            {/* Get Quote Button */}
            <Link
              href="/get-quote"
              className="hidden md:inline-block px-4 py-2 bg-red-600 text-white text-sm sm:text-base font-medium rounded-full shadow hover:bg-red-700 transition"
            >
              Get Quote
            </Link>

            {/* Mobile Menu Btn */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <nav className="flex flex-col px-4 py-4 space-y-3 text-gray-700 dark:text-gray-300">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                    className={`w-full flex items-center justify-between text-sm sm:text-base font-medium ${
                      active === item.name
                        ? "text-red-600"
                        : "hover:text-red-600"
                    }`}
                  >
                    {item.name}
                    {item.children && <ChevronDown size={16} />}
                  </button>

                  {/* Mobile Dropdown */}
                  {item.children && openDropdown === item.name && (
                    <div className="ml-4 mt-2 flex flex-col space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="text-sm sm:text-base text-gray-600 dark:text-gray-200 hover:text-red-600"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile "Get Quote" Button */}
              <Link
                href="/get-quote"
                onClick={() => setMenuOpen(false)}
                className="mt-3 w-full px-4 py-2 text-center bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
              >
                Get Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
