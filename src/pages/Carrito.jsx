import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const Carrito = () => {
  const {
    carrito,
    aumentar,
    disminuir,
    eliminar,
    total
  } = useCart();

  if (carrito.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn-primary">Ver productos</Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <h2>Carrito de compras</h2>

      {carrito.map(item => (
        <div className="cart-item" key={item.id_producto}>
          <img src={`/${item.img || "img/default.jpg"}`} alt={item.descripcion} />

          <div>
            <h3>{item.descripcion}</h3>
            <p>S/ {Number(item.precio).toFixed(2)}</p>
            <p>Subtotal: S/ {(item.precio * item.cantidad).toFixed(2)}</p>
          </div>

          <div className="quantity">
            <button onClick={() => disminuir(item.id_producto)}>-</button>
            <span>{item.cantidad}</span>
            <button onClick={() => aumentar(item.id_producto)}>+</button>
          </div>

          <button className="delete" onClick={() => eliminar(item.id_producto)}>
            <FaTrash />
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h2>Total: S/ {total.toFixed(2)}</h2>
        <Link to="/checkout" className="btn-primary">
          Ir a pagar con Yape
        </Link>
      </div>
    </section>
  );
};

export default Carrito;