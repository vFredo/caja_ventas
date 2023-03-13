import { Route, Routes } from 'react-router-dom'
import Modal from "react-modal"
import PrivateRoute from './components/PrivateRoute'
import PrivateAdmin from './components/PrivateAdmin'
import Layout from './components/Layout'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Inventario from "./pages/Inventario"
import Ventas from "./pages/Ventas"
import Register from "./pages/Register"
import Informe from "./pages/Informe"
import TopBar from './pages/TopBar'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ColorModeContext, useMode } from "./theme"

Modal.setAppElement('#root')

function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <main  className='content'>
          <TopBar/>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
              {/* Solo user */}
              <Route path="/" element={<PrivateRoute>
                <Home />
              </PrivateRoute>} />
              <Route path="ventas" element={<PrivateRoute>
                <Ventas />
              </PrivateRoute>} />

              {/* Solo admin */}
              <Route path="register" element={<PrivateAdmin>
                <Register />
              </PrivateAdmin>} />
              <Route path="inventario" element={<PrivateAdmin>
                <Inventario />
              </PrivateAdmin>} />
              <Route path="informe" element={<PrivateAdmin>
                <Informe />
              </PrivateAdmin>} />
            </Route>
          </Routes> 
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
