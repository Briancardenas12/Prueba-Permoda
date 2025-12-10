import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsTable from "./components/ProductsTable";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5296/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los productos", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <ProductsTable products={products} />
    </div>
  );
}

export default App;
