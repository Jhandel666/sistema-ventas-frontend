import { Link } from "react-router-dom";
import { FaShoppingCart, FaPills } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cantidadTotal } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <FaPills /> Nova Salud
      </Link>

      <Link to="/carrito" className="cart-btn">
        <FaShoppingCart />
        Carrito
        <span>{cantidadTotal}</span>
      </Link>
    </nav>
  );
};

export default Navbar;