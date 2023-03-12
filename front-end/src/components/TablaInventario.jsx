import InventarioItem from './InventarioItem'
import axios from "axios"

const TablaInventario = ({ inventario, setInventario }) => {

  const handleActualizar = async (id, nombre, cantidad, precio) => {
    const data = { nombre: nombre, cantidad: cantidad, valor: precio }
    const url = `http://localhost:8888/api/inventario/${id}`
    await axios.put(url, data, { withCredentials: true, })
  }

  const handleEliminar = async (id) => {
    const url = `http://localhost:8888/api/inventario/${id}`
    await axios.delete(url, { withCredentials: true, })
      .then((res) => {
        if (res.data.success) {
          const newItems = inventario.filter(item => item.id !== id);
          setInventario(newItems)
        }
      })
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {inventario.map(
          (item) => {
            return <InventarioItem key={item.id} item={item} handleActualizar={handleActualizar} handleEliminar={handleEliminar} />
          })
        }
      </tbody>
    </table>
  )
}

export default TablaInventario
