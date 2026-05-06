import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ producto }) => {
  const { agregarCarrito } = useCart();

  return (
    <div className="product-card">
      <img
        src={`/${producto.img || "img/default.jpg"}`}
        alt={producto.descripcion}
      />

      <div className="product-info">
        <span className="category">{producto.categoria}</span>
        <h3>{producto.descripcion}</h3>
        <p className="price">S/ {Number(producto.precio).toFixed(2)}</p>
        <p className="stock">Stock: {producto.stock}</p>

        <button onClick={() => agregarCarrito(producto)}>
          <FaCartPlus /> Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;