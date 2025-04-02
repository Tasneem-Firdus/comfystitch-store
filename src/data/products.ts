
import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: "Relaxed Fit T-shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "t-shirts",
    description: "A comfortable, relaxed-fit t-shirt made from 100% organic cotton. Perfect for everyday wear with a smooth finish and durable construction."
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "jeans",
    description: "Modern slim fit jeans with just the right amount of stretch for comfort. Features a classic five-pocket design and is made with sustainable materials."
  },
  {
    id: 3,
    name: "Hooded Sweatshirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "hoodies",
    description: "A cozy hoodie with a kangaroo pocket and adjustable drawstring hood. Made from a soft cotton blend that's both warm and breathable."
  },
  {
    id: 4,
    name: "Lightweight Bomber Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "jackets",
    description: "A versatile bomber jacket with a modern fit. Features a lightweight design that's perfect for transitional weather with ribbed cuffs and hem."
  },
  {
    id: 5,
    name: "Wool Blend Overcoat",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "jackets",
    description: "An elegant overcoat crafted from a premium wool blend. Features a classic design with notched lapels, two front pockets, and a comfortable lining."
  },
  {
    id: 6,
    name: "Cotton Chino Pants",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "pants",
    description: "Classic chino pants made from soft cotton twill. Features a regular fit with slight stretch for comfort and versatility."
  },
  {
    id: 7,
    name: "Graphic Print T-shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "t-shirts",
    description: "Express your style with this unique graphic print t-shirt. Made from soft cotton with a comfortable regular fit."
  },
  {
    id: 8,
    name: "Knitted Sweater",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "sweaters",
    description: "A cozy knitted sweater with a textured pattern. Perfect for chilly days with its warm yet breathable fabric."
  },
  {
    id: 9,
    name: "Denim Jacket",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "jackets",
    description: "A timeless denim jacket that gets better with age. Features a button front, chest pockets, and adjustable button cuffs."
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getFilteredProducts = (category?: string, search?: string): Product[] => {
  let filtered = [...products];
  
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
};

export const getCategories = (): string[] => {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories);
};
