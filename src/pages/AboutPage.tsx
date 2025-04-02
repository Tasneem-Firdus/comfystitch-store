
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.from('.about-header-content', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    
    // Our Story animation
    if (storyRef.current) {
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top bottom-=100',
        }
      });
      
      storyTl.from('.story-image', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
      .from('.story-content', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6');
    }
    
    // Values animation
    if (valuesRef.current) {
      gsap.from('.value-item', {
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top bottom-=100',
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
    
    // Team animation
    if (teamRef.current) {
      gsap.from('.team-member', {
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top bottom-=100',
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Team members data
  const teamMembers = [
    {
      name: 'Olivia Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Ethan Williams',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Sophia Martinez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Noah Thompson',
      role: 'Supply Chain Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
    }
  ];
  
  return (
    <div>
      {/* Header */}
      <section ref={headerRef} className="py-20 bg-secondary">
        <div className="page-container text-center">
          <div className="about-header-content max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">About ComfyStitch</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're on a mission to create comfortable, sustainable clothing that looks good and feels even better.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section ref={storyRef} className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Our story"
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div className="story-content space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                ComfyStitch was founded in 2018 with a simple idea: create clothing that people would love to wear every day. Our founder, Olivia Johnson, was frustrated with the fast fashion industry's approach to clothing - cheap materials, poor construction, and designs that quickly went out of style.
              </p>
              <p className="text-muted-foreground">
                Starting with just a small collection of essential items, we focused on quality materials and timeless designs. Our commitment to comfortable, durable clothing quickly resonated with customers who were looking for pieces that would last longer than a single season.
              </p>
              <p className="text-muted-foreground">
                Today, we've grown into a brand known for our attention to detail, commitment to sustainability, and dedication to creating clothing that makes you feel good. We believe that comfort and style should go hand in hand, and that's what drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section ref={valuesRef} className="py-20 bg-secondary">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from design to delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value-item bg-background rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental impact through sustainable materials, ethical manufacturing, and eco-friendly packaging.
              </p>
            </div>
            
            <div className="value-item bg-background rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 9 3-3 3 3"></path>
                  <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
                  <path d="m22 15-3 3-3-3"></path>
                  <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We believe in creating clothing that lasts. Our commitment to quality materials and craftsmanship ensures that every piece stands the test of time.
              </p>
            </div>
            
            <div className="value-item bg-background rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9 10a3 3 0 0 1 3-3 3 3 0 0 1 3 3v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfort</h3>
              <p className="text-muted-foreground">
                Comfort is at the heart of everything we create. We design clothing that feels good to wear all day, every day.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section ref={teamRef} className="py-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind ComfyStitch who make it all happen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member text-center">
                <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
