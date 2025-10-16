"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, source }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    
    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    
    if (email.length > 100) return "Email must be less than 100 characters";
    
    // Extract local part and domain
    const [localPart, domain] = email.split('@');
    const domainLower = domain?.toLowerCase();
    
    // List of common temporary/fake email domains to block
    const blockedDomains = [
      'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
      'mailinator.com', 'maildrop.cc', 'trashmail.com', 'yopmail.com',
      'fakeinbox.com', 'temp-mail.org', 'getnada.com', 'dispostable.com',
      'sharklasers.com', 'guerrillamail.info', 'grr.la', 'guerrillamail.biz',
      'guerrillamail.org', 'guerrillamail.de', 'spam4.me', 'mintemail.com',
      'mailnesia.com', 'emailondeck.com', 'throwawaymail.com', 'mytemp.email',
      'mohmal.com', 'rootfest.net', 'tmpeml.info', 'anonbox.net',
      'test.com', 'example.com', 'fake.com', 'dummy.com', 'invalid.com'
    ];
    
    if (blockedDomains.includes(domainLower)) {
      return "Please use a valid business or personal email address";
    }
    
    // Block emails with suspicious patterns
    if (/test|fake|dummy|spam|trash|temp|disposable/i.test(email)) {
      return "Please enter a real email address";
    }
    
    // Check for random/gibberish patterns in local part
    // Block if local part is too short (less than 3 chars) or looks random
    if (localPart.length < 3) {
      return "Please enter a valid email address";
    }
    
    // Block purely numeric or random character sequences
    if (/^[0-9]+$/.test(localPart)) {
      return "Please enter a valid email address";
    }
    
    // Block patterns like: xyz12, abc123, test123, random123, etc.
    // Must have at least some meaningful structure
    const hasOnlyRandomPattern = /^[a-z]{1,4}\d+$/i.test(localPart);
    if (hasOnlyRandomPattern) {
      return "Please enter a valid email address";
    }
    
    // Block excessive numbers at the end (more than 4 digits suggests random/fake)
    if (/\d{5,}/.test(localPart)) {
      return "Please enter a valid email address";
    }
    
    // Ensure domain has valid structure (must have at least one dot after @)
    if (!domainLower || !domainLower.includes('.')) {
      return "Please enter a valid email domain";
    }
    
    // Check for valid TLD (at least 2 characters)
    const tld = domainLower.split('.').pop();
    if (!tld || tld.length < 2) {
      return "Please enter a valid email domain";
    }
    
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return "Phone number is required";
    // Remove spaces, hyphens, and parentheses for validation
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    if (!/^\+?\d{10,15}$/.test(cleanPhone)) {
      return "Phone number must be 10-15 digits";
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (message.trim().length > 500) return "Message must be less than 500 characters";
    return undefined;
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      case "message":
        return validateMessage(value);
      default:
        return undefined;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) setSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  const getTitle = () => {
    if (source === "Get a Quote" || source === "Track Shipment") return "Request a Quote";
    if (source === "Try SRE Lock Free") return "Try SRE Lock Free";
    if (source === "Download Case Study") return "Download Case Study";
    if (source === "Book a CNG Truck Now" || source === "Book CNG Truck") return "Book a CNG Truck";
    return "Contact Us";
  };

  const getButtonText = () => {
    if (loading) return "Sending...";
    if (source === "Try SRE Lock Free") return "Request Free Trial";
    if (source === "Download Case Study") return "Download Now";
    if (source === "Book a CNG Truck Now" || source === "Book CNG Truck") return "Book Now";
    return "Submit";
  };

  const getMessagePlaceholder = () => {
    if (source === "Try SRE Lock Free") return "Any specific requirements for your trial?";
    if (source === "Download Case Study") return "Enter your company or interest";
    if (source === "Book a CNG Truck Now" || source === "Book CNG Truck")
      return "Enter pickup location, date, and any requirements";
    return "Your message";
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4 [color-scheme:light]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-[#F7941E] transition"
            onClick={handleClose}
          >
            ✕
          </button>

          {!submitted ? (
            <>
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img src="/logo.png" alt="SRCC Logo" className="h-14 sm:h-16" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-[#F7941E] mb-3 text-center">
                {getTitle()}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Fill in your details and our team will get back to you promptly.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border ${
                      errors.name && touched.name ? "border-red-500" : "border-gray-300"
                    } bg-[#F9FAFB] text-gray-800 placeholder:text-gray-500 p-3 rounded-xl focus:outline-none focus:ring-2 ${
                      errors.name && touched.name ? "focus:ring-red-500" : "focus:ring-[#F7941E]"
                    } transition shadow-sm`}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border ${
                      errors.email && touched.email ? "border-red-500" : "border-gray-300"
                    } bg-[#F9FAFB] text-gray-800 placeholder:text-gray-500 p-3 rounded-xl focus:outline-none focus:ring-2 ${
                      errors.email && touched.email ? "focus:ring-red-500" : "focus:ring-[#F7941E]"
                    } transition shadow-sm`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border ${
                      errors.phone && touched.phone ? "border-red-500" : "border-gray-300"
                    } bg-[#F9FAFB] text-gray-800 placeholder:text-gray-500 p-3 rounded-xl focus:outline-none focus:ring-2 ${
                      errors.phone && touched.phone ? "focus:ring-red-500" : "focus:ring-[#F7941E]"
                    } transition shadow-sm`}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder={getMessagePlaceholder()}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border ${
                      errors.message && touched.message ? "border-red-500" : "border-gray-300"
                    } bg-[#F9FAFB] text-gray-800 placeholder:text-gray-500 p-3 rounded-xl focus:outline-none focus:ring-2 ${
                      errors.message && touched.message ? "focus:ring-red-500" : "focus:ring-[#F7941E]"
                    } transition shadow-sm resize-none h-28`}
                  />
                  {errors.message && touched.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {getButtonText()}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-green-600 text-lg font-semibold mb-2">
                Your request has been received!
              </p>
              <p className="text-gray-600 mb-4">We'll respond to you soon.</p>
              <button
                onClick={handleClose}
                className="bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteModal;