
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Heart, Truck } from 'lucide-react';
import { products } from '@/data/products';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      const heroTl = gsap.timeline();
      
      heroTl.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-button', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-image', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.4');
    }
    
    // Featured products animation
    if (featuredRef.current) {
      gsap.from('.featured-product', {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top bottom-=100',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    
    // Categories animation
    if (categoryRef.current) {
      gsap.from('.category-item', {
        scrollTrigger: {
          trigger: categoryRef.current,
          start: 'top bottom-=100',
        },
        scale: 0.9,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.2)'
      });
    }
    
    // Info section animation
    gsap.from('.info-item', {
      scrollTrigger: {
        trigger: '.info-section',
        start: 'top bottom-=100',
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: 'power2.out'
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Featured products (show a subset of all products)
  const featuredProducts = products.slice(0, 4);
  
  // Categories
  const categories = [
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', path: '/shop?category=t-shirts' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', path: '/shop?category=jeans' },
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', path: '/shop?category=jackets' },
    { name: 'Sweaters', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', path: '/shop?category=sweaters' },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center bg-gradient-to-r from-secondary/50 to-secondary">
        <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <div className="flex flex-col justify-center">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Style & Comfort, <br />Redefined
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
              Discover our latest collection of premium clothing designed for everyday comfort and timeless style.
            </p>
            <div className="hero-button">
              <Button size="lg" asChild className="group">
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hero-image h-full hidden md:flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Fashion model wearing our clothing"
              className="rounded-lg shadow-2xl object-cover h-[70%]"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section ref={featuredRef} className="py-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular items selected just for you. Discover the best of our collection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="featured-product product-card group">
                <div className="product-card-image">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="product-card-content">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary text-lg">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild className="group">
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section ref={categoryRef} className="py-16 bg-secondary">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our collections by category to find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                to={category.path} 
                key={index} 
                className="category-item relative overflow-hidden rounded-lg h-64 group"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Info Section */}
      <section className="py-20 info-section">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="info-item text-center p-6 border border-border rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Quality Materials</h3>
              <p className="text-muted-foreground">
                We source only the finest materials to ensure comfort and durability.
              </p>
            </div>
            
            <div className="info-item text-center p-6 border border-border rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Sustainable Fashion</h3>
              <p className="text-muted-foreground">
                Our commitment to ethical and environmentally-friendly practices.
              </p>
            </div>
            
            <div className="info-item text-center p-6 border border-border rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50 and quick delivery to your door.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-8">
              Stay updated with our latest collections, exclusive offers, and style tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md bg-primary-foreground text-primary"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
