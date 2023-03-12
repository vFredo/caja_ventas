import { useEffect, useState } from "react"
import axios from "axios"

const Informe = () => {
  const [ventas, setVentas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/ventas", { withCredentials: true, })
        setVentas(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        // Actualiza la variable isLoading una vez que la solicitud HTTP se haya completado, ya sea con éxito o con error.
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>Informe del Dia</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Descuento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fecha}</td>
              <td>{item.cliente}</td>
              <td>{item.descuento}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Informe
