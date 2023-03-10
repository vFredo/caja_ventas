import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate } from "react-router-dom"
import {useDispatch} from "react-redux"
import axios from "axios"
import { Grid, TextField, Alert} from '@mui/material';
import { Box, Typography, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';


const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [paragraph, setParagraph] = useState("");

    const navigate = useNavigate("")
    //const dispatch = useDispatch()

    const handleLogin = async (event) => {
        // preventDefault prevents that the submit event refresh the page
        event.preventDefault()
        const data = { username: username, password: password }
        await axios.post("http://localhost:5000/api/user/login", data)
            .then((res) => {

            if (res.data.success) {
              navigate('/Home');
            } else {
              console.log("No logueado");
            }
        })
    }




    return(
        <Box width="100vw" height="100vh" justifyContent="center" alignItems="center" display="flex">
            <Box 
            height="450px"
            width="400px"
            display="flex"
            flexDirection="column"
            position="relative"
            alignItems="center"
            sx={{
                backgroundColor: "#34495E",
                borderRadius: "30px"
            }}
            >
                <Typography variant="h1" color="white" fontWeight="800" align="center" margin="30px">
                    Welcome
                </Typography>
                <PersonIcon sx={{width:"300px", height:"80px"}}></PersonIcon>
                <TextField id="outlined-basic" label="Username" variant="outlined" type="text" sx={{marginTop:"20px", width:"300px"}} onChange={(e) => setUsername(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password"  sx={{marginTop:"20px", width:"300px"}} onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" endIcon={<LoginIcon />} disableElevation sx={{marginTop:"20px", width:"300px", height:"50px"}} onClick={handleLogin}>LOGIN</Button>
            </Box>
        </Box>
    )
}

export default LoginForm;