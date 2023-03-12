import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Home = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    await axios.get("http://localhost:8888/api/user/logout", { withCredentials: true, })
      .then((res) => {
        if (res.data.success) {
          setAuth({ isAuth: false })
          navigate("/login", {replace: true})
        } else {
          console.log(res.data)
        }
      })
  }

  return (
    <div>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <button onClick={logout}>Logout</button>
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <br />
      <Link to="/editor">Editors Page</Link>
      <br />
      <Link to="/admin">Admin Page</Link>
    </div>
  )
}

export default Home
