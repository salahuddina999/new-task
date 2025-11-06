import axios from "axios";
import React from "react";

import { useProducts } from "./ProductContext";
const products = [
  { id: 1, name: "Wireless Headphones", price: 4999, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Smart Watch", price: 9999, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Bluetooth Speaker", price: 2999, image: "https://via.placeholder.com/150" },
];

export default function ProductList() {
  const { products } = useProducts();

  if (!products.length) return <p>Loading products...</p>;


  const handleCheckout = async (product) => {
    console.log(product);
    
    const response = axios.post(
      "http://localhost:4242/create-checkout-session",
      { product }, 
      {
        headers: { "Content-Type": "application/json" }, 
      }
    );

    const { url } = (await response).data
    window.location.href = url;
    
  };

  return (
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    padding: "20px",
  }}
>
  {products.map((product) => (
    <div
      key={product.id}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "320px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)")
      }
    >
      <div>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginTop: "12px",
            color: "#111827",
          }}
        >
          {product.title}
        </h3>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#10b981",
            margin: "8px 0",
          }}
        >
          ${ (product.price / 100).toFixed(2) }
        </p>
      </div>

      <button
        onClick={() => handleCheckout(product)}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 0",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "auto",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
      >
        Buy Now
      </button>
    </div>
  ))}
</div>

  );
}
