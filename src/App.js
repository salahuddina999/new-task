import React, { createContext, useContext, useState, useEffect } from "react";
import ProductList from "./ProductList";
import axios from "axios";

export default function App() {
  useEffect(async () => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data); // shows array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
    return () => {
  
    };

  }, []);
  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "20px", borderWidth: "2px", borderColor: "#ccc", borderStyle: "solid", borderRadius: "8px", alignContent: 'center', alignItems: "center" }}>
      <h1 style={{ alignSelf: 'center' }}>My Task Store 🛒</h1>
      <ProductList />
    </div>
  );
}
