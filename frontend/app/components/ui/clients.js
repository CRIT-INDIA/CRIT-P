import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

const MovingClientsSection = () => {
  // Client data with explicit dimensions and placeholder aspect ratio
  const clients = [
    { 
      name: 'Binstellar', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945853/Binstellar_fzcqil.avif',
      width: 160,
      height: 90,
      aspectRatio: 16/9
    },
    { 
      name: 'SFMS', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/SFMS_bu6too.avif',
      width: 160,
      height: 90,
      aspectRatio: 16/9
    },
    
    { 
      name: 'EPN', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/EPN_aniiah.avif',
      width: 160,
      height: 90,
      aspectRatio: 16/9
    },
    { 
      name: 'Protergia', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/protergia_uwbnzm.avif',
      width: 160,
      height: 90,
      aspectRatio: 16/9
    },
    { 
      name: 'NXI', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/NXI_a3a0yi.avif',
      width: 160,
      height: 90,
      aspectRatio: 16/9
    },
    { 
      name: 'Brihati', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753946455/Brihati_1_uoswjm.avif',
      width: 160,
      height: 90,
      aspectRatio: 16/9
    },
    { 
      name: 'VP techno labs', 
      logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/VPTechnoLabsFinal_fieg3m.avif',
      width: 160,
      height: 90,
      aspectRatio: 16/9
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
      <Head>
        {clients.slice(0, 3).map((client) => (
          <link 
            key={`preload-${client.name}`} 
            rel="preload" 
            as="image"
            href={client.logo}
            fetchPriority="high"
          />
        ))}
      </Head>
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

      <div className="w-full bg-[#00203F] drop-shadow-lg rounded-lg p-1">
        <div className="relative overflow-hidden group">
          <div className="flex items-start animate-marquee">
            {duplicatedClients.map((client, index) => (
              <div 
                key={`${client.name}-${index}`}
                className="flex-shrink-0 mx-6 flex flex-col items-center"
                style={{
                  width: `${client.width}px`,
                  position: 'relative',
                  flexShrink: 0,
                  padding: '10px 0' // Added padding for better spacing
                }}
              >
                <div 
                  className="relative bg-white rounded-sm flex items-center justify-center p-3"
                  style={{
                    width: '100%',
                    height: `${client.height}px`,
                    aspectRatio: '16/9',
                    marginBottom: '12px' // Space between logo and name
                  }}
                >
                  {isMounted && (
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={client.width - 24}
                      height={client.height - 24}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                      sizes={`(max-width: 768px) ${client.width/2}px, ${client.width}px`}
                      loading={index < 4 ? 'eager' : 'lazy'}
                      priority={index < 2}
                    />
                  )}
                </div>
                <div 
                  className="w-full text-center text-sm text-white font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    color: '#ffffff',
                    fontWeight: 500,
                    padding: '4px 0',
                    height: '24px',
                    lineHeight: '24px',
                    display: 'block',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    maxWidth: '100%'
                  }}
                >
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