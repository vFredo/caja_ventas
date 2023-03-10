import React, { useEffect, useState } from 'react'
import { Route, Navigate } from 'react-router-dom'
import SidebarComp from '../screens/global/SideBar'
import axios from 'axios'

  // If the user is not login or it's not authorize, then send him to the /login page
  // Also we put here the header bar (Menubar) so every PrivateRoute can see it

  const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    
    <Route {...rest} render={props => (
      isAuthenticated
        ? <Component {...props} />
        : <Navigate to={{ pathname: '/', state: { from: props.location } }} />
    )} />
    );

export default PrivateRoute