import axios from "axios"
import { useEffect, useState } from "react"
import TablaInventario from "../components/TablaInventario"
import PopupForm from "../components/PopupForm"

const Inventario = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/inventario", { withCredentials: true })
        setItems(res.data)
      } catch (error) {
        console.error("FETCH NOOO", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleAgregar = async (data) => {
    try {
      setIsLoading(true)
      const res = await axios.post("http://localhost:8888/api/inventario", data, { withCredentials: true });
      if (res.data.success){
        data = {...data, id: res.data.id}
        const newItems = [...items, data]
        setItems(newItems)
      } else {
        console.log("No se pudo agregar elemento")
      }
    } catch (error) {
      console.error("NOO PINCHE AXIOS", error);
    } finally {
      handleOpen()
      setIsLoading(false)
    }
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <TablaInventario inventario={items} setInventario={setItems}/>
      <br/>
      <button onClick={handleOpen}>Agregar Producto</button>
      <PopupForm isOpen={isOpen} handleOpen={handleOpen} onSubmit={handleAgregar} />
    </div>
  )
}

export default Inventario
