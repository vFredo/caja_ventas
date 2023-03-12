import { useState } from 'react'
import axios from 'axios'

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
    </section>
  )
}

export default Register



