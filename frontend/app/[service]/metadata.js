import { fetch } from 'next/dist/compiled/@edge-runtime/primitives/fetch';

// This is a server component that generates metadata for service pages
export async function generateMetadata({ params }) {
  // Await the params object as required by Next.js 15+
  const { service } = await params;
  
  try {
    // Fetch the service data from the public directory
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/json/data/masterdata.json`);
    const data = await response.json();
    
    // Find the service data
    const serviceData = data.services?.find(s => 
      s.id === service || 
      s.slug === `${service}-services` ||
      s.slug === service
    );
    
    if (!serviceData) {
      return getDefaultMetadata(service);
    }
    
    const title = serviceData.fullTitle || serviceData.title || formatServiceName(service);
    const description = serviceData.description || 'Expert SAP consulting and implementation services';
    const imageUrl = serviceData.image || 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif';
    const url = `https://www.critindia.com/${service}`;
    
    return {
      title: `${title} | CRIT India - SAP Consulting & Implementation Experts`,
      description: description,
      metadataBase: new URL('https://www.critindia.com'),
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: `${title} | CRIT India`,
        description: description,
        url: url,
        siteName: 'CRIT India',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | CRIT India`,
        description: description,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      additionalMetaTags: [
        {
          property: 'article:modified_time',
          content: new Date().toISOString(),
        },
      ],
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return getDefaultMetadata(service);
  }
}

// Helper function to format service name
function formatServiceName(str) {
  if (!str) return 'SAP Services';
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Default metadata when service is not found
function getDefaultMetadata(service) {
  const title = formatServiceName(service);
  return {
    title: `${title} | CRIT India - SAP Consulting & Implementation Experts`,
    description: 'Expert SAP consulting and implementation services for your business needs.',
    openGraph: {
      title: `${title} | CRIT India`,
      description: 'Expert SAP consulting and implementation services for your business needs.',
      images: [
        {
          url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif',
          width: 1200,
          height: 630,
          alt: 'CRIT India - SAP Consulting',
        },
      ],
    },
  };
}
