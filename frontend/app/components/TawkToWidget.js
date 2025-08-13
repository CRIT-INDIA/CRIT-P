'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function TawkToWidget({ hideButtons }) {
  const [mounted, setMounted] = useState(false);
  const TAWK_TO_KEY = '6890795160925719231fc7d5';
  const TAWK_TO_SRC = `https://embed.tawk.to/${TAWK_TO_KEY}/1j1q5jq00`;

  useEffect(() => {
    setMounted(true);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      /* Override Tawk.to icon font */
      .tawk-icon,
      .tawk-icon:before,
      .tawk-icon:after {
        font-family: 'Font Awesome 5 Free' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Replace specific icons if needed */
      .tawk-icon-chat:before {
        content: '\\f075' !important; /* Font Awesome chat icon */
      }
      
      iframe[title*="Tawk"] {
        transition: opacity 0.3s, transform 0.3s !important;
      }
      .tawk-button-container {
        transition: opacity 0.3s !important;
      }
      .hide-tawk-widget .tawk-button-container {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Initialize Tawk.to
    if (window.Tawk_API) {
      window.Tawk_API.onLoad = function() {
      };
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Only render on client-side
  if (!mounted) return null;

  return (
    <div className={`fixed bottom-24 right-8 z-40 transition-opacity duration-300 ${hideButtons ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        src={TAWK_TO_SRC}
        crossOrigin="*"
        onError={(e) => console.error('Tawk.to script failed to load', e)}
      />
    </div>
  );
}
