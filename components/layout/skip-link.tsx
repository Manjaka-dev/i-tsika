"use client";

import { useState, useEffect } from "react";

export default function SkipLink() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <a
      href="#main-content"
      className={`
        fixed top-2 left-2 z-50 bg-[#fbc63d] text-[#070602] px-4 py-2 rounded-md
        transform transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fbc63d]
        ${isFocused ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Aller au contenu principal
    </a>
  );
}
