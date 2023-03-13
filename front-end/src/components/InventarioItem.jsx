import { useState } from "react"
import { TextField } from "@mui/material"

const InventarioItem = ({ item, handleActualizar, handleEliminar}) => {

  const [nombre, setNombre] = useState(item.nombre)
  const [cantidad, setCantidad] = useState(item.cantidad)
  const [precio, setPrecio] = useState(item.valor)

  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>
          <TextField
            type="text"
            id={item.id}
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            required
            variant="outlined"
          />
        </td>
        <td>
          <TextField
            type="text"
            id={item.id}
            onChange={(e) => setCantidad(e.target.value)}
            value={cantidad}
            required
            variant="outlined"
          />
        </td>
        <td>
          <TextField
            type="text"
            id={item.id}
            onChange={(e) => setPrecio(e.target.value)}
            value={precio}
            required
            variant="outlined"
          />
        </td>
        <td>
          <button onClick={() => handleActualizar(item.id, nombre, cantidad, precio)} 
          style={{backgroundColor: '#3498db', height: '50px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}>
            Actualizar
          </button>
          <button onClick={() => handleEliminar(item.id)} 
          style={{backgroundColor: '#e74c3c', height: '50px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  )
}

export default InventarioItem
