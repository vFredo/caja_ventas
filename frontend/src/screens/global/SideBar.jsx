import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import 'react-pro-sidebar/dist/css/styles.css'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarComp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner":{
            background: `${colors.primary[400]} !important`
        },
        "& .pro-icon-wrapper":{
            backgroundColor: "transparent !important"
        },
        "& .pro-inner-item":{
            padding: "5px 35px 5px 20px !important"
        },
        "& .pro-inner-item:hover":{
            color: "#1976d2 !important"
        },
        "& .pro-menu-item.active:":{
            color: "#6870fa !important"
        }
      }}>
      <ProSidebar >
        <Menu iconShape="square">
          <MenuItem
            style={{
              margin: "0 0 20px 0",
              color: colors.grey[100],
            }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]} fontWeight="800">
                  POS SYSTEM
                </Typography>
              </Box>
          </MenuItem>

          <Box>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Sales Management
            </Typography>
            <Item
              title="Filter Sales"
              to="/filterSales"
              icon={<InventoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>

            <Item
              title="New Sale"
              to="/newSale"
              icon={<PointOfSaleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>

            <Item
              title="Delete Sale"
              to="/deleteSale"
              icon={<DeleteForeverOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              
            User management
            </Typography>
            <Item
              title="Filter Users"
              to="/filterUser"
              icon={<PersonSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>
            
            <Item
              title="New User"
              to="/newUser"
              icon={<PersonAddAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>

            <Item
              title="Delete User"
              to="/deleteUser"
              icon={<GroupRemoveOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Product Management
            </Typography>
            <Item
              title="List Products"
              to="/listProducts"
              icon={<ListAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>

            <Item
              title="New Product"
              to="/newProduct"
              icon={<AddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>

            <Item
              title="Delete Product"
              to="/deleteProduct"
              icon={<ClearOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>
            
            <Item
              title="Alter Product"
              to="/alterProduct"
              icon={<EditOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Account Management
            </Typography>
            <Item
              title="Change Password"
              to="/changePassword"
              icon={<LockResetOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>
            
            <Item
              title="Log Out"
              to="/"
              icon={<LogoutOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}/>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarComp;