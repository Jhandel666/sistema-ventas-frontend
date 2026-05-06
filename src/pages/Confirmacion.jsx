import { Link, useLocation } from "react-router-dom";

const Confirmacion = () => {
  const { state } = useLocation();

  return (
    <section className="confirmation">
      <h1>Venta confirmada</h1>

      <div className="ticket">
        <h2>Nova Salud</h2>
        <p>Venta N°: {state?.idVenta}</p>
        <p>Cliente: {state?.cliente?.nombres} {state?.cliente?.apellidos}</p>
        <p>Método de pago: {state?.metodo_pago || "EFECTIVO"}</p>
        <p>Estado: {state?.estado_pago || "PAGADO"}</p>
        <h3>Total: S/ {Number(state?.total || 0).toFixed(2)}</h3>
      </div>

      <Link to="/" className="btn-primary">
        Nueva venta
      </Link>
    </section>
  );
};

export default Confirmacion;
