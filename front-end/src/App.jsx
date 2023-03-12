import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PrivateAdmin from './components/PrivateAdmin'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Inventario from "./pages/Inventario"
import Ventas from "./pages/Ventas"
import Register from "./pages/Register"
import Informe from "./pages/Informe"
import Layout from './components/Layout';

function App() {

  return (
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
  )
}

export default App
