
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { gsap } from 'gsap';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    
    // Animation for navbar
    gsap.from('.nav-item', {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      delay: 0.2
    });
  }, [location.pathname]);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="page-container flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold tracking-tight">
            ComfyStitch
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.path} 
              className={`nav-item text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path 
                  ? 'text-primary border-b border-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="nav-item p-2 rounded-full hover:bg-secondary">
            <Search size={20} />
          </Link>
          <Link to="/login" className="nav-item p-2 rounded-full hover:bg-secondary">
            <User size={20} />
          </Link>
          <Link to="/cart" className="nav-item p-2 rounded-full hover:bg-secondary relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Link to="/cart" className="p-2 relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background border-b border-border animate-fade-in">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path} 
                className={`text-sm font-medium py-2 px-4 rounded-md ${
                  location.pathname === link.path 
                    ? 'bg-secondary text-primary' 
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              <Link to="/login" className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-secondary/50">
                <User size={18} />
                <span>Login / Sign Up</span>
              </Link>
              <Link to="/search" className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-secondary/50">
                <Search size={18} />
                <span>Search</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
