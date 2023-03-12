import ReactModal from 'react-modal'
import { useState } from "react";

const PopupForm = ({ isOpen, onClose, handleFunc }) => {
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [precio, setPrecio] = useState("")

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Agregar Producto</h2>
      <form onSubmit={async () => await handleFunc(nombre, cantidad, precio)}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" onChange={(e) => setNombre(e.target.value)} value={nombre} />

        <label htmlFor="cantidad">Cantidad:</label>
        <input type="text" id="name" onChange={(e) => setCantidad(e.target.value)} value={cantidad} />

        <label htmlFor="precio">Precio:</label>
        <input type="text" id="name" onChange={(e) => setPrecio(e.target.value)} value={precio} />

        <button type="submit">Agregar</button>
        <button onClick={onClose}>Cerrar</button>
      </form>
    </ReactModal>
  );
}

export default PopupForm
