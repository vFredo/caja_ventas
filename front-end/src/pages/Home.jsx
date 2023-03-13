import useAuth from '../hooks/useAuth'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {useState} from 'react'
import {tokens } from '../theme'
import {Box, Typography, useTheme,} from '@mui/material'
import 'react-pro-sidebar/dist/css/styles.css'
import {ProSidebar, Menu, MenuItem} from 'react-pro-sidebar'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const Item = ({ title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem active={selected === title} style={{
      color: colors.grey[100]
    }}
    onClick={() => setSelected(title)}
    icon={icon}>
      <Typography variant='h4'>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  )
}

const Home = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Home")

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
    <Box marginLeft="10px" sx={{
      "& .pro-sidebar-inner": {
        background: `${colors.primary[400]} !important`,
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
      },
      "& .pro-inner-item": {
        padding: "5px 35px 5px 20px !important",
      },
      "& .pro-inner-item:hover": {
        color: "#868dfb !important",
      },
      "& .pro-menu-item.active": {
        color: "#6870fa !important",
      },
    }}>
    <ProSidebar>
      <Menu style={{ height: "100vh"}}>
        <Typography marginLeft="30px" variant='h3' marginBottom="30px" fontWeight="bold">Welcome Back</Typography>
        {/* MENU ITEM */}
        
        <Box flexDirection="column">
          <Typography 
            variant='h5'
            color={colors.grey[100]}
            sx={{m: "15px 0 5px 20px"}}>
              Home
            </Typography>

          <Item 
            title="Home"
            to="/"
            icon={<AccountCircleOutlinedIcon style={{ fontSize: "30px"}}/>}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography 
            variant='h5'
            color={colors.grey[100]}
            sx={{m: "15px 0 5px 20px"}}>
              Public
          </Typography>

          <Item 
            title="Login"
            to="/Login"
            icon={<LoginOutlinedIcon style={{ fontSize: "30px"}}/>}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography 
            variant='h5'
            color={colors.grey[100]}
            sx={{m: "15px 0 5px 20px"}}>
              Private
          </Typography>

          <Item 
            title="New User"
            to="/register"
            icon={<PersonAddOutlinedIcon style={{ fontSize: "30px"}}/>}
            selected={selected}
            setSelected={setSelected}
          />

          <Item 
            title="Inventory"
            to="/inventario"
            icon={<InventoryOutlinedIcon style={{ fontSize: "30px"}}/>}
            selected={selected}
            setSelected={setSelected}
          />

          <Item 
            title="Sales"
            to="/ventas"
            icon={<MonetizationOnOutlinedIcon style={{ fontSize: "30px"}}/>}
            selected={selected}
            setSelected={setSelected}
          />

          <Item 
            title="Reports"
            to="/informe"
            icon={<AssessmentOutlinedIcon style={{ fontSize: "30px"}}/>}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography 
            variant='h5'
            color={colors.grey[100]}
            sx={{m: "15px 0 5px 20px", marginTop: "700px"}}>
              Logout
          </Typography>

          <button onClick={logout} style={{
            backgroundColor: '#c0392b',
            borderRadius: "30px",
            height: "40px",
            width: "70%",
            fontWeight: "bold",
            marginLeft: "10px",
          }}>Logout</button>
        </Box>
      </Menu>
    </ProSidebar>
    </Box>
  )
}

export default Home
