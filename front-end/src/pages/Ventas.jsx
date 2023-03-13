import { useEffect, useState } from "react"
import axios from "axios"
import { tokens } from "../theme"
import { Box, Typography, TextField, colors, useTheme} from "@mui/material"

const Ventas = () => {
  const [inventario, setInventario] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idSelect, setIdSelect] = useState(0)
  const [cantidadSelect, setCantidadSelect] = useState(0)
  const [puntos, setPuntos] = useState(false)
  const [nit, setNit] = useState(0)
  const [agregados, setAgregados] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" >
    <Box width="1000px" justifyContent="center" alignItems="center">
      <Box sx={{backgroundColor: colors.primary[400], borderRadius:'5px'}}>
      <h2>Products available </h2>
      <table >
        <thead>
          <tr style={{}}>
            <th style={{fontSize:'20px'}}>ID</th>
            <th style={{fontSize:'20px'}}>Product Name</th>
            <th style={{fontSize:'20px'}}>Amount</th>
            <th style={{fontSize:'20px'}}>Price</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr key={item.id}>
              <td style={{fontSize:'20px'}}>{item.id}</td>
              <td style={{fontSize:'20px'}}>{item.nombre}</td>
              <td style={{fontSize:'20px'}}>{item.cantidad}</td>
              <td style={{fontSize:'20px'}}>{item.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </Box>
      <Box sx={{backgroundColor: colors.primary[400], borderRadius:'5px'}}>
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>
          <TextField label="Product Id" type="number" id="id" onChange={(e) => setIdSelect(e.target.value)} value={idSelect}/>
          <TextField label="Product Quantitys" type="number" id="cantidad" onChange={(e) => setCantidadSelect(e.target.value)} value={cantidadSelect}/>
          <button type="submit" 
          style={{backgroundColor: '#3498db', height: '50px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}> Add Product </button>
        </form>
        <br />
        <h2>Selected Products</h2>
        <ul>
          {agregados.map((elem) => {
            const producto = inventario.find((x) => x.id == elem[0])
            return (
              <li key={elem[0]}>
                {producto.nombre}|{elem[1]}|{producto.valor}
                <button onClick={() => eliminarAgregado(elem[0])} 
                style={{backgroundColor: '#e74c3c', height: '20px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}>Delete</button>
              </li>
            )
          })}
        </ul>

        <br />
        <h2> Finish Sale</h2>
        <form onSubmit={handleAgregarVenta}>
          <label htmlFor="puntos" style={{fontSize:"20px"}}>Use Points?</label>
          <input type="checkbox" id="puntos" checked={puntos} onChange={(e) => setPuntos(e.target.checked)} />

          <TextField label="Client ID" type="number" id="nit" onChange={(e) => setNit(e.target.value)} value={nit}/>

          <button type="submit" style={{backgroundColor: '#28b463', height: '50px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}>Hacer venta</button>
        </form>
      </Box>
      </Box>
    </Box>
  )
}

export default Ventas
