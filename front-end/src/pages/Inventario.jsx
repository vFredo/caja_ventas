import { useEffect, useState } from "react"
import axios from "axios"
import TablaInventario from "../components/TablaInventario"
import PopupForm from "../components/PopupForm"

const Inventario = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/inventario",
          { withCredentials: true, })
        setItems(res.data)
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

  // TODO: solucionar agregar producto
  const handleAgregar = async (nombre, cantidad, valor) => {
    try {
      const data = { nombre: nombre, cantidad: cantidad, valor: valor}
      const res = await axios.post("http://localhost:8888/api/inventario", data, { withCredentials: true });
      if (res.data.success){
        const itemsUpdate = [...items]
        itemsUpdate.push(data)
        setItems(itemsUpdate)
      } else {
        console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false)
    }
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <TablaInventario items={items}/>
      <br/>
      <button onClick={handleOpen}>Agregar Producto</button>
      <PopupForm isOpen={isOpen} onRequestClose={handleOpen} handleFunc={handleAgregar}/>
    </div>
  )
}

export default Inventario
