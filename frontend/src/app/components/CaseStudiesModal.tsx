"use client";

import { useState } from "react";
import { FileText, Download, Mail, X } from "lucide-react";

interface CaseStudiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseStudiesModal({ isOpen, onClose }: CaseStudiesModalProps) {
  const [email, setEmail] = useState("");
  const [pdf, setPdf] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [pdfTouched, setPdfTouched] = useState(false);

  const caseStudies = [
    { file: "/SRCC AIVision website  flyer.pdf", title: "AI Vision Technology" },
    { file: "/SRCC CNG Website Flyer Design.pdf", title: "CNG Fleet Management" },
    { file: "/SRCC Tipper Case Study Website Flyer.pdf", title: "Tipper Operations" },
  ];

  const validateEmail = (email: string): string => {
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
    if (localPart.length < 3) {
      return "Please enter a valid email address";
    }
    
    // Block purely numeric or random character sequences
    if (/^[0-9]+$/.test(localPart)) {
      return "Please enter a valid email address";
    }
    
    // Block patterns like: xyz12, abc123, test123, random123, etc.
    const hasOnlyRandomPattern = /^[a-z]{1,4}\d+$/i.test(localPart);
    if (hasOnlyRandomPattern) {
      return "Please enter a valid email address";
    }
    
    // Block excessive numbers at the end (more than 4 digits suggests random/fake)
    if (/\d{5,}/.test(localPart)) {
      return "Please enter a valid email address";
    }
    
    // Ensure domain has valid structure
    if (!domainLower || !domainLower.includes('.')) {
      return "Please enter a valid email domain";
    }
    
    // Check for valid TLD
    const tld = domainLower.split('.').pop();
    if (!tld || tld.length < 2) {
      return "Please enter a valid email domain";
    }
    
    return "";
  };

  const validatePdf = (pdf: string): string => {
    if (!pdf.trim()) return "Please select a case study";
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPdf(value);
    if (pdfTouched) {
      setPdfError(validatePdf(value));
    }
  };

  const handlePdfBlur = () => {
    setPdfTouched(true);
    setPdfError(validatePdf(pdf));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValidation = validateEmail(email);
    const pdfValidation = validatePdf(pdf);
    
    setEmailTouched(true);
    setPdfTouched(true);
    setEmailError(emailValidation);
    setPdfError(pdfValidation);
    
    // If there are errors, don't submit
    if (emailValidation || pdfValidation) {
      return;
    }
    
    setIsSubmitting(true);

    await fetch("http://localhost:3000/api/send-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pdf }),
    });

    await new Promise(resolve => setTimeout(resolve, 800));

    if (pdf === "all") {
      caseStudies.forEach((study, i) => {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = `/case-studies/${study.file}`;
          link.download = study.file;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, i * 600);
      });
    } else {
      const link = document.createElement("a");
      link.href = `/case-studies/${pdf}`;
      link.download = pdf;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setEmail("");
    setPdf("");
    setEmailError("");
    setPdfError("");
    setEmailTouched(false);
    setPdfTouched(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="absolute inset-0 backdrop-blur-md bg-black/20"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F7941E] flex items-center justify-center flex-shrink-0">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Download Case Study</h2>
              <p className="text-xs text-slate-300">Get insights into our solutions</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`
                  w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border-2
                  ${emailError && emailTouched ? 'border-red-500' : 'border-slate-200'}
                  bg-white text-gray-800 placeholder-gray-500
                  ${emailError && emailTouched ? 'focus:border-red-500 focus:ring-red-50' : 'focus:border-[#F7941E] focus:ring-orange-50'}
                  focus:ring-2 outline-none transition-all
                `}
              />
            </div>
            {emailError && emailTouched && (
              <p className="text-red-500 text-xs mt-1.5">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Case Study
            </label>
            <div className="relative">
              <Download className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <select
                value={pdf}
                onChange={handlePdfChange}
                onBlur={handlePdfBlur}
                className={`
                  w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border-2
                  ${pdfError && pdfTouched ? 'border-red-500' : 'border-slate-200'}
                  bg-white text-gray-800 placeholder-gray-500
                  ${pdfError && pdfTouched ? 'focus:border-red-500 focus:ring-red-50' : 'focus:border-[#F7941E] focus:ring-orange-50'}
                  focus:ring-2 outline-none transition-all appearance-none cursor-pointer
                `}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                <option value="">Choose a case study...</option>
                {caseStudies.map((study) => (
                  <option key={study.file} value={study.file}>
                    {study.title}
                  </option>
                ))}
                <option value="all">All Case Studies (ZIP)</option>
              </select>
            </div>
            {pdfError && pdfTouched && (
              <p className="text-red-500 text-xs mt-1.5">{pdfError}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#F7941E] to-orange-600 text-white font-semibold py-2.5 text-sm rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download Now</span>
              </>
            )}
          </button>

          <p className="text-xs text-center text-slate-500 pt-1">
            We respect your privacy and data security
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}