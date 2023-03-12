import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
          setAuth({ username: user, rol: res.data.rol, id: res.data.id, isAuth: true });
          setUser('');
          setPwd('');
          navigate(from, { replace: true });
        } else {
          console.log('Incorrect Username or Password');
          setUser('');
          setPwd('');
        }
      }).catch((err) => {
        setErrMsg("Error calling API");
        console.error("Axios ERROR ASAP: ", err)
      })
  }

  return (
    <section>
      <h1>Sign In</h1>
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
        <button>Login</button>
      </form>
    </section>
  )
}

export default Login
