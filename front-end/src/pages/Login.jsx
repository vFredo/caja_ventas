import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {Box, TextField, Typography} from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: user, password: pwd }
    await axios.post("http://localhost:8888/api/user/login", data,
      { withCredentials: true, })
      .then((res) => {
        if (res.data.success) {
          // setAuth({ username: user, rol: res.data.rol, id: res.data.id, isAuth: true });
          setUser('');
          setPwd('');
          navigate(from, { replace: true });
        } else {
          console.log('Incorrect Username or Password');
          setUser('');
          setPwd('');
        }
      }).catch((err) => {
        console.error("Axios ERROR ASAP: ", err)
      })
  }

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box width="400px" height="400px" display="flex" flexDirection="column" alignItems="center" sx={{
        backgroundColor: " #34495e",
        borderRadius: "15px"
      }}>
        <h1>Sign In</h1>
        <AccountCircleOutlinedIcon style={{
          fontSize: '80px'
        }}/>
        <form onSubmit={handleSubmit}>
          <Box width="100%" height="300px" display="flex" flexDirection="column">
          <TextField
            type="text"
            id="username"
            label="Username"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            variant="outlined"
            sx={{
              marginBottom: "10px",
              width: "300px",
              marginTop: "10px"
            }}
          />

          <TextField
            type="password"
            id="password"
            label="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            variant="outlined"
            sx={{
              marginBottom: "10px",
              width: "300px",
              marginTop: "10px"
            }}
          />
          <button style={{
            backgroundColor: '#c0392b',
            borderRadius: "5px",
            height: "50px",
            fontWeight: "bold"
          }}>Login</button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login
