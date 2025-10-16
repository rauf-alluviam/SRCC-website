// src/app/ClientLayout.tsx
"use client";

import CustomCursorWrapper from "./components/CustomCursorWrapper";
import WhatsAppChatWrapper from "./components/WhatsAppChatWrapper";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursorWrapper />
      <WhatsAppChatWrapper />
      {children}
    </>
  );
}
