import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const MovingClientsSection = () => {
  // Client data with explicit dimensions
  const clients = [
    { 
      name: 'Binstellar', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945853/Binstellar_fzcqil.avif',
      width: 150,
      height: 100
    },
    { 
      name: 'SFMS', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/SFMS_bu6too.avif',
      width: 150,
      height: 100
    },
    
    { 
      name: 'EPN', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/EPN_aniiah.avif',
      width: 150,
      height: 100
    },
    { 
      name: 'Protergia', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/protergia_uwbnzm.avif',
      width: 150,
      height: 100
    },
    { 
      name: 'NXI', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/NXI_a3a0yi.avif',
      width: 150,
      height: 100
    },
    { 
      name: 'Brihati', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753946455/Brihati_1_uoswjm.avif',
      width: 150,
      height: 100
    },
    { 
      name: 'VP techno labs', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/VPTechnoLabsFinal_fieg3m.avif',
      width: 150,
      height: 100
    },
  ];
  
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Triple the clients array for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className=''>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          width: max-content;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 45s;
          }
        }
        @media (max-width: 480px) {
          .animate-marquee {
            animation-duration: 35s;
          }
        }
      `}</style>
      <div className="text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 inline-block relative">
    <span className="text-black">Our </span>
    <span className="text-red-500">Clients</span>
    <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="120" height="18" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18 Q 70 8, 170 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <path d="M25 21 Q 100 15, 160 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
   </h1>      </div>

      <div className="w-full bg-[#00203F] drop-shadow-lg rounded-lg md:p-2">
        {/* Preload critical images */}
        <div className="hidden p-5">
          {clients.map((client) => (
            <link 
              key={`preload-${client.name}`} 
              rel="preload" 
              as="image" 
              href={client.logo} 
              imageSrcSet={`${client.logo} 1x`}
              fetchPriority="high"
            />
          ))}
        </div>
        
        <div className="relative overflow-hidden group">
          {/* Scrolling Container */}
          <div className="flex items-center animate-marquee">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 mx-6 md:mx-10"
                style={{
                  width: `${client.width}px`,
                  height: 'auto',
                  aspectRatio: `${client.width}/${client.height}`,
                  minHeight: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  margin: '0 0.5rem'
                }}
              >
                <div 
                  className="flex items-center justify-center w-full h-full p-2 border border-white bg-white rounded-sm"
                  style={{
                    minHeight: '60px',
                    width: '100%',
                    aspectRatio: `${client.width}/${client.height}`
                  }}
                >
                  {isMounted && (
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={client.width}
                      height={client.height}
                      className="object-contain object-center opacity-90 hover:opacity-100 transition-opacity duration-300"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      priority={index < 2}
                      style={{
                        width: '100%',
                        height: '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  )}
                </div>
                <div className="w-full text-center text-xs text-white font-medium mt-1 whitespace-nowrap">
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingClientsSection;