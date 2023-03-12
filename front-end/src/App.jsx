import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Layout from './components/Layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<PrivateRoute>
          <Home />
        </PrivateRoute>} />
      </Route>
    </Routes>
  )
}

export default App
