import ReactModal from 'react-modal'
import { useState } from "react";
import { tokens } from '../theme'; 
import { useTheme, TextField} from '@mui/material';

const PopupForm = ({ isOpen, handleOpen, onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [precio, setPrecio] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      nombre: nombre,
      cantidad: cantidad,
      valor: precio
    }
    await onSubmit(data)
  }

  const handleClose = () => {
    setNombre("")
    setCantidad(0)
    setPrecio(0)
    handleOpen()
  }


  return (
    <ReactModal isOpen={isOpen} style={{
      overlay: {
        position: 'fixed',
        width: '50vw',
        height: '20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary[200],
        marginTop: '500px',
        marginLeft: '500px'
      },
      content: {
        backgroundColor: colors.primary[300]
      }
      
    }}>
      <h2 color={colors.grey[100]}>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <TextField type="text" id="nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} label='Product Name'/>

        <TextField type="number" id="cantidad" onChange={(e) => setCantidad(e.target.value)} value={cantidad} label='Amount'/>

        <TextField type="number" id="precio" onChange={(e) => setPrecio(e.target.value)} value={precio} label='Price'/>

        <button type="submit" 
        style={{backgroundColor: '#3498db', height: '50px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}>
        Agregar</button>
        <button onClick={handleClose} 
        style={{backgroundColor: '#e74c3c', height: '50px', width: '100px', fontWeight:'bold', borderRadius:'5px'}}>
        Cerrar</button>
      </form>
    </ReactModal>
  )
}

export default PopupForm
