import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

// Custom hook
export const useProducts = () => useContext(ProductContext);

// Provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
       const categories = ["men's clothing", "women's clothing"];
const filterData = response.data.filter((c) => !categories.includes(c.category));
console.log(filterData);
        
       setProducts(filterData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
