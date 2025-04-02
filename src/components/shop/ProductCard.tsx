
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Product } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(`.quick-actions-${product.id}`, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(`.quick-actions-${product.id}`, {
      y: 10,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    // Animation for add to cart
    gsap.to(`.product-card-${product.id}`, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(`.product-card-${product.id}`, {
          scale: 1,
          duration: 0.2,
          ease: 'power1.in'
        });
      }
    });
  };
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className={cn(
        `product-card product-card-${product.id}`,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-card-image">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Quick action buttons */}
        <div 
          className={`quick-actions-${product.id} absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex justify-center space-x-2 transform translate-y-10 opacity-0`}
        >
          <Button 
            size="sm" 
            variant="secondary" 
            className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
          </Button>
          <Button 
            size="sm"
            variant="secondary"
            className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
            asChild
          >
            <div>
              <Eye size={16} />
            </div>
          </Button>
        </div>
      </div>
      
      <div className="product-card-content">
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-medium">${product.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
