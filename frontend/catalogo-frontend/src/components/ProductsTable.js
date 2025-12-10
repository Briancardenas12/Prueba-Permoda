import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    sku: "",
    precio: "",
    stock: "",
    categoria: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔄 Cargar lista de productos
  const loadProducts = () => {
    axios
      .get("http://localhost:5296/api/products")
      .then((response) => {
        setProducts(response.data);
        setFiltered(response.data);
      })
      .catch((error) => console.error(error));
  };

  // 🔍 Búsqueda por nombre o SKU
  const handleSearch = (text) => {
    setSearch(text);

    const results = products.filter(
      (p) =>
        p.nombre.toLowerCase().includes(text.toLowerCase()) ||
        p.sku.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(results);
  };

  // 📝 Manejar cambios del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Crear producto
  const handleCreate = (e) => {
    e.preventDefault();

    // Validaciones simples
    if (
      !form.nombre ||
      !form.sku ||
      !form.precio ||
      !form.stock ||
      !form.categoria
    ) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    if (form.precio < 0 || form.stock < 0) {
      setMessage("Precio y Stock deben ser mayores o iguales a 0.");
      return;
    }

    axios
      .post("http://localhost:5296/api/products", {
        ...form,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
      })
      .then(() => {
        setMessage("Producto creado con éxito ✔");
        setForm({
          nombre: "",
          sku: "",
          precio: "",
          stock: "",
          categoria: "",
        });
        loadProducts(); // Refresca la tabla
      })
      .catch((err) => {
        setMessage("Error al crear producto ❌");
        console.error(err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catálogo de Productos</h1>

      {/* 📌 Mensaje */}
      {message && (
        <p
          style={{
            background: "#eee",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          {message}
        </p>
      )}

      {/* ➕ FORMULARIO */}
      <form
        onSubmit={handleCreate}
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "400px",
          marginBottom: "30px",
        }}
      >
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        <input
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Crear Producto
        </button>
      </form>

      {/* 🔍 Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o SKU..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "15px",
          width: "300px",
          fontSize: "14px",
        }}
      />

      {/* 📋 Tabla */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>SKU</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product.id}>
              <td>{product.nombre}</td>
              <td>{product.sku}</td>
              <td>${product.precio}</td>
              <td>{product.stock}</td>
              <td>{product.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
