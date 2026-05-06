import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { carrito, total, limpiarCarrito } = useCart();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombres: "",
    apellidos: "",
    direccion: "",
    telefono: ""
  });

  const [metodoPago, setMetodoPago] = useState("EFECTIVO");
  const [procesando, setProcesando] = useState(false);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const registrarVenta = async () => {
    if (carrito.length === 0) {
      Swal.fire("Carrito vacío", "Agrega productos antes de vender", "warning");
      return;
    }

    if (
      !cliente.nombres.trim() ||
      !cliente.apellidos.trim() ||
      !cliente.direccion.trim() ||
      !cliente.telefono.trim()
    ) {
      Swal.fire("Datos incompletos", "Completa los datos del cliente", "warning");
      return;
    }

    try {
      setProcesando(true);

      const res = await api.post("/ventas", {
        cliente,
        carrito,
        metodo_pago: metodoPago
      });

      Swal.fire("Venta registrada", "La venta se guardó correctamente", "success");

      limpiarCarrito();

      navigate("/confirmacion", {
        state: {
          idVenta: res.data.idVenta,
          cliente,
          total: res.data.total || total,
          metodo_pago: metodoPago,
          estado_pago: "PAGADO"
        }
      });
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "No se pudo registrar la venta",
        "error"
      );
    } finally {
      setProcesando(false);
    }
  };

  return (
    <section className="checkout">
      <h2>Registrar venta</h2>

      <div className="checkout-grid">
        <div className="form-card">
          <h3>Datos del cliente</h3>

          <input
            name="nombres"
            placeholder="Nombres"
            value={cliente.nombres}
            onChange={handleChange}
          />

          <input
            name="apellidos"
            placeholder="Apellidos"
            value={cliente.apellidos}
            onChange={handleChange}
          />

          <input
            name="direccion"
            placeholder="Dirección"
            value={cliente.direccion}
            onChange={handleChange}
          />

          <input
            name="telefono"
            placeholder="Teléfono"
            value={cliente.telefono}
            onChange={handleChange}
          />

          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="EFECTIVO">Efectivo</option>
            <option value="TARJETA">Tarjeta</option>
            <option value="TRANSFERENCIA">Transferencia</option>
          </select>

          <button onClick={registrarVenta} disabled={procesando}>
            {procesando ? "Registrando..." : "Registrar venta"}
          </button>
        </div>

        <div className="summary-card">
          <h3>Resumen de venta</h3>

          {carrito.map((item) => (
            <div key={item.id_producto} className="summary-item">
              <p>{item.descripcion}</p>
              <p>x {item.cantidad}</p>
              <p>S/ {(Number(item.precio) * item.cantidad).toFixed(2)}</p>
            </div>
          ))}

          <h2 className="total-big">
            Total: S/ {Number(total).toFixed(2)}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
