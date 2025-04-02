
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { ShoppingBag, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  useEffect(() => {
    // Animation for cart items
    if (cartItems.length > 0) {
      gsap.from('.cart-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [cartItems.length]);
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would normally take you to the checkout page.",
    });
  };
  
  return (
    <div className="py-12">
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-lg border border-border shadow-sm">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearCart}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <div key={item.product.id} className="cart-item">
                        <div className="flex items-center gap-4">
                          <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border border-border">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary">
                                {item.product.name}
                              </Link>
                              <span className="font-medium">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground capitalize">{item.product.category}</p>
                            
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border border-border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none rounded-l-md"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={14} />
                                </Button>
                                <span className="h-8 w-12 flex items-center justify-center text-sm">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-none rounded-r-md"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                >
                                  <Plus size={14} />
                                </Button>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                                className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 size={14} className="mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {index < cartItems.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-lg border border-border shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{getCartTotal() > 50 ? 'Free' : '$5.00'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      ${(
                        getCartTotal() + 
                        (getCartTotal() > 50 ? 0 : 5) + 
                        (getCartTotal() * 0.08)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4">
                  <Link 
                    to="/shop" 
                    className="flex items-center justify-center text-sm text-primary hover:underline"
                  >
                    <ArrowRight size={14} className="mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ShoppingCart size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/shop" className="flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
