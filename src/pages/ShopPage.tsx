
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { getFilteredProducts, getCategories } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Get categories
  const categories = ['all', ...getCategories()];
  
  // Filter products based on search, category, and price
  const filteredProducts = getFilteredProducts(
    selectedCategory === 'all' ? undefined : selectedCategory,
    searchQuery
  ).filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    
    setSearchParams(params);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    const params = new URLSearchParams(searchParams);
    
    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    setSearchParams(params);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 200]);
    setSearchParams({});
  };
  
  useEffect(() => {
    // Animation for products
    gsap.fromTo(
      '.product-item',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: 'power2.out',
        delay: 0.2 
      }
    );
  }, [filteredProducts]);
  
  // Set initial values from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);
  
  return (
    <div className="py-12">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Shop Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of quality clothing made for comfort and style.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 space-y-8">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Search</h3>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <button type="submit" className="absolute top-0 right-0 p-2">
                  <Search size={18} />
                </button>
              </form>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={`text-sm capitalize ${
                        selectedCategory === category
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Price Range</h3>
              <Slider
                defaultValue={[0, 200]}
                max={200}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
          
          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <Button variant="outline" onClick={() => setFiltersOpen(true)} className="flex items-center gap-2">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </Button>
            
            <form onSubmit={handleSearch} className="relative flex-1 max-w-xs ml-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <button type="submit" className="absolute top-0 right-0 p-2">
                <Search size={18} />
              </button>
            </form>
          </div>
          
          {/* Mobile Filters Panel */}
          {filtersOpen && (
            <div className="fixed inset-0 bg-background z-50 p-4 overflow-y-auto lg:hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                  <X size={24} />
                </Button>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Search</h3>
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <button type="submit" className="absolute top-0 right-0 p-2">
                      <Search size={18} />
                    </button>
                  </form>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className={`text-sm capitalize ${
                            selectedCategory === category
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Price Range</h3>
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={clearFilters} className="flex-1">
                    Clear Filters
                  </Button>
                  <Button onClick={() => setFiltersOpen(false)} className="flex-1">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} className="product-item" />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
