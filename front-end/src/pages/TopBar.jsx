import {Box, IconButton, Typography, useTheme} from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext, tokens } from '../theme'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant='h4' fontWeight="bold">POS SYSTEM</Typography>
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <LightModeOutlinedIcon/>
                ) : <DarkModeOutlinedIcon/> }

            </IconButton>
        </Box>
    );
};


export default TopBar;