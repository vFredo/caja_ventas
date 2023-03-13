import axios from "axios"
import { useEffect, useState } from "react"
import TablaInventario from "../components/TablaInventario"
import PopupForm from "../components/PopupForm"
import {Box} from '@mui/material'

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
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" >
    <Box width="1000px" justifyContent="center" alignItems="center">
      <TablaInventario inventario={items} setInventario={setItems}/>
      <br/>
      <button onClick={handleOpen} 
      style={{backgroundColor: '#28b463', height: '50px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}>Agregar Producto</button>
      <PopupForm isOpen={isOpen} handleOpen={handleOpen} onSubmit={handleAgregar}/>
      </Box>
    </Box>
  )
}

export default Inventario
