import React, {useEffect, useState} from 'react'
import PrivateRoute from './components/PrivateRoute'
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TopBar from './screens/global/TopBar';
import SideBar from './screens/global/SideBar'
import LoginUser from "./screens/Auth"
import Home from "./screens/Home"
import axios from 'axios'
function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get("http://localhost:5000/api/user/connect");
      const json = await response.json();
      setIsAuthenticated(json.success);
    };
    checkAuth();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className='app'>
          <main className='content'>
              <div className='Login'>
              <Router>
                <Routes>
                <Route path="/" element={<LoginUser />} />
                <PrivateRoute path="/Home" element={<Home />} isAuthenticated={isAuthenticated} />
                <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Router>
              </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
