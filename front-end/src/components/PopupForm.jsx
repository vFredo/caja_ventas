import ReactModal from 'react-modal'
import { useState } from "react";

const PopupForm = ({ isOpen, handleOpen, onSubmit }) => {
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [precio, setPrecio] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      nombre: nombre,
      cantidad: cantidad,
      valor: precio
    }
    await onSubmit(data)
  }

  const handleClose = () => {
    setNombre("")
    setCantidad(0)
    setPrecio(0)
    handleOpen()
  }


  return (
    <ReactModal isOpen={isOpen}>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} />

        <label htmlFor="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" onChange={(e) => setCantidad(e.target.value)} value={cantidad} />

        <label htmlFor="precio">Precio:</label>
        <input type="number" id="precio" onChange={(e) => setPrecio(e.target.value)} value={precio} />

        <button type="submit">Agregar</button>
        <button onClick={handleClose}>Cerrar</button>
      </form>
    </ReactModal>
  )
}

export default PopupForm
