import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarCarrito = (producto) => {
    const existe = carrito.find(
      item => item.id_producto === producto.id_producto
    );

    if (existe) {
      if (existe.cantidad >= producto.stock) {
        Swal.fire("Stock insuficiente", "No hay más unidades disponibles", "warning");
        return;
      }

      setCarrito(
        carrito.map(item =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    Swal.fire({
      icon: "success",
      title: "Agregado",
      text: "Producto agregado al carrito",
      timer: 900,
      showConfirmButton: false
    });
  };

  const aumentar = (id) => {
    setCarrito(
      carrito.map(item => {
        if (item.id_producto === id) {
          if (item.cantidad >= item.stock) {
            Swal.fire("Stock insuficiente", "No puedes agregar más", "warning");
            return item;
          }
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      })
    );
  };

  const disminuir = (id) => {
    setCarrito(
      carrito.map(item =>
        item.id_producto === id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      ).filter(item => item.cantidad > 0)
    );
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter(item => item.id_producto !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce(
    (acc, item) => acc + Number(item.precio) * item.cantidad,
    0
  );

  const cantidadTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarCarrito,
        aumentar,
        disminuir,
        eliminar,
        limpiarCarrito,
        total,
        cantidadTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};