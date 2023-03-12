import { useEffect, useState } from "react"
import axios from "axios"

const Ventas = () => {
  const [inventario, setInventario] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idSelect, setIdSelect] = useState(0)
  const [cantidadSelect, setCantidadSelect] = useState(0)
  const [puntos, setPuntos] = useState(false)
  const [nit, setNit] = useState(0)
  const [agregados, setAgregados] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/inventario", { withCredentials: true, })
        setInventario(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cantidadSelect > 0 && idSelect >= 0) {
      const producto = [idSelect, cantidadSelect]
      setAgregados([...agregados, producto])
    } else {
      console.log("No se puede tener una cantidad 0 o negativa, lo mismo para el ID")
    }
  }

  const handleAgregarVenta = async (e) => {
    e.preventDefault()
    const data = { nit: nit, puntos: puntos, productos: agregados }
    await axios.post("http://localhost:8888/api/ventas", data, { withCredentials: true })
    setAgregados([])
  }

  const eliminarAgregado = (id) => {
    const newAgregados = agregados.filter((elem) => elem[0] != id)
    setAgregados(newAgregados)
  }

  return (
    <div>
      <h2>Productos disponibles</h2>
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
          {inventario.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>{item.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h2>Agregar producto</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID Producto: </label>
        <input type="number" id="id" onChange={(e) => setIdSelect(e.target.value)} value={idSelect}/>

        <label htmlFor="cantidad">Cantidad Producto:</label>
        <input type="number" id="cantidad" onChange={(e) => setCantidadSelect(e.target.value)} value={cantidadSelect}/>

        <button type="submit">Agregar producto </button>
      </form>
      <br />
      <h2>Productos seleccionados</h2>
      <ul>
        {agregados.map((elem) => {
          const producto = inventario.find((x) => x.id == elem[0])
          return (
            <li key={elem[0]}>
              {producto.nombre}|{elem[1]}|{producto.valor}
              <button onClick={() => eliminarAgregado(elem[0])}>Eliminar</button>
            </li>
          )
        })}
      </ul>

      <br />
      <h2>Completar Venta</h2>
      <form onSubmit={handleAgregarVenta}>
        <label htmlFor="puntos">Usar puntos?</label>
        <input type="checkbox" id="puntos" checked={puntos} onChange={(e) => setPuntos(e.target.checked)} />

        <label htmlFor="nit">Cedula del cliente:</label>
        <input type="number" id="nit" onChange={(e) => setNit(e.target.value)} value={nit}/>

        <button type="submit">Hacer venta</button>
      </form>
    </div>
  )
}

export default Ventas
