import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("TODOS");
  const [loading, setLoading] = useState(true);

  const obtenerProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const categorias = [
    "TODOS",
    ...new Set(productos.map(p => p.categoria).filter(Boolean))
  ];

  const productosFiltrados = productos.filter(p => {
    const coincideNombre = p.descripcion
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "TODOS" || p.categoria === categoria;

    return coincideNombre && coincideCategoria;
  });

  return (
    <main>
      <section className="hero">
        <div>
          <h1>Nova Salud</h1>
          <p>Sistema de ventas para productos de botica, rápido y sencillo.</p>
        </div>
      </section>

      <section className="filters">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </section>

      {loading ? (
        <div className="loader">Cargando productos...</div>
      ) : (
        <section className="grid-products">
          {productosFiltrados.map(producto => (
            <ProductCard
              key={producto.id_producto}
              producto={producto}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;