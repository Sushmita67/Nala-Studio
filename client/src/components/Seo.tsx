import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { BRAND } from '../config';

const titles: Record<string, string> = {
  '/': 'NALA Studio Kathmandu | Nails, Lashes, Makeup & Beauty Education',
  '/about': 'About NALA Studio | Premium Beauty Studio in Kathmandu',
  '/services': 'Services | Nail Salon & Lash Extensions Kathmandu | NALA Studio',
  '/gallery': 'Gallery | NALA Studio Kathmandu',
  '/courses': 'Nail & Lash Courses Kathmandu | NALA Studio',
  '/contact': 'Contact NALA Studio | Phulbari, Kathmandu',
  '/book': 'Book Appointment | NALA Studio Kathmandu',
  '/verify': 'Verify Certificate | NALA Studio',
};

const description =
  'NALA Studio in Kathmandu offers premium gel nails, nail extensions, eyelash extensions, makeup and professional beauty courses. Located at Triple Seven Complex, Phulbari.';

const Seo: React.FC = () => {
  const location = useLocation();
  const { content } = useStudio();

  useEffect(() => {
    const title = titles[location.pathname] || titles['/'];
    document.title = title;

    const setMeta = (name: string, contentValue: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = contentValue;
    };

    setMeta('description', description);
    setMeta('keywords', 'Nala Studio Kathmandu, nail salon Kathmandu, nails Kathmandu, nail extensions Kathmandu, gel nails Kathmandu, eyelash extensions Kathmandu, nail courses Kathmandu, lash courses Kathmandu');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', BRAND.website, true);
    setMeta('og:image', content.heroImage, true);
    setMeta('twitter:card', 'summary_large_image');

    let script = document.getElementById('nala-ld-json') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'nala-ld-json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': ['BeautySalon', 'NailSalon'],
      name: 'NALA Studio',
      description,
      url: BRAND.website,
      telephone: content.phone,
      image: content.heroImage,
      address: {
        '@type': 'PostalAddress',
        streetAddress: content.addressLine1,
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      geo: {
        '@type': 'GeoCoordinates',
        address: `${content.addressLine1}, ${content.addressLine2}`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: content.googleRating,
        reviewCount: content.googleReviewCount,
      },
      sameAs: [content.instagramUrl, content.facebookUrl].filter(Boolean),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '10:00',
          closes: '19:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '11:00',
          closes: '18:00',
        },
      ],
    });
  }, [location.pathname, content]);

  return null;
};

export default Seo;
