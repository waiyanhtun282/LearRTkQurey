import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

const Routguard = ({children}) => {
  const token =Cookies.get('token');
  if(token) {
    return children
  }else {
    return <Navigate to={'/login'}/>
  }
}

export default Routguard
