
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Heart, 
  Share,
  Plus, 
  Minus,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getRelatedProducts } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const imagesRef = useRef<HTMLDivElement>(null);
  
  // Images for product gallery (using the same image for demo purposes)
  const productImages = product ? [
    product.image,
    product.image.replace('w=600', 'w=601'), // Fake different images
    product.image.replace('w=600', 'w=602'),
    product.image.replace('w=600', 'w=603')
  ] : [];
  
  // Related products
  const relatedProducts = product ? getRelatedProducts(product) : [];
  
  // Handle quantity change
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      
      // Animation
      gsap.to('.add-to-cart-btn', {
        scale: 1.05,
        duration: 0.2,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to('.add-to-cart-btn', {
            scale: 1,
            duration: 0.2,
            ease: 'power1.in'
          });
        }
      });
    }
  };
  
  // Change selected image
  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };
  
  useEffect(() => {
    // If product not found, redirect to shop
    if (!product && productId !== 0) {
      navigate('/shop');
      return;
    }
    
    // Reset quantity and selected image when product changes
    setQuantity(1);
    setSelectedImage(0);
    
    // Animations
    if (product) {
      const tl = gsap.timeline();
      
      tl.from('.product-image', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power2.out'
      })
      .from('.product-details', {
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.product-thumbnails .thumbnail', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3');
      
      // Related products animation
      gsap.from('.related-product', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.related-products',
          start: 'top bottom-=100',
        }
      });
    }
  }, [product, productId, navigate]);
  
  if (!product) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="py-12">
      <div className="page-container">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to={`/shop?category=${product.category}`} className="capitalize hover:text-primary">
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="product-image border border-border rounded-lg overflow-hidden h-[500px]">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="product-thumbnails flex space-x-4 overflow-x-auto" ref={imagesRef}>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`thumbnail border rounded-md overflow-hidden w-20 h-20 flex-shrink-0 transition-all ${
                    selectedImage === index ? 'border-primary ring-1 ring-primary' : 'border-border'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="product-details space-y-6">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="text-muted-foreground mb-4 -ml-2 hover:bg-transparent hover:text-primary"
            >
              <Link to="/shop" className="flex items-center">
                <ArrowLeft size={16} className="mr-1" />
                Back to shop
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <p className="text-2xl font-semibold text-primary">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="border-t border-border pt-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Category:</span>
              <Link 
                to={`/shop?category=${product.category}`} 
                className="text-sm capitalize hover:text-primary"
              >
                {product.category}
              </Link>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="flex flex-col space-y-6">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-r-none"
                    >
                      <Minus size={16} />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 h-10 text-center rounded-none border-x-0"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      className="h-10 w-10 rounded-l-none"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="add-to-cart-btn flex-1 flex items-center justify-center"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                    <Heart size={18} />
                  </Button>
                  
                  <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                    <Share size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 related-products">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  className="related-product" 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
