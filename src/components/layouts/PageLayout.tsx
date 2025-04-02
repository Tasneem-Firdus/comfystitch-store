
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { gsap } from 'gsap';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Page transition animation on route change
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main ref={mainRef} className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
