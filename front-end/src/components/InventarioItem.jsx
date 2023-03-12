import { useState } from "react"

const InventarioItem = ({ item, handleActualizar, handleEliminar}) => {

  const [nombre, setNombre] = useState(item.nombre)
  const [cantidad, setCantidad] = useState(item.cantidad)
  const [precio, setPrecio] = useState(item.valor)

  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>
          <input
            type="text"
            id={item.id}
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            required
          />
        </td>
        <td>
          <input
            type="text"
            id={item.id}
            onChange={(e) => setCantidad(e.target.value)}
            value={cantidad}
            required
          />
        </td>
        <td>
          <input
            type="text"
            id={item.id}
            onChange={(e) => setPrecio(e.target.value)}
            value={precio}
            required
          />
        </td>
        <td>
          <button onClick={() => handleActualizar(item.id, nombre, cantidad, precio)}>
            Actualizar
          </button>
          <button onClick={() => handleEliminar(item.id)}>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  )
}

export default InventarioItem
