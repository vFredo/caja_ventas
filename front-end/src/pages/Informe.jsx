import { useEffect, useState } from "react"
import axios from "axios"
import {Box, useTheme} from "@mui/material"
import { tokens } from "../theme"

const Informe = () => {
  const [ventas, setVentas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" >
    <Box width="1000px" justifyContent="center" alignItems="center" sx={{backgroundColor: colors.primary[400], borderRadius:'10px'}}>
      <h2>Report of the day:</h2>
      <table>
        <thead>
          <tr>
            <th style={{fontSize:'20px'}}>ID</th>
            <th style={{fontSize:'20px'}}>Fecha</th>
            <th style={{fontSize:'20px'}}>Cliente</th>
            <th style={{fontSize:'20px'}}>Descuento</th>
            <th style={{fontSize:'20px'}}>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((item) => (
            <tr key={item.id}>
              <td style={{fontSize:'20px'}}>{item.id}</td>
              <td style={{fontSize:'20px'}}>{item.fecha}</td>
              <td style={{fontSize:'20px'}}>{item.cliente}</td>
              <td style={{fontSize:'20px'}}>{item.descuento}</td>
              <td style={{fontSize:'20px'}}>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
    </Box>
  )
}

export default Informe
