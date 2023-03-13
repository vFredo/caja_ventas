import { useState } from 'react'
import axios from 'axios'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Box, Typography, TextField } from '@mui/material';

const Register = () => {

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [rol, setRol] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: user, password: pwd, rol: rol }
    await axios.post("http://localhost:8888/api/user/register", data,
      { withCredentials: true, })
      .then((res) => {
        if (res.data.success) {
          setUser('');
          setPwd('');
        } else {
          console.log('Incorrect Username or Password');
          setUser('');
          setPwd('');
        }
        console.log(res.data)
      }).catch((err) => {
        setErrMsg("Error calling API");
        console.error("Axios ERROR ASAP: ", err)
      })
  }

  return (

    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box width="400px" height="500px" display="flex" flexDirection="column" alignItems="center" sx={{
        backgroundColor: " #34495e",
        borderRadius: "15px"
      }}>
        <h1>Register new user</h1>
        <PersonAddOutlinedIcon style={{
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

          <TextField
            type="text"
            id="rol"
            label="Role"
            onChange={(e) => setRol(e.target.value)}
            value={rol}
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
          }}>Register</button>
          </Box>
        </form>
      </Box>
    </Box>
    /*
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />

        <label htmlFor="Rol">Rol:</label>
        <input
          type="text"
          id="rol"
          autoComplete="off"
          onChange={(e) => setRol(e.target.value)}
          value={rol}
          required
        />
        <button>Register</button>
      </form>
    </section>*/
  )
}

export default Register



