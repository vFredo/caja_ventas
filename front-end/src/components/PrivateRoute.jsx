import axios from "axios"
import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"


const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/user/connect", {
          withCredentials: true,
        });
        const value = res.data.success;
        setIsAuth(value)
      } catch (error) {
        console.error(error)
      } finally {
       // Actualiza la variable isLoading una vez que la solicitud HTTP se haya completado, ya sea con éxito o con error.
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    // Si la solicitud HTTP todavía está en progreso, muestra una pantalla de carga o un indicador de progreso.
    return <p>Loading...</p>
  }

  // Si la solicitud HTTP se ha completado, muestra el contenido del componente o redirige a la página de inicio de sesión según el valor de isAuth.
  return isAuth ? children : <Navigate to="/login" />
};

export default PrivateRoute

